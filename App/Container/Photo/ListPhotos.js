/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Animated, View } from 'react-native'
import { fetchPhotos } from '@redux/actions'
import { connect } from 'react-redux'
import { Spinkit, AnimatedHeader, FlatButton } from '@components'
import { Languages } from '@common'
import Photo from './Photo'
import css from './styles'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class ListPhotos extends PureComponent {
  static propTypes = {
    fetchPhotos: PropTypes.func,
    photos: PropTypes.array,
    isFetching: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.page = 1
    this.isNextPost = false

    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  componentDidMount() {
    if (this.page === 1) {
      this.props.fetchPhotos(this.page)
    }
  }

  renderItem = ({ item }) => {
    return <Photo photo={item} />
  }

  nextPosts = () => {
    this.page += 1
    this.isNextPost = true
    this.props.fetchPhotos(this.page)
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
    const { photos } = this.props

    return (
      <View>
        <AnimatedHeader scrollY={this.state.scrollY} label={Languages.photo} />

        <AnimatedFlatList
          data={photos}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={1}
          contentContainerStyle={css.listView}
          keyExtractor={(item, index) => `photo-${item.id || index}`}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          onEndReached={() => this.isNextPost && this.nextPosts()}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    photos: posts.photos,
    isFetching: posts.isFetching,
  }
}
export default connect(mapStateToProps, { fetchPhotos })(ListPhotos)
