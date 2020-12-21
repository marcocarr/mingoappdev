/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ListVideo from './ListVideo'

export default class Videos extends PureComponent {
  static propTypes = {
    onViewPost: PropTypes.func,
    navigation: PropTypes.object,
  }
  render() {
    const { onViewPost, navigation } = this.props
    return <ListVideo onViewPost={onViewPost} navigation={navigation} />
  }
}
