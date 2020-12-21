/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Animated, Platform, TouchableOpacity, Text, Image } from 'react-native'
import { Events, Color, Constants, Languages, Config, Images } from '@common'
import UserAPI from '@services/User'
import { BookMark, Author } from '@container'
import { Avatar } from '@components'
import {
  fetchPostsBookmark,
  fetchPostsByUser,
  clearUserData,
} from '@redux/actions'
import { connect } from 'react-redux'
import Icons from '@navigation/Icons'
import styles from './styles'

const bookmarkName = 'bookmark'

const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 42 : 42
const HEADER_SCROLL_DISTANCE =
  Constants.Window.profileHeight - HEADER_MIN_HEIGHT

class User extends Component {
  static propTypes = {
    fetchPostsBookmark: PropTypes.func,
    fetchPostsByUser: PropTypes.func,
    userData: PropTypes.object,
    onReload: PropTypes.func,
    clearUserData: PropTypes.func,
    user: PropTypes.object,
    bookmark: PropTypes.any,
    onViewPost: PropTypes.func,
  }

  state = { type: bookmarkName, scrollY: new Animated.Value(0) }

  UNSAFE_componentWillMount() {
    this.props.fetchPostsBookmark()

    if (this.props.userData && typeof this.props.userData.id !== 'undefined') {
      this.props.fetchPostsByUser(this.props.userData.id)
    }
    Events.onLogoutUser(this.logOutUser.bind(this))
  }

  onReload = () => {
    this.props.onReload()
  }

  logOutUser = () => {
    UserAPI.logOut()
    this.props.clearUserData()
    if (Config.RequiredLogin) {
      Events.openUserModal()
    }
  }

  changeOnTab = (type) => {
    this.setState({ type })
  }

  renderToolbar = () => {
    const toolbarTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[
          styles.toolbar,
          {
            transform: [{ translateY: toolbarTranslate }],
          },
        ]}
      >
        {Icons.Home()}
        {Icons.Logout()}
      </Animated.View>
    )
  }

  renderTab = () => {
    const { user, bookmark } = this.props
    const { type } = this.state

    const numBookmark =
      typeof bookmark.posts !== 'undefined' ? bookmark.posts.length : 0
    const numPost = typeof user.posts !== 'undefined' ? user.posts.length : 0
    const activeTab = (isActive) => [styles.tab, isActive && styles.activeTab]
    const activeText = (isActive) => [
      styles.tabText,
      isActive && { color: Color.tabActiveText },
    ]

    const tabScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    })
    const tabTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 10],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[
          styles.tabView,
          {
            transform: [{ scale: tabScale }, { translateY: tabTranslate }],
          },
        ]}
      >
        <TouchableOpacity
          style={[activeTab(type === bookmarkName), styles.tabLeft]}
          onPress={() => this.changeOnTab(bookmarkName)}
        >
          <Text style={activeText(type === bookmarkName)}>
            {`${numBookmark} ${Languages.textBookMark}`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[activeTab(type !== bookmarkName), styles.tabRight]}
          onPress={() => this.changeOnTab()}
        >
          <Text style={activeText(type !== bookmarkName)}>
            {`${numPost} ${Languages.textPosts}`}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  renderHeader = () => {
    const { userData } = this.props

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    })

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 50],
      extrapolate: 'clamp',
    })

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Animated.View
          style={[
            styles.profileView,
            {
              opacity: animateOpacity,
              transform: [{ translateY: imageTranslate }],
            },
          ]}
        >
          <Avatar userData={(userData && userData.user) || userData} />
        </Animated.View>
        {this.renderToolbar()}
        {this.renderTab()}
      </Animated.View>
    )
  }

  renderContent = () => {
    const { userData, onViewPost } = this.props
    const { type } = this.state
    return (
      <View style={styles.content}>
        {type === bookmarkName ? (
          <BookMark onViewPost={onViewPost} />
        ) : (
            <Author onViewPost={onViewPost} user={userData} />
          )}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.body}>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {this.renderContent()}
        </Animated.ScrollView>

        {this.renderHeader()}
        {this.props.user.data.jwtToken && (
          <TouchableOpacity style={styles.btnEdit} activeOpacity={0.75} onPress={this.props.postNews}>
            <Image source={Images.EditIcon} style={styles.icon} />
          </TouchableOpacity>
        )}

      </View>
    )
  }
}
const mapStateToProps = ({ user, bookmark }) => ({ user, bookmark })
export default connect(
  mapStateToProps,
  {
    fetchPostsBookmark,
    clearUserData,
    fetchPostsByUser,
  }
)(User)
