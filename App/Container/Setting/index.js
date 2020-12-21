/** @format */

import React from 'react'
import { Text, View } from 'react-native'
import { Slider, Toolbar } from '@components'
import Languages from '@common/Languages'
import css from './style'

const Setting = () => {
  return (
    <View style={css.wrap}>
      <Toolbar name="Setting" />

      <View style={css.boxSetting}>
        <Text style={css.text}>{Languages.fontSize}:</Text>
        <Slider />
      </View>
    </View>
  )
}
export default Setting
