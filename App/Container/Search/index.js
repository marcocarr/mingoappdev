/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, FlatList, TextInput } from 'react-native'
import { Images, Constants, warn, Languages } from '@common'
import { PostLayout } from '@components'
import { searchPosts } from '@redux/actions'
import { connect } from 'react-redux'
import styles from './styles'

class Search extends PureComponent {
  state = {
    searchText: '',
  }

  static propTypes = {
    postsInSearch: PropTypes.array,
    searchPosts: PropTypes.func,
    onViewPost: PropTypes.func,
  }

  static defaultProps = {
    postsInSearch: [],
  }

  onSearch = (searchText) => {
    this.setState({ searchText })
    if (searchText.trim().length > 2) {
      this.props.searchPosts(searchText)
    }
  }

  onViewPost = (item, index) => {
    this.props.onViewPost(item, index)
  }

  render() {
    const { postsInSearch } = this.props
    const { searchText } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.searchWrap}>
          <Image
            source={{ uri: Images.icons.search }}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.input]}
            direction = {Constants.RTL ? 'rtl' : '' }
            autoCapitalize="none"
            placeholder={`${Languages.search}...`}
            placeholderTextColor="#999"
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            value={searchText}
            onChangeText={this.onSearch}
          />
        </View>
        {postsInSearch.length > 0 && (
            <FlatList
              data={postsInSearch}
              keyExtractor={(item, index) => `searchList-${index}`}
              renderItem={({ item, index }) => (
                <PostLayout
                  post={item}
                  onViewPost={() => this.onViewPost(item, index)}
                  layout={Constants.Layout.list}
                />
              )}
            />
          )}
        {postsInSearch.length == 0 && (
          <View style={styles.searchView}>
            <Image style={styles.emptyImage} source={Images.emptySearch} />
            <Text style={styles.msg}>{Languages.noResults}</Text>
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ posts, tags, categories }) => {
  return {
    postsInSearch: posts.postsInSearch,
    postFinish: posts.postFinish,
    isFetching: posts.isFetching,
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
  }
}

export default connect(mapStateToProps, { searchPosts })(Search)
