/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Constants } from '@common'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchWrap: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#999',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    textAlign: Constants.RTL ? "right" : 'left',
   
    fontFamily: Constants.fontFamily,
    ...Platform.select({
      ios: {
        marginVertical: 15,
      },
      android: {
        marginTop: 8,
      },
    }),
    marginRight: Constants.RTL ? 10 : 0
  },

  msg: {
    fontSize: Constants.fontText.fontSizeMax,
    fontFamily: Constants.fontFamily,
    color: '#999',
    marginBottom: 100,
  },

  searchView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: width * 0.7,
    height: height * 0.7,
    resizeMode: 'contain',
  },
})
