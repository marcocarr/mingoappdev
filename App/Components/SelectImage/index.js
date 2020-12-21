/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { Images, Languages } from '@common'
import styles from './style'
import {ImagePicker, Permissions} from "@expo"

class SelectImage extends PureComponent {
  state = {
    imageUri: ""
  }
  render() {
    let {style, required} = this.props
    let {imageUri} = this.state
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{Languages.selectTheImage}</Text>
        <TouchableOpacity style={[styles.imgWrap, required && styles.required]} activeOpacity={0.75} onPress={this.showPicker}>
          {imageUri != "" && <Image source={{uri: imageUri}} style={styles.image}/>}
          <Image source={Images.AddIcon} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    )
  }

  showPicker = async ()=>{
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status == 'granted') {
      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      }
      const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync(options)
      if (!cancelled) {
        this.setState({imageUri: uri})
        this.props.onSelectImage(uri)
      }
    }else if (status == "denied") {
      alert(Languages.allowAccessCameraroll)
    }

  }
}

export default SelectImage
