/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'
import Constants from '@common/Constants'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  flatlist: {
    marginTop: 35,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  fill: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  box: {
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  content: {
    backgroundColor: 'transparent',
    width,
    height: height * 90 / 100,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  boxName: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  boxNameText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    fontWeight: '600',
    fontFamily:
      Platform.OS !== 'android'
        ? Constants.fontHeader
        : Constants.fontHeaderAndroid,
    backgroundColor: 'transparent',
  },
  boxCountText: {
    color: '#fff',
    fontFamily:
      Platform.OS !== 'android'
        ? Constants.fontFamily
        : Constants.fontHeaderAndroid,
    fontWeight: '400',
    fontSize: 13,
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  boxCategory: {
    height: width / 4,
    width: width / 2 - 10,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  viewBox: {
    backgroundColor: '#2AB5B3',
    borderRadius: 9,
    overflow: 'hidden',
  },
  imageBox: {
    borderRadius: 6,
    resizeMode: 'cover',
  },
  image: {
    width: width - 30,
    height: 150,
    borderRadius: 9,
    overflow: 'hidden',
  },
  imageView: {
    borderRadius: 6, 
    width: width - 30,
    marginLeft: 15,
    height: 150,
    marginBottom: 30,
    borderRadius: 9,
    overflow: 'hidden',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width - 30
  },
  titleView: {
    width: width,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    fontFamily: Constants.fontHeader,
  },
  containerStyle: {
    shadowColor: '#000',
    backgroundColor: 'transparent',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  description: {
    fontSize: 15,
    color: '#fff',
    marginTop: 4,
    backgroundColor: 'transparent',
    width: width - 90,
    fontFamily: Constants.fontFamily,
  },
  toolbarView: {
    height: 70,
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbarText: {
    fontFamily: Constants.fontHeader,
    fontSize: 20,
    color: '#333',
  },
  toolbarIcon: {
    marginTop: 18,
    width: 30,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'rgba(109, 103, 94, 1)',
  },
  scrollView: {
    paddingTop: 50,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 60,
  },
})
