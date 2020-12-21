/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Languages } from '@common'
import { Search } from '@container'

class SearchScreen extends Component {
  static navigationOptions = {
    tabBarLabel: Languages.textBookMark,
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object,
  }

  render = () => {
    const { navigate } = this.props.navigation
    return (
      <Search
        onViewPost={(post, index) =>
          navigate('searchPostDetail', { post, index, fromSearch: true })
        }
      />
    )
  }
}

export default SearchScreen
