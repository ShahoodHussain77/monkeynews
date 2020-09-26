/**
 * Created by waleed  on 13/05/2019.
 */

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground, 
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { userLoginRequest, messagesRequest } from "../../actions/UserActions";
import { connect } from "react-redux";
import _ from "lodash";
import Util from "../../util";
import LinearGradient from 'react-native-linear-gradient';
import { BACKGROUND_IMAGE_CAR } from "../../constants";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import TouchID from 'react-native-touch-id';
// import Spinner from 'react-native-loading-spinner-overlay';


const BUTTON_GRADIENT_COLORS = ["#0033E9", "#366ECE", "#BD10E0"];
const INPUT_GRADIENT_COLORS = ["#FFFFFF80", "#FFFFFFFA"]

const eyeClosed = require('../../assets/images/login/login-close-eye.png');
const eyeOpen = require('../../assets/images/login/login-open-eye.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserNumber: "",
      UserPassword: "",
      loading: false,
      biometryType: null,
      showPass: false
    };
  }

  componentDidMount() {
    const optionalConfigObject = {
      unifiedErrors: false,
      passcodeFallback: true
    };
    // TouchID.isSupported(optionalConfigObject)
    // .then(biometryType => {
    //   this.setState({biometryType})
    // })
    // .catch(error => {
    // });
    // this.props.messagesRequest(()=>{})
  }

  goNext = page => {
    this.props.navigation.navigate(page);
  };

  Login = () => {
    const {UserNumber, UserPassword} = this.state;
    if (_.isEmpty(UserNumber)) {
      Util.DialogAlert("Please enter your number");
    } else if( UserNumber && UserNumber.length < 9 ) {
      Util.DialogAlert("Invalid number");
    } else if( _.isEmpty(UserPassword)){
      Util.DialogAlert("Please enter your password");
    } else {
      Util.showLoader(this)
      const payload = {
        phone: UserNumber,
        password: UserPassword,
      };
      this.props.userLoginRequest(payload, data => {
        if (data) {
          setTimeout(() => {
            this.goNext("Home");
          }, 200);
        }
        // Util.hideLoader(this);
      });
    }
  };
  
  showBiometricMethod() {
    const {biometryType} = this.state;
    let renderText = '';
    if (biometryType === 'FaceID') {
      renderText = "Use Face id to login";
    } else if (biometryType === 'TouchID'){
      renderText = "Use Touch id to login";
    } else if (biometryType === true) {
      renderText = "Use Finger print to login";
    }
    return(
      <View style={styles.biometricContainer}>
        <TouchableOpacity onPress={this._pressHandler} disabled={this.state.loading}>
          <Text style={{color: "#fff"}}>{renderText}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _pressHandler = () => {
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: '', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    // TouchID.authenticate('Use your finger to login to your account', optionalConfigObject)
    //   .then(success => {
    //     if( success ) {
    //       this.goNext("Home");
    //     }
    //     // Alert.alert('Authenticated Successfully');
    //   })
    //   .catch(error => {
    //     // Alert.alert('Authentication Failed');
    //   });
  }

  goHone = () =>{
    this.props.navigation.navigate("Home");
  }
  
  render(){
    return(
      <ImageBackground source={BACKGROUND_IMAGE_CAR}
      style={styles.container}>
        {/* <Spinner
          visible={this.state.loading}
          textContent={' '}
          overlayColor="transparent"
          customIndicator={<View><Text> </Text></View>}
          textStyle={styles.spinnerTextStyle}
        /> */}
        <KeyboardAwareScrollView style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={false}>
          <TouchableOpacity onPress={()=>this.goHone()} style={styles.headerTextContainer}>
              <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/appstarter/logo.png')}/>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.registerContainer}>
              <Text style={styles.noAccountText}>Don't have an account? <Text style={styles.registerText} onPress={()=>!this.state.loading && this.props.navigation.navigate('RegisterUser')}>Register</Text></Text>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                <Image source={require('../../assets/images/login/phone-call.png')} style={styles.iconImages}/>
                <TextInput 
                editable={!this.state.loading}
                placeholder="05x xxx xxxx"
                placeholderTextColor="#00000050"
                keyboardType="phone-pad"
                onChangeText={(number)=> this.setState({UserNumber: number})}
                returnKeyType="next"
                onEndEditing={()=> this.passwordRef.focus()}
                maxLength={13}
                style={styles.input}/>
              </LinearGradient>
              <View style={styles.inputSpace}></View>
              <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                <Image source={require('../../assets/images/login/lock.png')} style={styles.iconImages}/>
                <TextInput 
                editable={!this.state.loading}
                placeholder="Password"
                placeholderTextColor="#00000050"
                ref={(passRef)=> this.passwordRef = passRef}
                onChangeText={(password)=> this.setState({UserPassword: password})}
                secureTextEntry={this.state.showPass ? false : true}
                style={styles.input}/>
                <TouchableOpacity onPress={()=> this.setState({showPass: !this.state.showPass})}>
                  <Image source={this.state.showPass ? eyeOpen : eyeClosed} style={styles.iconImages}/>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            {/* {
              this.state.biometryType && this.showBiometricMethod()
            } */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                disabled={this.state.loading}
                onPress={this.Login}
                style={[styles.buttonView, styles.loginButton]}>
                <LinearGradient colors={BUTTON_GRADIENT_COLORS} 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                style={styles.gradientButton}>
                  {this.state.loading ? <ActivityIndicator size="small" color="#fff"/>:<Text style={styles.loginText}>Login</Text>}
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.buttonView}
              disabled={this.state.loading}
              onPress={()=> this.props.navigation.navigate('ForgetPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.bottomContainer}></View> */}
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  userData: user
});
const actions = { userLoginRequest, messagesRequest };

export default connect(
  mapStateToProps,
  actions
)(Login);

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTextContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: '7%',
    top: '5%',
    padding: 10,
    zIndex: 10
  },
  skipText: {
      color: '#fff',
      textDecorationLine: 'underline',
      fontSize: 15
  },
	registerContainer: {
    // flex: 0.5,
    marginVertical: 15,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	noAccountText: {
		color: '#fff',
		fontSize: 16
	},
	registerText: {
		color: '#0033E9',
		textDecorationLine: 'underline'
	},
    formContainer: {
		// flex: 1,
    backgroundColor: '#ffffff35',
		borderRadius: 30,
		// padding: '3%',
		paddingLeft: '3%',
		paddingRight: '3%',
	},
	inputContainer: {
		// flex: 2,
    // backgroundColor: 'red',
		justifyContent: 'center'
	},
	inputSpace: {
    // flex: 0.2
    height: 20
	},
	textInputBox: {
		borderRadius: 30,
		flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
	},
	input: {
		height: 50,
		paddingLeft: 10,
		paddingRight: 10,
    flex: 1,
    color: "#000"
	},
	buttonContainer: {
        // flex: 1,
		flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: Util.isPlatformAndroid() ? 10 : 20
      },
    buttonView: {
        flex: 1,
        // margin: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 30
	},
	gradientButton: {
		flex: 1,
		width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
	},
    forgotPasswordText: {
        color: '#fff',
		fontSize: 16,
		textDecorationLine: 'underline'
    },
    loginButton: {
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
        backgroundColor: '#fff',
    },
    loginText: {
        color: '#fff',
        fontSize: 16
    },
    bottomContainer: {
        // flex: 0.1
	},
	iconImages: {
		width: 20, height: 20, resizeMode: 'contain'
  },
  biometricContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
