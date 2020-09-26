import React from "react";
import { TouchableOpacity, Pressable, Animated, Easing, ActivityIndicator } from "react-native";
import Util from "../../util";
import { Colors } from "../../theme";
import Styles from "../../assets/stylesheets/styles";
// import PropTypes from "prop-types";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

export default class ButtonView extends React.PureComponent {
  // static propTypes = {
  //   style: PropTypes.oneOfType([
  //     PropTypes.array,
  //     PropTypes.object,
  //     PropTypes.number
  //   ]),
  //   children: PropTypes.node.isRequired,
  //   rippleOnAndroid: PropTypes.bool
  // };

  // static defaultProps = {
  //   style: {},
  //   rippleOnAndroid: false
  // };

  state = {
    loginContainer: new Animated.Value(0),
    indicatorContainer: new Animated.Value(0),
  }

  startAnimate() {
    Animated.sequence([
      Animated.timing(this.state.loginContainer, {
        toValue: -50,
        useNativeDriver: true,
        duration: 200,
        easing: Easing.quad
      }),
      Animated.timing(this.state.indicatorContainer, {
        toValue: 1,
        useNativeDriver: true,
        duration: 180,
        easing: Easing.linear
      })
    ]).start()
  }

  stopAnimate() {
    Animated.sequence([
      Animated.timing(this.state.indicatorContainer, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
        easing: Easing.sin
      }),
      Animated.timing(this.state.loginContainer, {
        toValue: 0,
        useNativeDriver: true,
        duration: 250,
        easing: Easing.elastic()
      }),
    ]).start()
  }

  render() {
    const { style, children, rippleOnAndroid, rippleColor, disabled, shouldAnimate, ...rest } = this.props;
    const rippleConfig = {
      color: rippleColor ? rippleColor : Colors.buttonRippleColor,
      borderless: false
    };
    if( shouldAnimate && disabled ) {
      ReactNativeHapticFeedback.trigger("impactMedium", options);
      this.startAnimate()
    } else if( shouldAnimate && !disabled ) {
      this.stopAnimate()
    }
    if (Util.isPlatformAndroid()) {
      return (
        <Pressable
        style={[Styles.appButton, style]}
        android_ripple={rippleConfig}
        delayLongPress={0}
        disabled={disabled}
        {...rest}>
          {
            !shouldAnimate ? ( this.props.children )
            : (
              <>
                <Animated.View style={{transform: [{translateY: this.state.loginContainer}]}}>
                  {this.props.children}
                </Animated.View>
                <Animated.View style={{position: 'absolute', opacity: this.state.indicatorContainer}}>
                  <ActivityIndicator size='large' animating={true} color='#fff'/>
                </Animated.View>
              </>
            )
          }
        </Pressable>
      );
    }

    return (
      <TouchableOpacity style={[Styles.appButton, style]} activeOpacity={0.5} {...rest} disabled={disabled}>
        {
          !shouldAnimate ? ( this.props.children )
          : (
            <>
              <Animated.View style={{transform: [{translateY: this.state.loginContainer}]}}>
                {this.props.children}
              </Animated.View>
              <Animated.View style={{position: 'absolute', opacity: this.state.indicatorContainer}}>
                <ActivityIndicator size='large' animating={true} color='#fff'/>
              </Animated.View>
            </>
          )
        }
      </TouchableOpacity>
    );
  }
}
