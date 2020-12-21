import { StyleSheet, Platform } from 'react-native'
import { AppConfig } from '@common'

export default StyleSheet.create({
  container: {

  },
  wrapper: {
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: AppConfig.MainColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10
  },
  required: {
    borderColor: 'red',
  }
})
