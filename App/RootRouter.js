/** @format */

import React, { Component } from 'react'
import { View, Platform, StatusBar, I18nManager } from 'react-native'
import MainNavigator from '@navigation'
import { Events, Style, Constants, Config, Device } from '@common'
import MenuScale from '@components/LeftMenu/MenuScale'
import MenuOverlay from '@components/LeftMenu/MenuOverlay'
import MenuSmall from '@components/LeftMenu/MenuSmall'
import MenuWide from '@components/LeftMenu/MenuWide'
import MenuAndroid from '@components/LeftMenu/MenuAndroid'
import { connect } from 'react-redux'

class RootRouter extends Component {
  constructor(props) {
    super(props)
    this.state = { menuStyle: 0 }

    !Device.isIphoneX && StatusBar.setHidden(true)
    I18nManager.forceRTL(Constants.RTL)
    // Set Default Language for App
    // Languages.setLanguage(Config.Language);
  }

  changeMenuStyle(data) {
    this.setState({ menuStyle: data.menuId })
  }

  componentDidMount() {
    Events.appChangeMenuStyle(this.changeMenuStyle.bind(this))
    let {isLoggedIn} = this.props
    if (!isLoggedIn && Config.RequiredLogin) {
      Events.openUserModal()
    }
  }

  goToScreen = (routeName, params, isReset: boolean = true) => {
    const { navigator } = this.refs
    navigator.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    })

    //
    // if (isReset) {
    //   const resetAction = NavigationActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({routeName, params})]
    //   });
    //   navigator.dispatch(resetAction);
    // } else {
    //   navigator.dispatch({type: 'Navigation/NAVIGATE', routeName: routeName, params});
    // }
    // this.closeSideMenu();
  }

  renderContent = () => {
    let {isLoggedIn} = this.props
    return (
      <View style={Style.app}>
        {Device.isIphoneX && (
          <StatusBar backgroundColor="white" barStyle="dark-content" />
        )}
        {(isLoggedIn || !Config.RequiredLogin) && <MainNavigator ref="navigator" />}
      </View>
    )
  }

  render() {
    const { small, wide, overlay } = Constants.LeftMenu

    if (Platform.OS === 'android') {
      return (
        <MenuAndroid
          ref="menuDefault"
          goToScreen={this.goToScreen}
          routes={this.renderContent()}
        />
      )
    }

    switch (Config.LeftMenuStyle) {
      case small:
        return (
          <MenuSmall
            ref="menuDefault"
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        )
      case wide:
        return (
          <MenuWide
            ref="menuDefault"
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        )
      case overlay:
        return (
          <MenuOverlay
            ref="menuDefault"
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        )
      default:
        return (
          <MenuScale
            ref="menuDefault"
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        )
    }
  }
}

const mapStateToProps = ({ user, bookmark }) => {
  return {
    isLoggedIn: user && user.data
  }
}
export default connect(
  mapStateToProps,
  {
  }
)(RootRouter)
