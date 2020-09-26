import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, BackHandler, SafeAreaView, ActivityIndicator, Platform, LayoutAnimation, Keyboard } from 'react-native';
import { BACKGROUND_IMAGE_CAR_NON_GRADIENT } from "../../constants";
import Theme from "../../assets/stylesheets/theme";
import Fonts from "../../assets/stylesheets/fonts";
import { connect } from "react-redux";
import _ from 'lodash'
import { verifyPasswordOtpRequest } from "../../actions/UserActions";
import Util from "../../util";
import OTPInputView from '@twotalltotems/react-native-otp-input'

class OTPForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        otp: "",
        otp1: "",
        otp2: "",
        otp3: "",
        code: ""
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
            headerStyle:{shadowColor: 'transparent', elevation: 0},
        };
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        return true;
    }

    getInput(otpInput, focusTo, otpNumber) {
        if( _.isEmpty(otpInput) ) {
            return;
        } else {
            if(otpNumber == 1) this.setState({otp: otpInput});
            else if( otpNumber == 2) this.setState({otp1: otpInput});
            else if( otpNumber == 3) this.setState({otp2: otpInput});
            else if( otpNumber == 4) {
                this.setState({otp3: otpInput}, ()=> {
                    Util.showLoader(this);
                    const {otp, otp1, otp2, otp3} = this.state;
                    const payload = {
                        phone: this.props.navigation.getParam('phone'),
                        otp: otp + otp1 + otp2 + otp3
                    }
                    this.props.verifyPasswordOtpRequest(payload, data => {
                        if (data) {
                            this.setState({loading: false})
                            this.props.navigation.push("ResetPassword", { payload: payload })
                        }
                    });
                });
            }
            focusTo && focusTo.focus();
        }
    }

    verifyOtp(code) {
        Keyboard.dismiss();
        Util.showLoader(this);
        const payload = {
            phone: this.props.navigation.getParam('phone'),
            otp: code
        }
        this.props.verifyPasswordOtpRequest(payload, data => {
            if (data) {
                this.props.navigation.push("ResetPassword", { payload: payload })
            }
        });
    }

    render() {
        return (
            <ImageBackground source={BACKGROUND_IMAGE_CAR_NON_GRADIENT}
            style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.innerContainer}>
                        <View>
                            <Text style={styles.verificationText}>OTP Verification</Text>
                        </View>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.bodyText}>A verification code has been{'\n'}sent to your mobile number</Text>
                            <View style={{height: 30}}></View>
                            <OTPInputView
                                style={{width: '71%', height: 50}}
                                pinCount={4}
                                keyboardType="number-pad"
                                selectionColor="#000"
                                code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                onCodeChanged = {code => { LayoutAnimation.easeInEaseOut(), this.setState({code})}}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled = {(code => {
                                    this.verifyOtp(code)
                                })}
                            />
                            {/* <View style={styles.inputContainer}>
                                <TouchableOpacity style={styles.inputBox}
                                activeOpacity={1}
                                disabled={this.state.loading}
                                onPress={()=>this.firstNumber.focus()}>
                                    <TextInput style={styles.input}
                                        maxLength={1}
                                        onChangeText={(text)=> this.getInput(text, this.secondNumber, 1)}
                                        ref={(firstNumber)=> this.firstNumber = firstNumber}
                                        keyboardType="number-pad"
                                    />
                                </TouchableOpacity>
                                <View style={{flex: 0.1}}></View>
                                <TouchableOpacity style={styles.inputBox}
                                activeOpacity={1}
                                disabled={this.state.loading}
                                onPress={()=>this.secondNumber.focus()}>
                                    <TextInput style={styles.input}
                                        maxLength={1}
                                        onChangeText={(text)=> this.getInput(text, this.thirdNumber, 2)}
                                        ref={(secondNumber)=> this.secondNumber = secondNumber}
                                        keyboardType="number-pad"
                                    />
                                </TouchableOpacity>
                                <View style={{flex: 0.1}}></View>
                                <TouchableOpacity style={styles.inputBox}
                                activeOpacity={1}
                                disabled={this.state.loading}
                                onPress={()=>this.thirdNumber.focus()}>
                                    <TextInput style={styles.input}
                                        maxLength={1}
                                        onChangeText={(text)=> this.getInput(text, this.forthNumber, 3)}
                                        ref={(thirdNumber)=> this.thirdNumber = thirdNumber}
                                        keyboardType="number-pad"
                                    />
                                </TouchableOpacity>
                                <View style={{flex: 0.1}}></View>
                                <TouchableOpacity style={styles.inputBox}
                                activeOpacity={1}
                                disabled={this.state.loading}
                                onPress={()=>this.forthNumber.focus()}>
                                    <TextInput style={styles.input}
                                        maxLength={1}
                                        onChangeText={(text)=> this.getInput(text, null, 4)}
                                        ref={(forthNumber)=> this.forthNumber = forthNumber}
                                        keyboardType="number-pad"
                                        returnKeyType="done"
                                    />
                                </TouchableOpacity>
                            </View> */}
                            <View style={{height: 20}}></View>
                            <Text style={styles.verificationDetailsText}>To complete your registration,{'\n'}please enter the 4-digit OTP code.</Text>
                            <ActivityIndicator size="large" animating={this.state.loading}/>
                            {/* <View style={styles.bottomContainer}>
                                <View style={styles.buttonView}>
                                    <Text style={styles.noCodeText}>Didn't receive the code?   </Text>
                                    <TouchableOpacity style={styles.resendButton}
                                    disabled={this.state.loading}>
                                        <Text style={{color: '#989898'}}>Resend</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                        </View>
                        <View style={styles.bottomSpacer}></View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff'
    },
    innerContainer: {
        flex: 1,
        margin: 15,
    },
    verificationText: {
        fontFamily: Fonts.type.SemiBold,
        color: Theme.fontBlack,
        fontSize: Fonts.size.xxLarge-2,
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },
    bodyText: {
        fontFamily: Fonts.type.Medium,
        color: Theme.fontBlack,
        fontSize: Fonts.size.normal-1,
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
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
        fontSize: Fonts.size.xxSmall-1,
        fontFamily: Fonts.type.Regular,
        textAlign: 'center',
        color: Theme.lightTextColor
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resendButton: {
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        height: 40,
        borderColor: '#989898',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSpacer: {
        height: 30
    },
    noCodeText: {
        color: '#FF0000',
        fontFamily: Fonts.type.Regular,
        fontSize: Fonts.size.xSmall
    },
    input: {
        width: Platform.OS === "android" ? 20 : null,
        fontSize: Fonts.size.normal,
        fontFamily: Fonts.type.Regular,
    },
    underlineStyleBase: {
        width: 50,
        height: 50,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#D8D8D8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
        fontSize: 16,
    },
    underlineStyleHighLighted: {
        borderColor: "rgba(0,0,0,0.3)",
        height: Platform.OS === "android" ? 50 : 60,
        width: Platform.OS === "android" ? 50 : 60
    },
})

const mapStateToProps = ({ user }) => ({
    user: user
});
const actions = { verifyPasswordOtpRequest };

export default connect(
    mapStateToProps,
    actions
)(OTPForgotPassword);