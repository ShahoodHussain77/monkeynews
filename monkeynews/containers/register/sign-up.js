import React, { Component } from 'react'
import { Text, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from "react-redux";
import {ButtonView, BackgroundImage} from "../../components";
import styles from "../../assets/stylesheets/styles";
import {Images, Colors} from "../../theme";
import {routeName as LoginRouteName} from "../login/login";
import Util from "../../util";
import _ from "lodash";
import { registerUserRequest } from "../../actions/UserActions";
import { generateFormData } from "../../helpers/classesHelper";

class SignUp extends Component {
    static routeName = "SignUp";
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            showConfirmPassword: false,
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    navigate(routeName) {
        this.props.navigation.navigate(routeName)
    }

    signUp() {
        const {email, password, confirmPassword} = this.state;
        if( _.isEmpty(email) ) {
            Util.DialogAlert('Enter email address', 'Error');
        } else if( !Util.isEmailValid(email) ) {
            Util.DialogAlert('Invalid email', 'Error');
        } else if( _.isEmpty(password) ) {
            Util.DialogAlert('Enter password', 'Error');
        } else if( !Util.isValidPasswordFormat(password) ) {
            Util.DialogAlert('Invalid password\nPassword must be 6 characters\nMust contain upper and lower case characters\nMust have special and number characters', 'Error');
        } else if( _.isEmpty(confirmPassword) ) {
            Util.DialogAlert('Enter confirmation password', 'Error');
        } else if( confirmPassword !== password ) {
            Util.DialogAlert('Password Mismatch', 'Error');
        } else {
            const payload = {
                user_email: email,
                user_password: password
            }
            this.props.registerUserRequest(generateFormData(payload));
        }
    }

    render() {
        const {showPassword, showConfirmPassword} = this.state;
        const {userData} = this.props;
        return (
            <BackgroundImage
            image={Images.signupBgImage}>
                <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
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
                                        editable={!userData.loading}
                                        placeholderTextColor={Colors.white}
                                        placeholder="example@mail.com"
                                        style={styles.textInput}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        onSubmitEditing={()=> this.passRef.focus()}
                                        onChangeText={(email) => this.setState({ email })}
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
                        <View style={styles.resetPasswordContainer}>
                            <View style={[styles.container, styles.loginButtonView]}>
                                <ButtonView
                                shouldAnimate
                                disabled={userData.loading}
                                style={styles.resetPasswordButton}
                                onPress={()=> this.signUp()}>
                                    <Text style={styles.loginText}>Sign Up</Text>
                                </ButtonView>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.signUpBottom}
                    disabled={userData.loading}
                    onPress={()=> this.navigate(LoginRouteName)}
                    activeOpacity={0.5}>
                        <Text style={styles.signUpText}>Login</Text>
                        <Image
                            source={Images.arrowForward}
                            style={styles.signUpImage}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </BackgroundImage>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    userData: user
});

const actions = {registerUserRequest};

export default connect(mapStateToProps, actions)(SignUp);
export const routeName = "SignUp";