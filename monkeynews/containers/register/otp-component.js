import React, { Component } from 'react';
import { View, Text, Keyboard, LayoutAnimation, UIManager, Image, TextInput } from 'react-native';
import { verifyUserRequest, showLoaderRequest, resendVerificationCodeRequest, clearTempUserData } from "../../actions/UserActions";
import Util from "../../util";
import _ from "lodash";
import { connect } from "react-redux";
import {Images, Colors} from "../../theme";
import styles from "../../assets/stylesheets/styles";
import {ButtonView, BackgroundImage} from "../../components";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { generateFormData } from "../../helpers/classesHelper";
import ResendVerificationCode from "./resend-code-counter";

if (Util.isPlatformAndroid()) {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

class OTPComponent extends Component {
    static routeName = "OTPSignUp";
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            code: "",
            showPassword: false,
            showConfirmPassword: false,
            password: '',
            confirmPassword: ''
        };
    }

    verifyOtp() {
        if( _.isEmpty(this.state.code) ) {
            Util.DialogAlert('Enter OTP code');
        } else if( this.state.code.length != 6 ) {
            Util.DialogAlert('Invalid Code');
        } else {
            Keyboard.dismiss();
            this.props.showLoaderRequest();
            const payload = {
                user_id: this.props.userData.tempUserId,
                user_verification_code: this.state.code
            }
            const isResetPassword = this.props.userData && this.props.userData.isForgotPassword;
            this.props.verifyUserRequest(generateFormData(payload), isResetPassword);
        }
    }

    resetPassword() {
        const {password, confirmPassword} = this.state;
        if( _.isEmpty(password) ) {
            Util.DialogAlert('Enter password', 'Error', 'error');
        } else if( !Util.isValidPasswordFormat(password) ) {
            Util.DialogAlert('Invalid password\nPassword must be 6 characters\nMust contain upper and lower case characters\nMust have special and number characters', 'Error', 'info');
        } else if( _.isEmpty(confirmPassword) ) {
            Util.DialogAlert('Enter confirmation password', 'Error', 'error');
        } else if( confirmPassword !== password ) {
            Util.DialogAlert('Password Mismatch', 'Error', 'error');
        } else {
            Keyboard.dismiss();
            // this.props.showLoaderRequest();
            // const payload = {
            //     user_email: email,
            //     user_password: password
            // }
            // this.props.registerUserRequest(generateFormData(payload));
        }
    }

    componentWillUnmount() {
        this.props.clearTempUserData();
    }

    render() {
        const {userData} = this.props;
        const {showPassword, showConfirmPassword} = this.state;
        return (
            <BackgroundImage
            image={Images.otpUserBgImage}>
                <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent: 'center'}}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={false}>
                    <View style={styles.loginContainer}>
                        <View style={styles.otpContainer}>
                            {userData.resetingPassword ? (
                                <View style={{width: '95%', marginVertical: 20}}>
                                    <View style={styles.inputContainer}>
                                        <Image
                                            style={styles.prefixIcon}
                                            source={Images.prefixLockImage}
                                        />
                                        <View style={styles.inputView}>
                                            <Text style={styles.inputHeaderLabel}>Password</Text>
                                            <TextInput
                                                editable={!userData.loading}
                                                maxLength={20}
                                                placeholder="password"
                                                placeholderTextColor={Colors.white}
                                                secureTextEntry={showPassword ? false : true}
                                                style={styles.textInput}
                                                returnKeyType="next"
                                                ref={(passwordRef)=> this.passRef = passwordRef}
                                                onSubmitEditing={()=> this.confirmPassRef.focus()}
                                                onChangeText={(password) => this.setState({ password })}
                                            />
                                        </View>
                                        <ButtonView style={[styles.noStyleAppButton, styles.eyeIconButton]}
                                        onPress={()=> this.setState({showPassword: !showPassword})}>
                                            <Image
                                                style={styles.passwordEyeIcon}
                                                source={showPassword ? Images.openEye : Images.closeEye}
                                            />
                                        </ButtonView>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Image
                                            style={styles.prefixIcon}
                                            source={Images.prefixLockImage}
                                        />
                                        <View style={styles.inputView}>
                                            <Text style={styles.inputHeaderLabel}>Confirm Password</Text>
                                            <TextInput
                                                maxLength={20}
                                                editable={!userData.loading}
                                                placeholder="confirm password"
                                                placeholderTextColor={Colors.white}
                                                secureTextEntry={showConfirmPassword ? false : true}
                                                style={styles.textInput}
                                                returnKeyType="done"
                                                ref={(passwordRef)=> this.confirmPassRef = passwordRef}
                                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                            />
                                        </View>
                                        <ButtonView style={[styles.noStyleAppButton, styles.eyeIconButton]}
                                        onPress={()=> this.setState({showConfirmPassword: !showConfirmPassword})}>
                                            <Image
                                                style={styles.passwordEyeIcon}
                                                source={showConfirmPassword ? Images.openEye : Images.closeEye}
                                            />
                                        </ButtonView>
                                    </View>
                                </View>
                            ) : (
                                <OTPInputView
                                    style={{width: '95%', height: 60}}
                                    pinCount={6}
                                    keyboardType="number-pad"
                                    selectionColor="#fff"
                                    code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                    onCodeChanged = {code => { LayoutAnimation.easeInEaseOut(), this.setState({code})}}
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    editable={userData.resetingPassword}
                                    onCodeFilled = {(code => {
                                        // this.verifyOtp(code)
                                    })}
                                />
                            )}
                            <View style={[styles.resetPasswordContainer, styles.loginButtonView, styles.verifyButton]}>
                                <ButtonView
                                shouldAnimate={userData.shouldAnimate}
                                disabled={userData.loading}
                                style={styles.resetPasswordButton}
                                onPress={()=> userData.resetingPassword ? this.resetPassword() : this.verifyOtp()}>
                                    <Text style={styles.loginText}>{userData.resetingPassword ? 'Reset' : 'Verify'}</Text>
                                </ButtonView>
                            </View>
                        </View>
                        { userData.resetingPassword == false && (
                            <ResendVerificationCode 
                                resendVerificationCodeRequest={this.props.resendVerificationCodeRequest}
                                userData={userData}
                                generateFormData={generateFormData}
                                startOnMount={userData.isForgotPassword ? true : this.props.route && this.props.route.params && this.props.route.params.startOnMount}
                            />
                        )}
                    </View>
                </KeyboardAwareScrollView>
            </BackgroundImage>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    userData: user
});
const actions = { verifyUserRequest, showLoaderRequest, resendVerificationCodeRequest, clearTempUserData };

export default connect(
    mapStateToProps,
    actions
)(OTPComponent);
export const routeName = "OTPSignUp";
