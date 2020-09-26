import 'react-native-gesture-handler';
import React, { Component } from "react";
import { Provider } from "react-redux";
import {View, StatusBar} from "react-native";
import configureStore from "./store";
import Router from "./routes/router";
import applyConfigSettings from "./config";
import AppStyles from "./theme/AppStyles";
import DataHandler from "./services/DataHandler";
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './services/AlertHelper';
// import { Metrics } from "./theme";

const reducers = require("./reducers").default;

applyConfigSettings();

export default class Main extends Component {
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

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={AppStyles.flex}>
        <Provider store={this.state.store}>
          <Router />
        </Provider>
        <DropdownAlert
          defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
          updateStatusBar={false}
          closeInterval={3000}
          showCancel={true}
          messageNumOfLines={6}
          ref={ref => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </View>
    );
  }
}
