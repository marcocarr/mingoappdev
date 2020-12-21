/** @format */

import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export default {
  // enable debug mode
  Debug: true,

  // true is debug with reactotron - https://github.com/infinitered/reactotron/releases
  // false is debug with react native debugger - https://github.com/jhen0409/react-native-debugger
  useReactotron: false,

  AppName: 'BeoNews',

  // for right to left language
  RTL: false,

  // check list available font: https://github.com/react-native-training/react-native-fonts
  fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
  fontHeader: Platform.OS === 'android' ? 'Roboto' : 'Avenir-Roman',
  fontHeaderAndroid: 'Roboto',

  firebaseEnable: false, // enable Firebase storage for the Wishslit

  PagingLimit: 12,

  logo: true,

  // Exclude the parent category that not show on the app, empty is mean nothing
  excludeCategories: [1],

  includeCategories: [],

  PostImage: {
    small: 'thumbnail',
    medium: 'medium',
    medium_large: 'medium',
    large: 'full',
  },

  Animate: {
    bounce: 'bounce',
    flash: 'flash',
    jello: 'jello',
    pulse: 'pulse',
    rotate: 'rotate',
    rubberBand: 'rubberBand',
    shake: 'shake',
    swing: 'swing',
    tada: 'tada',
    wobble: 'wobble',
    flipInY: 'flipInY',
    flipInX: 'flipInX',
    zoomIn: 'zoomIn',
    fadeIn: 'fadeIn',
    bounceIn: 'bounceIn',
  },

  Layout: {
    card: 1,
    column: 2,
    list: 3,
    banner: 4,
    twoColumn: 5,
    advance: 6,
    mansory: 7,
    horizontal: 8,
    threeColumn: 9,
    listRight: 10,
    flexColumn: 11,
  },

  Tags: {
    top: 'Top',
    headlight: 'Headlight',
    photo: 'Photos',
    video: 'Videos',
  },

  Menu: {
    Scale: 0,
    Flat: 1,
    FullSize: 2,
    MenuRightBlack: 3,
  },

  Window: {
    width,
    height,
    //headerHeight: 45 * height / 100,
    headerHeight: width / 2,
    profileHeight: 45 * height / 100,
  },

  Key: {
    email: '_Email',
    user: '_User',
    posts: '_Post',
  },

  fontText: {
    size: 12,
    fontSizeMin: 12,
    fontSizeMax: 20,
  },

  LeftMenu: {
    scale: 0,
    overlay: 1,
    small: 2,
    wide: 3,
  },
}
