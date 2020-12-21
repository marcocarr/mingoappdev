/** @format */

import { StyleSheet, Platform } from 'react-native'
import Color from '@common/Color'

export default StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,

    ...Platform.select({
      ios: {
        position: 'absolute',
        top: 50,
        zIndex: 9999,
      },
      android: {
        marginTop: 50,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    paddingBottom: 0,
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  activeTab: {
    height: 0,
    backgroundColor: Color.main,
  },
  textTab: {
    fontWeight: '200',
    fontSize: 25,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  toolbar: {
    left: 14,
    alignSelf: 'flex-start',
  },
})
