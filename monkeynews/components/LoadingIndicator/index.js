import React from "react";
import {
  View,
  ActivityIndicator
} from "react-native";

export default CustomLoader = (props) => {
    return (
        <View style={styles.downArrowIconContainer}>
            <ActivityIndicator {...props}/>
        </View>
    )
}

const styles = {
    downArrowIconContainer: {
        position: 'absolute', width: 15, height: 15, top: 15, right: 15, resizeMode: 'contain'
    }
}