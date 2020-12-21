/** @format */

import { StyleSheet, Dimensions } from 'react-native'
import { Color, Constants } from '@common'

const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  body: {
    backgroundColor: Color.main,
    paddingBottom: 100,
  },
  listView: {
    paddingTop: 50,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 60,
  },

  more: {
    width,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  loading: {
    marginTop: vh * 30,
  },
  wrapSearch: {
    position: 'relative',
    zIndex: 111,
    width: 0,
    height: 0,
  },
  boxPhoto: {
    height: width / 3 - 20,
    width: width / 3 - 12,
    borderColor: '#FFF',
    marginBottom: 8,
    marginLeft: 8,
    borderRadius: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  boxWrapImage: {
    flex: 2,
  },
  boxImage: {
    flex: 1,
    borderRadius: 3,
    overflow: 'hidden',
  },
  boxTitle: {
    flexDirection: 'row',
    backgroundColor: '#F9F9f9',
  },
  boxLeftTitle: {
    flex: 4.5,
  },
  titlePhoto: {
    fontSize: 14,
  },
  boxRightIcon: {
    flex: 1,
  },
  inputText: {
    height: 0,
    borderColor: '#FFF',
    color: 'rgb(180,180,180)',
    backgroundColor: '#FFF',
    borderWidth: 2,
    paddingLeft: 35,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 5,
    position: 'relative',
    zIndex: 111,
    fontSize: 15,
    width: 0,
  },
  searchIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#999',
    top: 20,
    left: 20,
    zIndex: 222,
  },
  list: {
    flex: 1,
    marginBottom: 55,
    backgroundColor: 'transparent',
  },
  color: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EBEBEB',
  },
  modalBoxWrap: {
    position: 'absolute',
    borderRadius: 2,
    width,
    height,
  },
  image: {
    width,
    height: height - 40,
  },
  modal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9998,
  },
  spinnerView: {
    flex: 1,
    alignItems: 'center',
  },
  detailPanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textClose: {
    color: '#666',
    fontWeight: '600',
    fontSize: 11,
  },
  iconZoom: {
    position: 'absolute',
    right: 0,
    top: 50,
    backgroundColor: 'rgba(255,255,255,.9)',
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
  },
  imageIcon: {
    flex: 1,
    width: 20,
    height: 20,
  },
  backBtn: {
    backgroundColor: 'transparent',
    height: 15,
    width: 15,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  backBtnText: {
    color: '#000',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    top: 0,
    height: 40,
    marginTop: -40,
    justifyContent: 'flex-start',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  dotActive: {
    backgroundColor: 'transparent',
    borderColor: '#FFF',
    borderWidth: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  shareIcons: {
    position: 'absolute',
    bottom: -5,
    right: Constants.RTL ? vw - 7 : -4,
    zIndex: 9999,
  },
})
