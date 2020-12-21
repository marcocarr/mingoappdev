/** @format */

import React, { PureComponent } from 'react'
import { View } from 'react-native'
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view'
import DropdownAlert from 'react-native-dropdownalert'
import { SignIn, SignUp } from '@container'
import { Color, Languages, Constants, Events } from '@common'
import styles from './style'

export default class LogIn extends PureComponent {
  UNSAFE_componentWillMount() {
    Events.onLoginShowError(this.showError)
  }

  showError = (message) => {
    this.dropdown.alertWithType('error', 'Error', message)
  }

  render() {
    return (
      <View style={styles.body}>
        <ScrollableTabView
          initialPage={0}
          tabBarUnderlineStyle={styles.activeTab}
          tabBarActiveTextColor={Color.tabbarTint}
          tabBarInactiveTextColor="rgba(0, 0, 0, 0.4)"
          tabBarTextStyle={styles.textTab}
          animationEnabled={false}
          swipeEnabled={false}
          lazyLoad
          renderTabBar={() => (
            <ScrollableTabBar
              underlineHeight={0}
              style={{ borderBottomColor: 'transparent' }}
              tabsContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
              tabStyle={styles.tab}
            />
          )}
        >
          {Constants.RTL ? (
            <SignUp tabLabel={Languages.signup} />
          ) : (
            <SignIn tabLabel={Languages.login} />
          )}

          {Constants.RTL ? (
            <SignIn tabLabel={Languages.login} />
          ) : (
            <SignUp tabLabel={Languages.signup} />
          )}
        </ScrollableTabView>

        <DropdownAlert ref={(ref) => (this.dropdown = ref)} />
      </View>
    )
  }
}
