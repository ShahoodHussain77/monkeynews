// @flow
import React, { Component } from "react";
import { Provider } from "react-redux";
import { AppRegistry, View, NativeModules } from "react-native";
import { MessageBar } from "./components";
import configureStore from "./store";
import AppNavigator from "./navigator";
import MainApp from "../src_old/src-app";

import applyConfigSettings from "./config";
import AppStyles from "./theme/AppStyles";
import Util from "./util";
import DataHandler from "./services/DataHandler";
import SplashScreen from "react-native-splash-screen";

const reducers = require("./reducers").default;

applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({ isLoading: false });
    })
  };

  _loadingCompleted() {
    DataHandler.setStore(this.state.store);
  }

  componentDidMount() {
    SplashScreen.hide();

    /* if (Util.isPlatformAndroid()) {
      setTimeout(() => {
        NativeModules.SplashScreen.hide();
      }, 1000);
    } */
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={AppStyles.flex}>
        <Provider store={this.state.store}>
          <MainApp />
        </Provider>
        <MessageBar />
      </View>
    );
  }
}

AppRegistry.registerComponent("AutoConnect", () => App);
