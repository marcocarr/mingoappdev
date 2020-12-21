/** @format */

import React, { Component } from 'react'
import { Style } from '@common'
import { PostNews } from '@container'
import Icons from './Icons'

export default class PostNewsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { navigation } = this.props
    const { navigate } = navigation

    return (
      <PostNews
        onBack={()=>navigation.goBack()}
        next={(post) =>navigate('postNewsContent',{post})}/>
    )
  }
}
