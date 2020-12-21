/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight } from 'react-native'
import CommentIcons from '@components/CommentIcons'
import { Tools, Constants, Events } from '@common'
import { ImageCache } from '@components'
import css from './styles'

export default class Photo extends PureComponent {
  static propTypes = {
    photo: PropTypes.object,
  }

  openPhoto = (data) => {
    Events.openPhotoClick(data)
  }

  render() {
    const data = this.props.photo
    const imageURL = Tools.getImage(data, Constants.PostImage.medium)

    return (
      <View style={css.boxPhoto}>
        <TouchableHighlight
          underlayColor="white"
          style={css.boxWrapImage}
          onPress={() => this.openPhoto(data)}
        >
          <ImageCache source={{ uri: imageURL }} style={css.boxImage} />
        </TouchableHighlight>

        <CommentIcons
          post={this.props.photo}
          style={css.shareIcons}
          hideShareIcon
          hideCommentIcon
          hideOpenIcon
          color="#FFFFFF"
        />
      </View>
    )
  }
}
