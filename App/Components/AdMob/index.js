'use strict';
import React, {Component} from "react";
import {View, TouchableHighlight, Text} from 'react-native';
import css from './style';
import {Constants, Config, log} from "@common"
import {AdMobBanner} from 'expo-ads-admob';

export default class Index extends Component {
  // componentWillUnmount() {
  //   AdMobInterstitial.removeAllListeners();
  // }

  // showInterstital() {
  //   AdMobInterstitial.showAd((error) => error && log(error));
  // }

  // interstitialDidClose() {
  //   AdMobInterstitial.requestAd((error) => error && log(error));
  // }

  render() {
    return (
      <View style={css.body}>
        <AdMobBanner
          ref={component => this._root = component}
          bannerSize={'fullBanner'}
          testDeviceIDs={[Config.AdMob.deviceID]}
          adUnitID={Config.AdMob.unitID}
        />
      </View>
    )
  }
}
