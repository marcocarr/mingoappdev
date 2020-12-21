/** @format */

import React from 'react'
import { View } from 'react-native'
import ListPhotos from './ListPhotos'
import PhotoModal from './PhotoModal'
import css from './styles'

const Photo = () => {
  return (
    <View style={css.body}>
      <ListPhotos />
      <PhotoModal />
    </View>
  )
}

export default Photo
