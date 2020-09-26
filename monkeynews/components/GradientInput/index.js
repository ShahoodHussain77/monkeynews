import React from "react";
import {
  TextInput,
  StyleSheet,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const INPUT_GRADIENT_COLORS = ["#FFFFFF6E", "#FFFFFF29"]

export default GradientInput = (props) => {
    return(
        <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
            <TextInput 
            {...props}
            placeholderTextColor="#fff"
            style={styles.input}/>
            {props.children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    textInputBox: {
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 24,
        paddingRight: 24,
        borderColor: '#FFFFFF4D',
        borderWidth: 1
    },
    input: {
		height: 50,
        flex: 1,
        color: '#fff',
        fontSize: 16
	},
})