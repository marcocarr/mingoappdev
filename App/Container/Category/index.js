/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, ScrollView, Image, View, Text } from 'react-native'
import { flatten } from 'lodash'
import {
  fetchCategories,
  setActiveLayout,
  setActiveCategory,
} from '@redux/actions'
import { connect } from 'react-redux'
import { Color, Languages, Config, Images } from '@common'
import { CategoryList, TouchableScale, AnimatedHeader } from '@components'
import FAB from '@custom/react-native-fab'
import Icon from '@expo/vector-icons/FontAwesome'
import styles from './styles'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class CategoryHome extends PureComponent {
  static propTypes = {
    categories: PropTypes.array,
    fetchCategories: PropTypes.func,
    setActiveCategory: PropTypes.func,
    onViewPost: PropTypes.func,
    onViewCategory: PropTypes.func,
    setActiveLayout: PropTypes.func,
    selectedLayout: PropTypes.bool,
  }

  state = {
    scrollY: new Animated.Value(0),
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  showCategory = (category) => {
    const { setActiveCategory, onViewCategory } = this.props
    setActiveCategory(category.id)

    onViewCategory({ config: { name: category.name, category: category.id } })
  }

  changeLayout = () => {
    this.props.setActiveLayout(!this.props.selectedLayout)
  }

  renderContent = () => {
    const { categories, onViewPost, selectedLayout } = this.props

    if (!selectedLayout) {
      return <CategoryList showBanner onViewPost={onViewPost} />
    }

    return (
      <View>
        <AnimatedHeader scrollY={this.state.scrollY} label={Languages.category} />
        <AnimatedScrollView
          scrollEventThrottle={1}
          contentContainerStyle={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true }
            )}
          >
          {typeof categories !== 'undefined' &&
            categories.map((category, index) => {
              let imageCategory = Config.imageCategories[category.slug]
              if (imageCategory === undefined) {
                imageCategory = Images.imageHolder
              }

              return (
                <View style={styles.containerStyle} key={'catehome-' + index}>
                <TouchableScale style={styles.imageView} key={index + 'img'} onPress={() => this.showCategory(category)}>
                  <Image                  
                    style={styles.image}
                    source={imageCategory}
                  />
                  
                  <View style={styles.overlay}>
                    <Text style={styles.title}>{category.name}</Text>
                      {category.description.length > 0 && (
                      <Text numberOfLines={2} style={styles.description}>
                        {category.description}
                      </Text>
                    )}
                  </View>

                </TouchableScale>
                </View>
              )
            })}
        </AnimatedScrollView>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {this.renderContent()}

        {Config.showSwitchCategory && (
          <FAB
            buttonColor={Color.toolbarTint}
            iconTextColor="#FFFFFF"
            onClickAction={this.changeLayout}
            visible
            iconTextComponent={<Icon name="exchange" />}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const selectedCategory = state.categories.selectedCategory
  const categories = flatten(state.categories.list)
  const selectedLayout = state.categories.selectedLayout
  return { categories, selectedCategory, selectedLayout }
}
export default connect(mapStateToProps, {
  fetchCategories,
  setActiveLayout,
  setActiveCategory,
})(CategoryHome)
