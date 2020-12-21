/** @format */

import React, { Component } from 'react'
import { Style, Config } from '@common'
import { Category, NewCategory } from '@container'
import Icons from './Icons'

export default class CategoryScreen extends Component {
  static navigationOptions = {
    headerLeft: Icons.Home(),
    header: null,
    headerStyle: Style.toolbar,
  }

  render() {
    const { navigate } = this.props.navigation
    if (Config.showSubCategoryScreen) {
      return (
        <NewCategory
          onViewPost={(item, index, parentPosts) =>
            navigate('postDetail', { post: item, index, parentPosts, backToRoute: 'category' })
          }
          onViewCategory={(config) => navigate('PostListScreen', config)}
        />
      )
    } else {
      return (
        <Category
          onViewPost={(item, index, parentPosts) =>
            navigate('postDetail', { post: item, index, parentPosts, backToRoute: 'category' })
          }
          onViewCategory={(config) => navigate('PostListScreen', config)}
        />
      )
    }
  }
}
