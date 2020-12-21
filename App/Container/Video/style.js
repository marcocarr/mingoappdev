/** @format */

import { StyleSheet, Dimensions } from 'react-native'
import { Color, Constants } from '@common'

const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listView: {
    paddingTop: 50,
  },
  list: {
    marginTop: 60,
    backgroundColor: Color.main,
    paddingLeft: 8,
    paddingRight: 8,
  },
  more: {
    width,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  listAndroid: {
    marginTop: 10,
    backgroundColor: Color.main,
    paddingLeft: 8,
    paddingRight: 8,
  },
  loading: {
    marginTop: vh * 30,
  },
  box: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 2,
  },
  boxShadow: {
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: width / 2,
    position: 'relative',
  },
  overlayVideo: {
    top: 0,
    left: 0,
    zIndex: 100,
    width,
    height: width / 2,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  iconPlay: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginRight: 18,
    marginBottom: 10,
    marginLeft: 26,
    zIndex: 9999,
    width: 28,
  },
  iconVideo: {
    alignItems: 'center',
    justifyContent: 'center',
    top: width / 5 - 10,
    left: width / 2 - 30,
    zIndex: 999,
    width: 60,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    height: 60,
    borderRadius: 40,
  },
  textIconVideo: {
    fontSize: 80,
  },
  boxSharing: {
    flex: 1,
    flexDirection: 'row',
    marginTop: -12,
  },
  boxCate: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.8)',
    borderRadius: 6,
    marginLeft: 16,
    height: 24,
  },
  boxCateText: {
    paddingLeft: 12,
    marginRight: 10,
    fontSize: 10,
    color: '#FFF',
    letterSpacing: 2,
  },
  boxBookShare: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: -10,
    marginRight: 10,
  },
  boxIcon: {
    marginRight: 6,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 6,
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
    borderRadius: 40,
  },
  iconHeart: {
    marginTop: 8,
    marginRight: 6,
    marginBottom: 6,
    marginLeft: 6,
    color: '#000',
    backgroundColor: 'transparent',
  },
  iconShare: {
    marginTop: 8,
    marginRight: 6,
    marginBottom: 6,
    marginLeft: 6,
    color: '#000',
    width: 18,
    backgroundColor: 'transparent',
  },
  boxName: {
    backgroundColor: '#FFF',
    marginLeft: 8,
    marginTop: 12,
    height: vh * 12,
  },
  title: {
    fontSize: 16,
    width: width - 40,
    marginLeft: 10,
    marginTop: 0,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
    textAlign: 'left',
  },
  time: {
    marginLeft: 10,
    marginRight: 16,
    color: '#999',
    fontSize: 11,
    marginBottom: 12,
  },
  shareIcon: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -30,
    left: vw,
  },
  leftTime: {
    position: 'absolute',
    left: Constants.RTL ? width - vw * 25 : 0,
    bottom: -30,
  },
})
