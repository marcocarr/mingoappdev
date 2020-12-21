/** @format */

import React, { PureComponent } from 'react'
import { Text, Image, TouchableOpacity, View } from 'react-native'
import { Events, Tools, Constants } from '@common'
import Modal from 'react-native-modalbox'
import css from './styles'
import ImageViewer from 'react-native-image-zoom-viewer';

export default class PhotoModal extends PureComponent {
  state = { gallery: null }

  componentDidMount() {
    Events.onOpenPhotoClick(this.openPhoto)
    Events.onClosePhotoClick(this.closePhoto)
  }

  openPhoto = (data) => {
    typeof this.refs.modalPhoto !== 'undefined' && this.refs.modalPhoto.open()

    const imageFeature = Tools.getImage(data, Constants.PostImage.large)
    const galleryImages = []

    // we can use the custom field & API here, remove for this scope
    // typeof (data.custom_fields) != 'undefined' ? data.custom_fields.gallery_images : [];
    galleryImages.push({ url: imageFeature })

    this.setState({ gallery: galleryImages })
  }

  closePhoto = () => {
    typeof this.refs.modalPhoto !== 'undefined' && this.refs.modalPhoto.close()
  }

  renderImages = (gallery) => {
    // notice: the 1st solution only works if the URI is using https, or by setting the App Transport Security.
    // if (gallery) {
    //   return gallery.map((element, idx) => (
    //     <Image key={idx} source={{ uri: element.url }} style={css.image} />
    //   ))
    // }

    var images = []
    if (gallery) {
      gallery.map((element, idx) => {
        images.push({ url: element.url })
      })
    }

    return <ImageViewer imageUrls={images} renderIndicator={() => <View />} />
  }

  render() {
    return (
      <Modal
        ref="modalPhoto"
        swipeToClose={false}
        animationDuration={200}
        style={css.modalBoxWrap}
      >
        {this.renderImages(this.state.gallery)}
        <TouchableOpacity style={css.iconZoom} onPress={this.closePhoto}>
          <Text style={css.textClose}>CLOSE</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
