import {Dimensions, Platform} from 'react-native';

const {width, height, scale} = Dimensions.get("window");

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812)

export default {
  isIphoneX,
  ToolbarHeight: 0
}