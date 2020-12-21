/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { Images } from '@common'

const ImageCache = ({ source, style }) => {
  const preview = Images.imageBase

  return <Image style={style} source={ {uri: source.uri } } />
}

ImageCache.propTypes = {
  source: PropTypes.object,
  style: PropTypes.any,
}

export default ImageCache
