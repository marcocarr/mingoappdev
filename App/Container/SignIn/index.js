/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Spinkit } from '@components';
import { Facebook, Google } from '@expo';
import { Events, Tools, Config, Languages } from '@common';
import User from '@services/User';
import Icon from '@expo/vector-icons/FontAwesome';
import { fetchUserData } from '@redux/actions';
import { connect } from 'react-redux';
import css from './style';

class SignIn extends PureComponent {
  static propTypes = {
    fetchUserData: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      appLoading: false,
      email: '',
      password: '',
    };
  }

  btnLogIn = () => {
    this.setState({ loading: true });

    if (this.state.email !== '' && this.state.password !== '') {
      User.login(
        this.state.email.trim(),
        this.state.password,
        () => {
          Events.loginShowInfo(Languages.loginSuccess);
          this.setState({ loading: false });
          User.clearPosts();
          Tools.refresh();
          this.props.fetchUserData();
          Events.closeUserModal();
        },
        (error) => {
          this.setState({ loading: false });
          Events.loginShowError(error.message);
        }
      );
    }
  };

  signInWithGG = async () => {
    try {
      this.setState({ appLoading: true });

      const result = await Google.logInAsync({
        androidClientId: Config.Google.androidClientId,
        iosClientId: Config.Google.iosClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        User.loginGoogle(result).then(() => {
          Events.closeUserModal();

          // Events.loginShowInfo(Languages.loginSuccess);
          // User.clearPosts();
          Tools.refresh();
          this.props.fetchUserData();
        });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  logInWithFacebook = async () => {
    this.setState({ appLoading: true });
    await Facebook.initializeAsync('<APP_ID>'); // replace with your FB AppId

    const result = await Facebook.logInWithReadPermissionsAsync(
      Config.Facebook.logInID,
      {
        permissions: ['public_profile', 'email'],
      }
    );

    if (result.type === 'success') {
      const token = result.token;
      User.loginFacebook(token.toString()).then(() => {
        Tools.refresh();
        // Events.loginShowInfo(Languages.loginSuccess);
        User.clearPosts();
        Events.closeUserModal();
        this.props.fetchUserData();
      });
    } else {
      this.setState({ appLoading: false });
    }
  };

  render() {
    if (this.state.appLoading) {
      return <Spinkit size={30} type="FadingCircle" color="#FFFFFF" />;
    }

    return (
      <View style={css.wrap}>
        <View style={css.body}>
          <View style={css.wrapForm}>
            <View style={css.textInputWrap}>
              <Text style={css.textLabel}>{Languages.email}</Text>
              <TextInput
                placeholder={Languages.enterEmail}
                underlineColorAndroid="transparent"
                style={css.textInput}
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>

            <View style={css.textInputWrap}>
              <Text style={css.textLabel}>{Languages.passwordUp}</Text>
              <TextInput
                placeholder={Languages.enterPassword}
                underlineColorAndroid="transparent"
                style={css.textInput}
                secureTextEntry
                onChangeText={(text) => this.setState({ password: text })}
              />
            </View>
          </View>

          <View style={css.wrapButton}>
            {this.state.loading ? (
              <TouchableOpacity style={css.btnLogIn}>
                <Spinkit />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={css.btnLogIn} onPress={this.btnLogIn}>
                <Text style={css.btnLogInText}> {Languages.login} </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[css.btnLogIn, css.buttonView]}
              onPress={this.logInWithFacebook}>
              <Icon
                name="facebook"
                size={20}
                color="#3B5997"
                style={css.iconButton}
              />
              <Text style={css.btnLogInLabel}>Facebook </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { fetchUserData }
)(SignIn);
