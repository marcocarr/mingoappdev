/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, ImageBackground, View, TouchableOpacity } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import { Tools, Constants } from '@common'
import CommentIcons from '@components/CommentIcons'
import css from './style'

export default class VideoControl extends PureComponent {
  static propTypes = {
    video: PropTypes.object,
    onViewPost: PropTypes.func,
  }
  render() {
    const data = this.props.video
    const imageURL = Tools.getImage(data, Constants.PostImage.large)
    const onViewPost = this.props.onViewPost

    return (
      <View style={css.boxShadow}>
        <View style={css.box}>
          <TouchableOpacity activeOpacity={0.9} onPress={onViewPost}>
            <ImageBackground source={{ uri: imageURL }} style={css.imageBox}>
              <View style={css.iconVideo}>
                <Icon name="control-play" size={25} style={css.iconPlay} />
              </View>
              <View style={css.overlayVideo} />
            </ImageBackground>
          </TouchableOpacity>

          <View style={css.boxName}>
            <TouchableOpacity activeOpacity={0.9} onPress={onViewPost}>
              <Text style={css.title}>
                {Tools.formatText(data.title.rendered, 300)}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <View style={css.leftTime}>
                <Text style={css.time}>
                  <TimeAgo time={data.date} hideAgo />
                </Text>
              </View>

              <CommentIcons
                post={this.props.video}
                iconIconHeart="#000"
                hideCommentIcon
                style={Constants.RTL ? css.shareIcon : null}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
