import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground, 
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { registerUserRequest, clearError } from "../../actions/UserActions";
import { connect } from "react-redux";
import _ from "lodash";
import Util from "../../util";
import LinearGradient from 'react-native-linear-gradient';
// import CountryPicker from 'react-native-country-picker-modal'
import { BACKGROUND_IMAGE_CAR } from "../../constants";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Theme from "../../assets/stylesheets/theme";
import Fonts from "../../assets/stylesheets/fonts";

const INPUT_GRADIENT_COLORS = ["#FFFFFF6E", "#FFFFFF29"]
const eyeClosed = require('../../assets/images/login/close-eye.png');
const eyeOpen = require('../../assets/images/login/open-eye.png');

class RegisterFormOne extends Component {
	constructor(props) {
		super(props);
		this.state = {
			FirstName: "",
			LastName: "",
			Phone: "",
			Email: "",
			Password: "",
			ConfirmPassword: "",
			loading: false,
			flag: 'AE',
			callingCode: '971',
			showPass: false,
			showConfirmPass: false
		};
	}
  

  goNext = page => {
    this.props.navigation.navigate(page,{phone: this.state.Phone, pass: this.state.Password});
  };

  SignUp = () => {
    this.props.clearError();
    const {FirstName, LastName, Phone, Email, Password, callingCode, ConfirmPassword} = this.state;
    if( _.isEmpty(FirstName) ) {
      Util.DialogAlert("Please enter first name");
      return;
    } 
    // else if( !Util.isValidName(FirstName) ) {
    //   Util.DialogAlert("First Name is incorrect");
    //   return;
    // } 
    else if( _.isEmpty(LastName) ) {
      Util.DialogAlert("Please enter last name");
      return;
    } 
    // else if( !Util.isValidName(LastName) ) {
    //   Util.DialogAlert("Last Name is incorrect");
    //   return;
    // } 
    else if( _.isEmpty(Phone) ) {
      Util.DialogAlert("Please enter phone number");
      return;
    } else if ( !(Phone.length >= 9 && Phone.length <= 13) ) {
      Util.DialogAlert("Phone number is invalid");
      return;
    } else if (_.isEmpty(Email)) {
      Util.DialogAlert("Please enter your email");
      return;
    } else if (!Util.isEmailValid(Email)) {
      Util.DialogAlert("Email is invalid ");
      return;
    } else if( _.isEmpty(Password)){
      Util.DialogAlert("Please enter your password ");
      return;
    } else if (!Util.isPasswordValid(Password)) {
      Util.DialogAlert("Password should be 8 or more characters");
      return;
    } else if( ConfirmPassword != Password ) {
      Util.DialogAlert("Password does not match");
      return;
    }
    else {
      const payload = {
        first_name: FirstName,
        last_name: LastName,
        phone: Phone,
        country_code: callingCode,
        email: Email,
        password: Password,
        password_confirmation: ConfirmPassword
      };
      Util.showLoader(this);
      this.props.registerUserRequest(payload, data => {
        if (data) {
          this.setState({loading: false})
          this.goNext("OTPVerification");
        }
      });
    }
  };

  componentWillUnmount() {
    this.props.clearError();
  }

	updatePhone(phoneNumber) {
		if( this.state.Phone == "" && phoneNumber[0] == 0 ) {
            Util.DialogAlert("Starting number should not be zero(0)");
            return;
        }
		if( phoneNumber && phoneNumber[0] == 0 ) {
			Util.DialogAlert("Phone number invalid")
		} else {
			this.setState({Phone: phoneNumber})
		}
	}

    render(){
        let registerError = null;
        if( this.props.user.registerError ) {
            registerError = this.props.user.registerError
        }
        return(
          <ImageBackground source={BACKGROUND_IMAGE_CAR}
          style={styles.container}>
            <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="always">
                <SafeAreaView style={styles.logoContainer}>
                    <Image source={require('../../assets/images/appstarter/logo.png')} style={styles.logoImage}/>
                </SafeAreaView>
                <View style={styles.inputSpace}></View>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                            <TextInput 
                            placeholder="First Name"
                            placeholderTextColor="#fff"
                            style={styles.input}
                            maxLength={40}
                            onChangeText={(FirstName)=>this.setState({FirstName})}
                            />
                        </LinearGradient>
                        {registerError && registerError.first_name ? <Text style={styles.errorMessage}>{registerError.first_name[0]}</Text> : <View style={styles.inputSpace}></View> }
                        <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                            <TextInput 
                            placeholder="Last Name"
                            placeholderTextColor="#fff"
                            onChangeText={(LastName)=>this.setState({LastName})}
                            maxLength={40}
                            style={styles.input}/>
                        </LinearGradient>
                        {registerError && registerError.last_name ? <Text style={styles.errorMessage}>{registerError.last_name[0]}</Text> : <View style={styles.inputSpace}></View> }
                        {/* <View style={styles.inputSpace}></View> */}
                        <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                            {/* <View style={styles.countryContainer}>
                                <CountryPicker
                                    onSelect={(value)=> this.setState({ flag: value.cca2, callingCode: value.callingCode[0] }) }
                                    countryCode={this.state.flag}
                                    withFlag={true}
                                />
                                <Text style={{ color: '#fff'}}>{this.state.callingCode ? `+${this.state.callingCode}`:null}</Text>
                            </View> */}
                          {/* <View style={{marginEnd: 10}}>
                            <Image source={require('../../assets/images/login/phone-call.png')} style={styles.iconImages}/>
                          </View> */}
                            <TextInput 
                            keyboardType="phone-pad"
							placeholder="05x xxx xxxx"
                            placeholderTextColor="#fff"
                            onChangeText={(Phone)=> this.setState({Phone})}//this.updatePhone(Phone)}
                            maxLength={13}
							returnKeyType="done"
                            value={this.state.Phone}
                            style={styles.input}/>
                        </LinearGradient>
                        {registerError && registerError.phone ? <Text style={styles.errorMessage}>{registerError.phone[0]}</Text> : <View style={styles.inputSpace}></View> }
                        {/* <View style={styles.inputSpace}></View> */}
                        <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                            <TextInput 
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            keyboardType="email-address"
                            onChangeText={(Email)=>this.setState({Email})}
                            style={styles.input}/>
                        </LinearGradient>
                        {registerError && registerError.email ? <Text style={styles.errorMessage}>{registerError.email[0]}</Text> : <View style={styles.inputSpace}></View> }
                        {/* <View style={styles.inputSpace}></View> */}
                        <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                            <TextInput 
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="#fff"
                            secureTextEntry={this.state.showPass ? false : true}
                            onChangeText={(Password)=>this.setState({Password})}
                            style={styles.input}/>
                            <TouchableOpacity onPress={()=> this.setState({showPass: !this.state.showPass})}>
                              <Image source={this.state.showPass ? eyeOpen : eyeClosed} style={styles.iconImages}/>
                            </TouchableOpacity>
                        </LinearGradient>
                        {registerError && registerError.password ? <Text style={styles.errorMessage}>{registerError.password[0]}</Text> : <View style={styles.inputSpace}></View> }
                        {/* <View style={styles.inputSpace}></View> */}
                        <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                            <TextInput 
                            placeholder="Confirm Password"
                            secureTextEntry={this.state.showConfirmPass ? false : true}
                            placeholderTextColor="#fff"
                            onChangeText={(ConfirmPassword)=>this.setState({ConfirmPassword})}
                            style={styles.input}/>
                            <TouchableOpacity onPress={()=> this.setState({showConfirmPass: !this.state.showConfirmPass})}>
                              <Image source={this.state.showConfirmPass ? eyeOpen : eyeClosed} style={styles.iconImages}/>
                            </TouchableOpacity>
                        </LinearGradient>
                        <View style={styles.inputSpace}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                            disabled={this.state.loading}
                            onPress={this.SignUp}
                            style={[styles.buttonView, styles.continueButton]}>
                                <Text style={styles.continueText}>Continue</Text>
                                {this.state.loading && (<ActivityIndicator size="small" animating={this.state.loading}/>)}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.accountText}>Already have an account? </Text>
                    <TouchableOpacity 
                      disabled={this.state.loading}
                        onPress={()=> this.props.navigation.navigate('SignIn')}
                        style={[styles.buttonView, styles.loginButton]}>
                            <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}
const mapStateToProps = ({ user }) => ({
  user: user
});
const actions = { registerUserRequest, clearError };

export default connect(
  mapStateToProps,
  actions
)(RegisterFormOne);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 0.5,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 250,
        height: 150,
        resizeMode: 'contain'
    },
	registerContainer: {
		flex: 0.5,
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
		flex: 2,
		paddingLeft: '3%',
		paddingRight: '3%',
	},
	inputContainer: {
		flex: 2,
	},
	inputSpace: {
    // flex: 0.1,
    height: 20
	},
	textInputBox: {
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 20,
        paddingRight: 20,
        borderColor: '#FFFFFF4D',
        borderWidth: 1
    },
    countryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRightColor: '#fff',
        borderRightWidth: 0.3,
        paddingRight: 7,
        marginRight: 7
    },
	input: {
		height: 50,
    flex: 1,
    color: Theme.fontWhite
	},
	buttonContainer: {
        flex: 0.5,
		flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonView: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 30
    },
    continueButton: {
      flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    continueText: {
      marginRight: 10,
        color: Theme.fontBlack,
        fontSize: Fonts.size.normal,
        fontFamily: Fonts.type.Regular
    },
	gradientButton: {
		flex: 1,
		width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
	},
    forgotButton: {
		elevation: 3,
        // borderWidth: 1,
        // borderColor: '#fff',
    },
    forgotPasswordText: {
        color: '#fff',
		fontSize: 16,
		textDecorationLine: 'underline'
    },
    loginButton: {
        borderColor: '#fff',
        borderWidth: 1,
        flex: 0.5,
        height: 35
    },
    loginText: {
        color: '#fff',
        fontSize: 16
    },
    bottomContainer: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
	},
	iconImages: {
		width: 20, height: 20, resizeMode: 'contain'
    },
    accountText: {
        color: '#fff'
    },
    errorMessage: {
      color: '#fff',
      fontSize: 12,
      marginHorizontal: 20,
      marginVertical: 10
    }
})
