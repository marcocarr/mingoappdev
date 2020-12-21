/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, Dimensions, View, TouchableOpacity } from 'react-native'
import { Languages } from '@common'
import styles from './styles'

const PAGE_WIDTH = Dimensions.get('window').width
const PAGE_HEIGHT = Dimensions.get('window').height

const duration = 200

export default class Category extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    onPressItem: PropTypes.func,
    category: PropTypes.object,
  }

  state = {
    animatePosition: new Animated.ValueXY({ x: 0, y: 0 }),
    animateHeight: new Animated.Value(PAGE_WIDTH / 4),
    animateWidth: new Animated.Value(PAGE_WIDTH / 2 - 20),
    animateHidden: new Animated.Value(1),
    animateScaleUp: new Animated.Value(1),
    // animateIntensity: new Animated.Value(70),
    animateMoveUp: new Animated.ValueXY({ x: 0, y: 0 }),
    animateOpacity: new Animated.Value(1),
  }

  revertAnimate = () => {
    Animated.parallel([
      // for whole view/image position / height / width
      Animated.timing(this.state.animatePosition, {
        toValue: { x: 0, y: 0 },
        duration,
      }).start(),

      Animated.timing(this.state.animateHeight, {
        toValue: PAGE_WIDTH / 4,
        duration,
      }).start(),

      Animated.timing(this.state.animateWidth, {
        toValue: PAGE_WIDTH / 2 - 20,
        duration,
      }).start(),

      // for title opacity / scale up / move up
      Animated.timing(this.state.animateOpacity, {
        toValue: 1,
        duration,
      }).start(),
      Animated.timing(this.state.animateScaleUp, {
        toValue: 1,
        duration,
      }).start(),
      Animated.timing(this.state.animateMoveUp, {
        toValue: { x: 0, y: 0 },
        duration,
      }).start(),

      // for hidden post number
      Animated.timing(this.state.animateHidden, {
        toValue: 1,
        duration,
      }).start(),
    ])
  }

  viewCateDetail = (id) => {
    this.props.onPressItem(id, this)

    this.refs.item.measure((fx, fy, width, height, px, py) => {
      Animated.parallel([
        // for whole view/image position / height / width
        Animated.timing(this.state.animatePosition, {
          toValue: { x: -px, y: -py },
          duration,
        }).start(),
        Animated.timing(this.state.animateHeight, {
          toValue: PAGE_HEIGHT,
          duration,
        }).start(),
        Animated.timing(this.state.animateWidth, {
          toValue: PAGE_WIDTH,
          duration,
        }).start(),

        // for title opacity / scale up / move up
        Animated.timing(this.state.animateOpacity, {
          toValue: 0.7,
          duration,
        }).start(),
        Animated.timing(this.state.animateScaleUp, {
          toValue: 1.3,
          duration,
        }).start(),
        Animated.timing(this.state.animateMoveUp, {
          toValue: { x: -px, y: 34, duration },
        }).start(),

        // for hidden post number
        Animated.timing(this.state.animateHidden, {
          toValue: 0,
          duration,
        }).start(),
      ])
    })
  }

  render() {
    const data = this.props.category

    const nameCate = data.name !== '' ? data.name : ''
    const countPostByCate = data.count !== '' ? data.count : ''
    const offsetXY = this.state.animatePosition.getTranslateTransform()

    return (
      <View ref="item" activeOpacity={0.9} style={styles.boxCategory}>
        <Animated.View
          style={[
            styles.viewBox,
            { backgroundColor: this.props.color },
            { transform: offsetXY },
            {
              width: this.state.animateWidth,
              height: this.state.animateHeight,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.viewCateDetail(data.id)}
            style={{ flex: 1 }}
          >
            <View style={styles.boxName}>
              <Animated.Text
                style={[
                  styles.boxNameText,
                  {
                    opacity: this.state.animateOpacity,
                    transform: [
                      { scale: this.state.animateScaleUp },
                      { translateY: this.state.animateMoveUp.y },
                    ],
                  },
                ]}
              >
                {nameCate}
              </Animated.Text>

              <Animated.Text
                style={[
                  styles.boxCountText,
                  { opacity: this.state.animateHidden },
                ]}
              >
                {countPostByCate} {Languages.posts}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}
