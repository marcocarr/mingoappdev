/** @format */

import { AsyncStorage } from 'react-native'
import { Events, Constants, warn } from '@common'
import URI from 'urijs'
import { AllHtmlEntities } from 'html-entities'
import truncate from 'lodash/truncate'

export default class Tools {
  /**
   * refresh the tab bar & read later page
   */
  static refresh() {
    Events.loginRefresh()
    Events.homePageRefresh()
    Events.sideMenuRefresh()
  }

  /**
   * Get data image size base on the width
   */
  static getImageSize(data, widthScreen) {
    const size = { width: widthScreen, height: 0 }

    if (typeof data.better_featured_image == 'undefined') {
      // check the _embbed
      if (typeof data._embedded != 'undefined') {
        if (data._embedded['wp:featuredmedia'].length > 0) {
          if(typeof data._embedded['wp:featuredmedia'][0].media_details == 'undefined') 
            return size;

          const { width, height } = data._embedded['wp:featuredmedia'][0].media_details
          size.height = (widthScreen * height) / width
        }
      }

      return size;
    }

    if (typeof data.better_featured_image !== 'undefined') {
      const { width, height } = data.better_featured_image.media_details
      size.height = (widthScreen * height) / width
    }
    return size
  }

  static getImage(data, imageSize) {
    let size = imageSize

    if (typeof data === 'undefined' || data == null) {
      return ''
    }

    if (typeof size === 'undefined') {
      size = 'medium'
    }

    if (typeof data.better_featured_image == 'undefined') {
      // check the _embbed
      if (typeof data._embedded != 'undefined') {
        if (typeof data._embedded['wp:featuredmedia'][0] != 'undefined') {
          if (typeof data._embedded['wp:featuredmedia'][0].media_details != 'undefined')  {
            if (typeof data._embedded['wp:featuredmedia'][0].media_details.sizes[size] != 'undefined') {
              return data._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url;  
            }
          }
        }
      }

      return '';
    }



    const getImageURL = (mediaDetail) => {
      let imageURL = ''
      if (typeof mediaDetail.sizes !== 'undefined') {
        if (typeof mediaDetail.sizes[size] !== 'undefined') {
          imageURL = mediaDetail.sizes[size].source_url
        }

        if (imageURL == '' && typeof mediaDetail.sizes.medium !== 'undefined') {
          imageURL = mediaDetail.sizes.medium.source_url
        }

        if (imageURL == '' && typeof mediaDetail.sizes.full !== 'undefined') {
          imageURL = mediaDetail.sizes.large.source_url
        }
      }

      return imageURL
    }

    let imageURL =
      typeof data.better_featured_image !== 'undefined' &&
      data.better_featured_image != null
        ? data.better_featured_image.source_url
        : ''

    if (data.better_featured_image == null) {
      return imageURL;
    }

    if (
      typeof data.better_featured_image != 'undefined' &&
      typeof data.better_featured_image.media_details !== 'undefined'
    ) {
      imageURL = getImageURL(data.better_featured_image.media_details)
    }

    

    if (imageURL == '' && typeof data.better_featured_image != null) {
      imageURL = data.better_featured_image.source_url
    }

    if (!imageURL) {
      return Constants.placeHolderImage
    }

    return imageURL
  }

  static getYoutubeLink = (content) => {
    const regExp = /^.*((www.youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#&\?\/\ ]*).*/
    let embedId = ''
    let youtubeUrl = ''

    try {
      URI.withinString(content, (url) => {
        const match = url.match(regExp)
        if (match && match[7].length === 11) {
          embedId = match[7]
          youtubeUrl = `https://www.youtube.com/embed/${embedId}`
        }
      })
    } catch (error) {}
    return youtubeUrl
  }

  // https://www.facebook.com/facebook/videos/10153231379946729/
  static getFacebookLink = (content) => {
    const regExp = /^.*((www.facebook.com\/facebook\/)|(v\/)|(\/u\/\w\/)|(videos\/))([^#&\?\/\ ]*).*/
    let embedId = ''
    let facebookURL = ''

    try {
      URI.withinString(content, (url) => {
        const match = url.match(regExp)

        if (match && match[6].length > 14) {
          embedId = match[6]
          facebookURL = `https://www.facebook.com/video/embed?video_id=${embedId}`
        }
      })
    } catch (error) {}

    return facebookURL
  }

  // https://player.vimeo.com/video/192142314
  static getVimeoLink = (content) => {
    const regExp = /^.*((player.vimeo.com)|(v\/)|(\/u\/\w\/)|(video\/))([^#&\?\/\ ]*).*/
    let embedId = ''
    let vimeoURL = ''

    try {
      URI.withinString(content, (url) => {
        const match = url.match(regExp)
        if (match && match[6].length === 9) {
          embedId = match[6]
          vimeoURL = `https://player.vimeo.com/video/${embedId}`
        }
      })
    } catch (error) {}
    return vimeoURL
  }

  static getLinkVideo(content) {
    const youtubeURL = Tools.getYoutubeLink(content)
    const videoURL = Tools.getFacebookLink(content)
    const getVimeoLink = Tools.getVimeoLink(content)
    return youtubeURL || videoURL || getVimeoLink
  }

  static async getFontSizePostDetail() {
    const data = await AsyncStorage.getItem('@setting_fontSize')
    if (typeof data !== 'undefined') {
      return parseInt(data)
    }
    return Constants.fontText.size
  }

  static formatText(desc, limit) {
    if (typeof limit === 'undefined') {
      limit = 50
    }

    if (typeof desc === 'undefined') {
      return ''
    }

    var desc = desc.replace('<p>', '')
    desc = truncate(desc, { length: limit, separator: ' ' })

    return AllHtmlEntities.decode(desc)
  }

  static viewCateDetail(categoryId) {
    Events.homePageSetActiveCate(categoryId)
  }
}
