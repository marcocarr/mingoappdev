/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Platform, Animated, View, Dimensions } from 'react-native'
import flatten from 'lodash/flatten'
import { fetchCategories, fetchPosts, setActiveCategory } from '@redux/actions'
import { connect } from 'react-redux'
import { Color, Constants } from '@common'
import { PostList, HeaderFilter, Modal } from '@components'

import styles from './styles'
import Category from './Category'

const PAGE_HEIGHT = Dimensions.get('window').height
const BANNER_HEIGHT = PAGE_HEIGHT * 12 / 100

class CategoryList extends PureComponent {
  static propTypes = {
    categories: PropTypes.array,
    fetchCategories: PropTypes.func,
    setActiveCategory: PropTypes.func,
    fetchPosts: PropTypes.func,
    onViewPost: PropTypes.func,
    selectedCategory: PropTypes.any,
  }

  state = {
    // animateContent: new Animated.Value(PAGE_HEIGHT),
    // scrollY: new Animated.Value(0),
    androidColor: '#fff',
  }

  constructor(props) {
    super(props)
    // props.selectedCategory = 0
    this.categoryRef = null
    this.page = 1
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.fetchCategories()
    }
  }

  onShowCategory = () => {
    // Animated.spring(this.state.animateContent, {toValue: PAGE_HEIGHT, duration: duration}).start();
    this.props.setActiveCategory(null)
    this.categoryRef.revertAnimate()
  }

  // close current category item and back to main page
  onScroll = (event) => {
    this.page = this.page + 1
    if (event.nativeEvent.contentOffset.y < -PAGE_HEIGHT * 10 / 100) {
      this.onShowCategory()
      this.fetchPosts(this.page, null, this.props.selectedCategory )
    }
  }

  // calback from child element
  onPressItem = (id, ref) => {
    this.props.setActiveCategory(id)
    this.props.fetchPosts(this.page, null, id)
    this.categoryRef = ref
    this.setState({ androidColor: ref.props.color })
  }

  renderRow = (item, index) => {
    const isShow =
      this.props.selectedCategory == null ||
      this.props.selectedCategory === item.id
        ? 1
        : 0
    if (isShow) {
      return (
        <Category
          key={`cate${index}`}
          color={Color.colors[index % 12]}
          selectedCategory={this.props.selectedCategory}
          onPressItem={this.onPressItem}
          category={item}
        />
      )
    }
    return <View key={`cate${index}`} style={styles.boxCategory} />
  }

  renderListView = () => {
    return (
      <ScrollView
        style={[styles.content]}
        scrollEventThrottle={16}
        onScroll={this.onScroll}
      >
        <View
          style={{
            height: BANNER_HEIGHT,
            backgroundColor:
              Platform.OS === 'android'
                ? this.state.androidColor
                : 'transparent',
          }}
        />

        <HeaderFilter showCategory onShowContent={this.onShowCategory} />
        <PostList
          enableLoading
          layout={Constants.Layout.column}
          onViewPost={this.props.onViewPost}
        />
      </ScrollView>
    )
  }

  render() {
    const { categories, selectedCategory } = this.props

    return (
      <ScrollView style={styles.fill}>
        <View style={styles.flatlist}>
          {categories.map((category, index) => this.renderRow(category, index))}
          {selectedCategory != null && this.renderListView()}
        </View>

        <Modal.Layout key="LayoutCategory" />
        <Modal.Tag key="TagCategory" />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const selectedCategory = state.categories.selectedCategory
  const categories = flatten(state.categories.list)

  return { categories, selectedCategory }
}
export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts,
  setActiveCategory,
})(CategoryList)
