/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Image, View, TouchableOpacity, WebView } from 'react-native'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import { Images } from '@common'
import css from './styles'

export default class Video extends PureComponent {
  state = { played: false }

  static propTypes = {
    imageURL: PropTypes.string,
    videoUrl: PropTypes.string,
    style: PropTypes.any,
  }

  playVideo = () => {
    this.setState({ played: true })
  }

  render() {
    const { imageURL, videoUrl, style } = this.props
    const { played } = this.state

    if (!played && typeof imageURL !== 'undefined') {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={style}
          onPress={this.playVideo}
        >
          <Image
            defaultSource={Images.imageHolder}
            source={{ uri: imageURL }}
            style={css.imageBox}
          />
          <View style={css.iconVideo}>
            <Icon name="control-play" size={25} style={css.iconPlay} />
          </View>
        </TouchableOpacity>
      )
    }

    if (played) {
      return (
        <WebView
          style={style || null}
          source={{ uri: videoUrl }}
          scrollEnabled={false}
        />
      )
    }

    return null
  }
}
