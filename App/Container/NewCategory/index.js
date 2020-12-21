/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Animated, ScrollView, Image, View, Text } from "react-native";
import { flatten } from "lodash";
import {
  fetchParentCategories,
  fetchSubCategories,
  setActiveLayout,
  setActiveCategory
} from "@redux/actions";
import { connect } from "react-redux";
import { Color, Languages, Config, Images } from "@common";
import { TouchableScale, AnimatedHeader } from "@components";
import ParentCategories from "./ParentCategories";
import styles from "./styles";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class CategoryHome extends PureComponent {
  state = {
    scrollY: new Animated.Value(0)
  };

  componentDidMount() {
    this.props.fetchParentCategories();
  }

  showCategory = category => {
    const { setActiveCategory, onViewCategory } = this.props;
    setActiveCategory(category.id);

    onViewCategory({ config: { name: category.name, category: category.id } });
  };

  render() {
    const { parentCategories, subCategories } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <AnimatedScrollView
          scrollEventThrottle={1}
          contentContainerStyle={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
         <ParentCategories
            items={parentCategories}
            onPress={this.fetchSubCategories}
          />
          {subCategories.map((category, index) => {
            let imageCategory = Config.imageCategories[category.slug];
            if (imageCategory === undefined) {
              imageCategory = Images.imageHolder;
            }

            return (
              <View style={styles.containerStyle}>
                <TouchableScale
                  style={styles.imageView}
                  key={index + "img"}
                  onPress={() => this.showCategory(category)}
                >
                  <Image style={styles.image} source={imageCategory} />

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
            );
          })}
        </AnimatedScrollView>
      </View>
    );
  }

  fetchSubCategories = item => {
    this.props.fetchSubCategories(item.id);
  };
}

const mapStateToProps = state => {
  const selectedCategory = state.categories.selectedCategory;
  const parentCategories = flatten(state.categories.parentCategories);
  const subCategories = flatten(state.categories.subCategories);
  const selectedLayout = state.categories.selectedLayout;
  return { parentCategories, subCategories, selectedCategory, selectedLayout };
};
export default connect(
  mapStateToProps,
  {
    fetchParentCategories,
    fetchSubCategories,
    setActiveLayout,
    setActiveCategory
  }
)(CategoryHome);
