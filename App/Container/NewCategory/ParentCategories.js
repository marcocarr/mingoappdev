/** @format */

import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'

export default class Category extends PureComponent {

  state = {
    selected: 0
  }
  render() {
    const { items } = this.props

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {items.map((item, index) => this.renderItem(item, index))}
        </ScrollView>
      </View>
    )
  }

  renderItem = (item, index) => {
    return (
      <TouchableOpacity key={index} style={styles.item} onPress={() => this.onPressItem(item, index)}>
        <Text style={[styles.name, this.state.selected == index && styles.active]}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  onPressItem = (item, index) => {
    this.setState({ selected: index })
    this.props.onPress(item)
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingLeft: 10
  },
  item: {
    height: 40,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 16,
    color: "#818181"
  },
  active: {
    color: "#000"
  }
})
