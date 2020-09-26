import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BUTTON_GRADIENT_COLORS = ["#0033E9", "#366ECE", "#BD10E0"];

export const LinearGradientButton = (props) => {
    return(
        <TouchableOpacity style={props.buttonStyle}>
            <LinearGradient colors={BUTTON_GRADIENT_COLORS} 
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            style={props.gradientStyle}>
                {props.children}
            </LinearGradient>
        </TouchableOpacity>
    )
}