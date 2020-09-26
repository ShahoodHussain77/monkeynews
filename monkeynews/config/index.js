// @flow
import DebugSettings from "./DebugSettings";
import { LogBox } from "react-native";

export default () => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    // console.disableYellowBox = !DebugSettings.yellowBox;
    LogBox.ignoreAllLogs(!DebugSettings.yellowBox)
  }
};
