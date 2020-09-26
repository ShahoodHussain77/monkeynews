import React, { Component } from 'react'
import { Text, View, StatusBar, TextInput, Image, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import { updateNavigation, userLoginRequest, showLoaderRequest } from "../../actions/UserActions";
import {ButtonView, BackgroundImage} from "../../components";
import styles from "../../assets/stylesheets/styles";
import {Images, Colors} from "../../theme";
import {routeName as ForgotPasswordRouteName} from "../forgot-password/forgot-password-component";
import {routeName as SignUpRouteName} from "../register/sign-up";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Util from "../../util";
import _ from "lodash";
import { generateFormData } from "../../helpers/classesHelper";

class Login extends Component {
    static routeName = "Login";

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            loading: false,
        }
    }

    navigate(routeName) {
        this.props.navigation.navigate(routeName)
    }

    login() {
        const {email, password} = this.state;
        if( _.isEmpty(email) ) {
            Util.DialogAlert('Enter email address', 'Error');
        } else if( !Util.isEmailValid(email) ) {
            Util.DialogAlert('Invalid email', 'Error');
        } else if( _.isEmpty(password) ) {
            Util.DialogAlert('Enter password', 'Error');
        } else if( !Util.isValidPasswordFormat(password) ) {
            Util.DialogAlert('invalid password', 'Error');
        } else {
            this.props.showLoaderRequest();
            const payload = {
                user_email: email,
                user_password: password
            }
            this.props.userLoginRequest(generateFormData(payload));
        }
    }

    render() {
        const {showPassword} = this.state;
        const {userData} = this.props;
        return (
            <BackgroundImage
            image={Images.loginBgImage}>
                <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent"/>
                <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={false}>
                    <View style={styles.loginContainer}>
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Image
                                    style={styles.prefixIcon}
                                    source={Images.prefixEmailImage}
                                />
                                <View style={styles.inputView}>
                                    <Text style={styles.inputHeaderLabel}>Email ID</Text>
                                    <TextInput
                                        maxLength={80}
                                        placeholderTextColor={Colors.white}
                                        editable={!userData.loading}
                                        placeholder="example@email.com"
                                        style={styles.textInput}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        onSubmitEditing={()=> this.passRef.focus()}
                                        onChangeText={(email)=> this.setState({ email })}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <Image
                                    style={styles.prefixIcon}
                                    source={Images.prefixLockImage}
                                />
                                <View style={styles.inputView}>
                                    <Text style={styles.inputHeaderLabel}>Password</Text>
                                    <TextInput
                                        placeholder="password"
                                        maxLength={20}
                                        editable={!userData.loading}
                                        placeholderTextColor={Colors.white}
                                        secureTextEntry={showPassword ? false : true}
                                        style={styles.textInput}
                                        keyboardType="default"
                                        ref={(passwordRef)=> this.passRef = passwordRef}
                                        onChangeText={(password)=> this.setState({ password })}
                                    />
                                </View>
                                <ButtonView style={[styles.noStyleAppButton, styles.eyeIconButton]}
                                onPress={()=> this.setState({showPassword: !this.state.showPassword})}>
                                    <Image
                                        style={styles.passwordEyeIcon}
                                        source={showPassword ? Images.openEye : Images.closeEye}
                                    />
                                </ButtonView>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={[styles.container, styles.loginButtonView]}>
                                <ButtonView
                                shouldAnimate
                                disabled={userData.loading}
                                onPress={()=>this.login()}>
                                    <Text style={styles.loginText}>Login</Text>
                                </ButtonView>
                            </View>
                            <TouchableOpacity style={styles.mediaIconsView}
                            activeOpacity={0.5}>
                                <Image
                                    style={styles.mediaIcon}
                                    source={Images.appleIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mediaIconsView}
                            activeOpacity={0.5}>
                                <Image
                                    style={styles.mediaIcon}
                                    source={Images.facebookIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mediaIconsView}
                            activeOpacity={0.5}>
                                <Image
                                    style={styles.mediaIcon}
                                    source={Images.googleIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.forgotPasswordNavView}>
                            <Text style={styles.forgotPasswordText}
                            onPress={()=> userData.loading ? null : this.navigate(ForgotPasswordRouteName)}>
                                Forgot Password?
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.signUpBottom}
                    disabled={userData.loading}
                    onPress={()=> this.navigate(SignUpRouteName)}
                    activeOpacity={0.5}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                        <Image
                            source={Images.arrowForward}
                            style={styles.signUpImage}
                        />
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </BackgroundImage>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    userData: user
});

const actions = {updateNavigation, userLoginRequest, showLoaderRequest};

export default connect(mapStateToProps, actions)(Login);
export const routeName = "Login";