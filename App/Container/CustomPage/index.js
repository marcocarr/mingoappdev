/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import wp from '@services/WPAPI'
import WebView from '@components/WebView/WebView'
import { Toolbar } from '@components'

export default class CustomPage extends PureComponent {
  static propTypes = {
    id: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = { html: '' }
    this.fetchPage = this.fetchPage.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.fetchPage(this.props.id)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.fetchPage(nextProps.id)
  }

  fetchPage = (id) => {
    wp
      .pages()
      .id(id)
      .get((err, data) => {
        if (data) {
          this.setState({
            html:
              typeof data.content.rendered !== 'undefined'
                ? data.content.rendered
                : 'Content is updating',
          })
        }
      })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Toolbar />
        <WebView html={this.state.html} />
      </View>
    )
  }
}
