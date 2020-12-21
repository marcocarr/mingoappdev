/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WebView, View, Platform } from 'react-native'
import Icons from '@navigation/Icons'
import { Languages } from '@common'
import { CustomPage } from '@container'

export default class CustomPageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: Languages.AppName, // navigation.state.params.title ? navigation.state.params.title : Languages.AppName
    headerLeft: Icons.Home(),
  })

  static propTypes = {
    navigation: PropTypes.object,
  }

  render() {
    const { state } = this.props.navigation

    if (typeof state.params === 'undefined') {
      return <View />
    }

    if (typeof state.params.url !== 'undefined') {
      return <WebView source={{ url: state.params.url }} />
    }
    return <CustomPage id={state.params.id} />
  }
}
