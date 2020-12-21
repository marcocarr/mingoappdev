/** @format */

import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Tools, Events, Languages } from "@common";
import { Spinkit } from "@components";
import User from "@services/User";
import css from "./styles";

export default class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: "",
      name: "",
    };
  }

  btnSignUp = async () => {
    this.setState({
      loading: true,
    });

    if (
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.name
    ) {
      await User.create(
        this.state.email,
        this.state.password,
        this.state.name,
        () => {
          Events.loginShowInfo(Languages.signupSuccess);
          this.setState({ loading: false });
          User.clearPosts();
          Tools.refresh();
          Events.closeUserModal();
        },
        (error) => {
          this.setState({ loading: false });
          if (typeof error.message !== "undefined") {
            Events.loginShowError(error.message);
          } else if (typeof error.error !== "undefined") {
            Events.loginShowError(error.error);
          }
        }
      );
    }
  };

  render() {
    return (
      <View style={css.wrap}>
        <View style={css.body}>
          <View style={css.wrapForm}>
            <View style={css.textInputWrap}>
              <Text style={css.textLabel}>{Languages.name}</Text>
              <TextInput
                placeholder={Languages.enterName}
                underlineColorAndroid="transparent"
                style={css.textInput}
                onChangeText={(text) => this.setState({ name: text })}
              />
            </View>

            <View style={css.textInputWrap}>
              <Text style={css.textLabel}>{Languages.email}</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={Languages.enterEmail}
                style={css.textInput}
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
            <View style={css.textInputWrap}>
              <Text style={css.textLabel}>{Languages.passwordUp}</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={Languages.enterPassword}
                style={css.textInput}
                secureTextEntry
                onChangeText={(text) => this.setState({ password: text })}
              />
            </View>

            <View style={css.wrapButton}>
              {this.state.loading ? (
                <TouchableOpacity style={css.btnLogIn}>
                  <Spinkit size={20} type="FadingCircle" color="#FFFFFF" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={css.btnLogIn} onPress={this.btnSignUp}>
                  <Text style={css.btnLogInText}> {Languages.signup} </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
