// @flow
import React from "react";
import { View } from "react-native";
import { Text } from "../";
import styles from "./styles";

export default class ViewCard extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }
}
