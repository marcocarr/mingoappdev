/** @format */

import React from 'react';
import { Image, SafeAreaView} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import reducers from '@redux/reducers';
import thunk from 'redux-thunk';
import { Images, Constants, warn, connectConsoleToReactotron, Config, Style } from '@common';
import Reactotron from 'reactotron-react-native';
import RootRouter from './App/RootRouter';
import './ReactotronConfig';
import moment from "moment";
import 'moment/locale/ar'
import _ from 'lodash'


function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false,
    };

    if (Constants.RTL) {
      moment.locale("ar")
    }
    else {
      moment.locale("en")
    }
  }

  async loadAssets() {
    const imageAssets = cacheImages([Images.logo, Images.EditIcon, Images.emptySearch, Images.WhiteBackIcon, Images.WhiteMoreIcon,
    Images.FavoriteIcon, Images.FavoritedIcon, Images.CommentIcon, Images.ShareIcon, Images.SmallNextIcon, Images.OpenIcon,
    Images.CopyIcon, Images.AddCommentIcon, Images.EditIcon, Images.RTLBackIcon, Images.BackIcon, Images.AddIcon, Images.DownArrowIcon,
    ...Object.values(Config.imageCategories), Images.SuccessIcon]);

    const fontAssets = cacheFonts([
      { OpenSans: require('@assets/fonts/OpenSans-Regular.ttf') },
      { Volkhov: require('@assets/fonts/Volkhov-Regular.ttf') },
    ]);
    await Promise.all([...fontAssets, ...imageAssets]);
  }

  render() {
    let store = null;
    if (__DEV__) {
      if (Constants.useReactotron) {
        store = createStore(reducers, {}, compose(applyMiddleware(thunk),Reactotron.createEnhancer()));
        connectConsoleToReactotron();
      } else {
        const composeEnhancers =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        store = composeEnhancers(applyMiddleware(thunk))(createStore)(reducers);

        if (module.hot) {
          // Enable Webpack hot module replacement for reducers
          module.hot.accept(reducers, () => {
            const nextRootReducer = reducers;
            store.replaceReducer(nextRootReducer);
          });
        }

        // show network react-native-debugger
        // only show on IOS, android bug
        // if (Platform.OS === 'ios') {
        // global.XMLHttpRequest = global.originalXMLHttpRequest
        //   ? global.originalXMLHttpRequest
        //   : global.XMLHttpRequest;
        // global.FormData = global.originalFormData
        //   ? global.originalFormData
        //   : global.FormData;
        // }
      }
    } else {
      store = compose(applyMiddleware(thunk))(createStore)(reducers);
    }

    const persistor = persistStore(store);

    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({ appIsReady: true })}
        />
      );
    }

    return (
      <SafeAreaView style={Style.container}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootRouter />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    );
  }
}
