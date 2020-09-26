import React, { Component } from "react";
import { View, Text, Image, TextInput } from 'react-native';
import _ from "lodash";
import { forgotPasswordRequest, showLoaderRequest } from "../../actions/UserActions";
import { connect } from "react-redux";
import Util from "../../util";
import {Images, Colors} from "../../theme";
import styles from "../../assets/stylesheets/styles";
import {ButtonView, BackgroundImage} from "../../components";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { generateFormData } from "../../helpers/classesHelper";

class ForgetPassword extends Component {
    static routeName = "ForgotPassword";
	constructor(props) {
		super(props);
		this.state = {
            email: 'test5@yopmail.com'
		};
	}

    resetPassword() {
        const {email} = this.state;
        if( _.isEmpty(email) ) {
            Util.DialogAlert('Enter email address', 'Error');
        } else if( !Util.isEmailValid(email) ) {
            Util.DialogAlert('Invalid email', 'Error');
        } else {
            this.props.showLoaderRequest();
            const payload = { user_email: email };
            this.props.forgotPasswordRequest(generateFormData(payload));
        }
    }

	render() {
		return (
            <BackgroundImage
            image={Images.forgotPasswordBgImage}>
                <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent: 'center'}}
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
                                        maxLength={100}
                                        placeholderTextColor={Colors.white}
                                        placeholder="example@mail.com"
                                        style={styles.textInput}
                                        keyboardType="email-address"
                                        returnKeyType='done'
                                        editable={!this.props.userData.loading}
                                        onChangeText={(email) => this.setState({ email })}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.resetPasswordContainer}>
                            <View style={[styles.container, styles.loginButtonView]}>
                                <ButtonView
                                shouldAnimate
                                disabled={this.props.userData.loading}
                                style={styles.resetPasswordButton}
                                onPress={()=> this.resetPassword()}>
                                    <Text style={styles.loginText}>Reset</Text>
                                </ButtonView>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </BackgroundImage>
		);
	}
}

const mapStateToProps = ({user}) => ({
    userData: user
})

const actions = { forgotPasswordRequest, showLoaderRequest };

export default connect(
  mapStateToProps,
  actions
)(ForgetPassword);
export const routeName = "ForgotPassword";
