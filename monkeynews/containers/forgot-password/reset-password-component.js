import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput, ActivityIndicator, Alert } from 'react-native';
import { BACKGROUND_IMAGE_CAR_NON_GRADIENT } from "../../constants";
import CountryPicker from 'react-native-country-picker-modal'
import Theme from "../../assets/stylesheets/theme";
import Fonts from "../../assets/stylesheets/fonts";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { updatePasswordRequest } from "../../actions/UserActions";
import _ from 'lodash'
import Util from "../../util";

const BUTTON_GRADIENT_COLORS = ["#0033E9", "#366ECE", "#BD10E0"];
const eyeClosed = require('../../assets/images/login/login-close-eye.png');
const eyeOpen = require('../../assets/images/login/login-open-eye.png');

class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            password: "",
            confirmPassword: "",
            showPass: false,
            showConfirmPass: false
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => (
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 10}}>
                    <Image source={require('../../assets/images/general/right-arrow.png')} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                </TouchableOpacity>
            ),
            headerTitle: null,
            headerStyle:{shadowColor: 'transparent', elevation: 0}
        };
    };

    updatePassword() {
        const {password, confirmPassword} = this.state;
        if( _.isEmpty(password) ) {
            Util.DialogAlert("Please enter new password");
            return;
        } else if( _.isEmpty(confirmPassword) ) {
            Util.DialogAlert("Please enter confirm password");
            return;
        } else if( password != confirmPassword ) {
            Util.DialogAlert("Password does not match");
            return;
        } else {
            Util.showLoader(this);
            const payload = {
                ...this.props.navigation.getParam("payload"),
                new_password: password,
                new_password_confirmation: confirmPassword
            }
            this.props.updatePasswordRequest(payload, data => {
                if (data) {
                  Alert.alert("Password Updated", data.message, [
                      {text: "OK", onPress: ()=> this.props.navigation.navigate('SignIn')}
                  ])
                }
            });
        }
    }

    render() {
		return (
			<ImageBackground source={BACKGROUND_IMAGE_CAR_NON_GRADIENT}
            style={styles.container}>
                <View style={styles.innerContainer}>
                    <View>
                        <Text style={styles.verificationText}>Reset Password</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={{height: 30}}></View>
                        <Text style={styles.verificationDetailsText}>What would you like your{'\n'}new password to be</Text>
                        <View style={{height: 20}}></View>
						<View style={styles.textInputBox}>
							<TextInput style={styles.input}
                            editable={!this.state.loading}
                            secureTextEntry={this.state.showPass ? false : true}
							placeholder="New Password"
                            onChangeText={(password)=> this.setState({password})}
                            returnKeyType="next"
                            onEndEditing={()=> this.secondInput.focus()}
							placeholderTextColor="#58595B"/>
                            <TouchableOpacity onPress={()=> this.setState({showPass: !this.state.showPass})}>
                                <Image source={this.state.showPass ? eyeOpen : eyeClosed} style={styles.iconImages}/>
                            </TouchableOpacity>
						</View>
                        <View style={{height: 20}}></View>
						<View style={styles.textInputBox}>
							<TextInput style={styles.input}
                            editable={!this.state.loading}
                            secureTextEntry={this.state.showConfirmPass ? false : true}
                            onChangeText={(confirmPassword)=> this.setState({confirmPassword})}
                            ref={(inputRef)=> this.secondInput = inputRef}
							placeholder="Confirm Password"
							placeholderTextColor="#58595B"/>
                            <TouchableOpacity onPress={()=> this.setState({showConfirmPass: !this.state.showConfirmPass})}>
                                <Image source={this.state.showConfirmPass ? eyeOpen : eyeClosed} style={styles.iconImages}/>
                            </TouchableOpacity>
						</View>
                    </View>
                    <TouchableOpacity 
                            disabled={this.state.loading}
                            onPress={()=> this.updatePassword()}
                            style={[styles.buttonView, styles.loginButton]}>
                            <LinearGradient colors={BUTTON_GRADIENT_COLORS} 
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.gradientButton}>
                            <Text style={styles.loginText}>Submit</Text>
                            {this.state.loading && <ActivityIndicator size="small" animating={this.state.loading} color="#FFF"/>}
                            </LinearGradient>
                        </TouchableOpacity>
                </View>
            </ImageBackground>
		);
	}
}

const actions = { updatePasswordRequest };

export default connect(
    null,
    actions
)(ResetPasswordComponent);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        margin: 15,
        // marginTop: 50
    },
    verificationText: {
        fontFamily: Fonts.type.SemiBold,
        color: Theme.fontBlack,
        fontSize: Fonts.size.xxLarge-2,
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center'
    },
    inputBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#D8D8D8',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    verificationDetailsText: {
        fontFamily: Fonts.type.Medium,
        color: Theme.fontBlack,
        fontSize: Fonts.size.normal-1,
        textAlign: 'center'
    },
	countryContainer: {
		flexDirection: 'row',
        alignItems: 'center',
	},
	textInputBox: {
        width: '100%',
		height: 50,
		backgroundColor: '#fff',
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center',
        paddingHorizontal: 25,
		borderColor: '#00000026',
		borderWidth: 1,
		shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
	},
	input: {
		// marginLeft: 10,
        flex: 1,
        color: '#000'
    },
    buttonView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginBottom: 20,
        borderRadius: 30
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
        fontSize: 16,
        marginRight: 10
    },
    gradientButton: {
		flex: 1,
		width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconImages: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})
