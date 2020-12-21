/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchVideos } from '@redux/actions'
import { Languages, Config } from '@common'
import { Spinkit, AnimatedHeader, FlatButton } from '@components'
import VideoControl from './VideoControl'
import css from './style'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class ListVideo extends Component {
  static propTypes = {
    fetchVideos: PropTypes.func,
    onViewPost: PropTypes.func,
    videos: PropTypes.array,
    navigation: PropTypes.object,
    isFetching: PropTypes.bool,
  }

  state = { scrollY: new Animated.Value(0) }

  constructor(props) {
    super(props)
    this.page = 1
    this.isNextPost = false
  }

  componentDidMount() {
    if (this.page === 1) {
      this.props.fetchVideos(this.page, null, Config.CategoryVideo)
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.videos.length !== this.props.videos.length
  }

  onViewPost = (item, index) => {
    this.props.onViewPost(item, index, this.props.videos)
  }

  renderItem = ({ item, index }) => {
    return (
      <VideoControl
        onViewPost={() => this.onViewPost(item, index, this.props.videos)}
        video={item}
        navigation={this.props.navigation}
      />
    )
  }

  nextPosts = () => {
    this.page += 1
    this.isNextPost = true
    this.props.fetchVideos(this.page)
  }

  renderFooter = () => {
    const { isFetching } = this.props
    if (isFetching) return <Spinkit />
    return (
      <View style={css.more}>
        <FlatButton
          name="arrow-down"
          text={isFetching ? 'LOADING...' : 'MORE'}
          load={this.nextPosts}
        />
      </View>
    )
  }

  render() {
    const { videos } = this.props

    return (
      <View style={css.body}>
        <AnimatedHeader scrollY={this.state.scrollY} label={Languages.video} />
        <AnimatedFlatList
          data={videos}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={1}
          contentContainerStyle={css.listView}
          keyExtractor={(item, index) => `video-${item.id || index}`}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.isNextPost && this.nextPosts}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return { videos: posts.videos, isFetching: posts.isFetching }
}
export default connect(mapStateToProps, { fetchVideos })(ListVideo)
