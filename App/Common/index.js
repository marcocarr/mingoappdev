/** @format */
import reactotron from 'reactotron-react-native'
import _Color from './Color'
import _Constants from './Constants'
import _Images from './Images'
import _Languages from './Languages'
import _Style from './style'
import _Tools from './Tools'
import _Events from './Events'
import _Config from './Config'
import _Device from './Device'
import _AppConfig from './AppConfig.json'

const _log = values => __DEV__ && reactotron.log(values)
const _warn = values => __DEV__ && reactotron.warn(values)
const _error = values => __DEV__ && reactotron.error(values)

export function connectConsoleToReactotron() {
  console.log = _log;
  console.warn = _warn;
  console.error = _error;
}

export const log =_log
export const warn =_warn
export const error =_error

export const Color = _Color
export const Constants = _Constants
export const Images = _Images
export const Languages = _Languages
export const Layout = _Config.AdvanceLayout
export const Style = _Style
export const Tools = _Tools
export const Events = _Events
export const Config = _Config
export const Reactotron = reactotron
export const Device = _Device
export const AppConfig = _AppConfig