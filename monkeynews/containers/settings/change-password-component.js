import React, { PureComponent } from 'react'
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import { connect } from "react-redux";
import { Images, Colors } from "../../theme";
import { ButtonView } from "../../components";
import styles from "../../assets/stylesheets/styles";
import { generateFormData } from "../../helpers/classesHelper";
import { changePasswordRequest } from "../../actions/UserActions";
import Util from "../../util";

const PASSWORD_TYPE = {
    CURRENT_PASSWORD: 0,
    NEW_PASSWORD: 1,
    CONFIRM_PASSWORD: 2,
}

const ERROR_MSG = {
    PASSWORD_FORMAT: "Invalid password format. Example: Qwerty@123",
    CONFIRM_PASSWORD: "Password mismatch",
    EMPTY_FEILD: "This field can not be empty"
}

Object.freeze(PASSWORD_TYPE);

class ChangePassword extends PureComponent {
    static routeName = "ChangePasswordComponent";

    constructor(props) {
        super(props);
        this.state = {
            showExisitingPass: false,
            showNewPass: false,
            showConfirmPass: false,
            currentPass: null,
            newPass: null,
            confirmPass: null,
            formError: {
                cpError: true,
                npError: true,
                cnpError: true
            }
        }
        this.currentPassword = this.currentPassword.bind(this)
        this.newPassword = this.newPassword.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
    }

    currentPassword(pass) {
        this.updatePasswordState('currentPass', pass)
    }

    newPassword(pass) {
        this.updatePasswordState('newPass', pass)
    }

    updatePassword(pass) {
        this.updatePasswordState('confirmPass', pass)
    }

    updatePasswordState(key, pass) {
        this.setState({ [key]: pass.replace(/\s/g, '') })
    }

    validatePassword(type) {
        const passwordFormatRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
        const {currentPass, newPass, confirmPass, formError} = this.state;
        switch (type) {
            case PASSWORD_TYPE.CURRENT_PASSWORD:
                if( currentPass && currentPass.length > 0 ) {
                    if( !passwordFormatRegex.test(currentPass) ) {
                        formError.cpError = true
                    } else formError.cpError = false
                }
                break;
            case PASSWORD_TYPE.NEW_PASSWORD:
                if( newPass && newPass.length > 0) {
                    if( !passwordFormatRegex.test(newPass) ) {
                        formError.npError = true
                    } else formError.npError = false
                }
                break;
            case PASSWORD_TYPE.CONFIRM_PASSWORD:
                if( newPass !== confirmPass ) {
                    formError.cnpError = true
                } else formError.cnpError = false
                break;
        }
        this.forceUpdate();
    }

    changePassword() {
        const {currentPass, newPass, formError} = this.state;
        if( formError && formError.cpError ) {
            Util.DialogAlert(ERROR_MSG.PASSWORD_FORMAT)
        } else if( formError.npError ) {
            Util.DialogAlert(ERROR_MSG.PASSWORD_FORMAT)
        } else if( formError.cnpError ) {
            Util.DialogAlert(ERROR_MSG.CONFIRM_PASSWORD)
        } else {
            const payload = {
                user_id: this.props.userData.user_id,
                old_password: currentPass,
                new_password: newPass
            };
            this.props.changePasswordRequest( generateFormData(payload) );
        }
    }

    renderCheckMarkIcon() {
        return(
            <Image
                style={styles.passwordEyeIcon}
                source={Images.tickImage}
            />
        )
    }

    render() {
        const {showExisitingPass, showNewPass, showConfirmPass, currentPass, newPass, confirmPass, formError} = this.state;
        return (
            <ScrollView contentContainerStyle={[styles.justifyContentCenter, styles.flexGrow]} style={styles.backgroundContainer}
            keyboardShouldPersistTaps="handled">
                <View style={{flex: 0.5}}/>
                <View>
                    <View style={styles.inputContainer}>
                        <View style={styles.container}>
                            <Text style={styles.headerLabel}>Exisiting Password</Text>
                            <TextInput
                                maxLength={20}
                                placeholderTextColor={Colors.background.tertiary}
                                placeholder="Current Password"
                                secureTextEntry={showExisitingPass ? false : true}
                                style={[styles.textInput, styles.cmpTextInput]}
                                keyboardType="default"
                                returnKeyType="next"
                                onSubmitEditing={()=> this.newPassRef.focus()}
                                onBlur={()=> this.validatePassword(PASSWORD_TYPE.CURRENT_PASSWORD)}
                                onChangeText={this.currentPassword}
                                value={currentPass}
                                textContentType="password"
                            />
                        </View>
                        {
                            formError.cpError == false && (
                                <ButtonView style={[styles.noStyleAppButton, styles.eyeIconButton]}
                                onPress={()=> this.setState({showExisitingPass: !this.state.showExisitingPass})}>
                                    {this.renderCheckMarkIcon()}
                                </ButtonView>
                            )
                        }
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.container}>
                            <Text style={styles.headerLabel}>New Password</Text>
                            <TextInput
                                maxLength={20}
                                placeholderTextColor={Colors.background.tertiary}
                                placeholder="New Password"
                                secureTextEntry={showNewPass ? false : true}
                                style={[styles.textInput, styles.cmpTextInput]}
                                keyboardType="default"
                                returnKeyType="next"
                                ref={(ref)=> this.newPassRef = ref}
                                onSubmitEditing={()=> this.confirmPass.focus()}
                                onBlur={()=> this.validatePassword(PASSWORD_TYPE.NEW_PASSWORD)}
                                onChangeText={this.newPassword}
                                value={newPass}
                                textContentType="newPassword"
                            />
                        </View>
                        {
                            formError.npError == false && (
                                <ButtonView style={[styles.noStyleAppButton, styles.eyeIconButton]}
                                onPress={()=> this.setState({showNewPass: !this.state.showNewPass})}>
                                    {this.renderCheckMarkIcon()}
                                </ButtonView>
                            )
                        }
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.container}>
                            <Text style={styles.headerLabel}>Confirm Password</Text>
                            <TextInput
                                maxLength={20}
                                placeholderTextColor={Colors.background.tertiary}
                                placeholder="Confirm Password"
                                secureTextEntry={showConfirmPass ? false : true}
                                style={[styles.textInput, styles.cmpTextInput]}
                                keyboardType="default"
                                returnKeyType="done"
                                ref={(ref)=> this.confirmPass = ref}
                                onBlur={()=> this.validatePassword(PASSWORD_TYPE.CONFIRM_PASSWORD)}
                                onChangeText={this.updatePassword}
                                value={confirmPass}
                                textContentType="newPassword"
                            />
                        </View>
                        {
                            formError.cnpError == false && (
                                <ButtonView style={[styles.noStyleAppButton, styles.eyeIconButton]}
                                onPress={()=> this.setState({showConfirmPass: !this.state.showConfirmPass})}>
                                    {this.renderCheckMarkIcon()}
                                </ButtonView>
                            )
                        }
                    </View>
                </View>
                <View style={[styles.cmProfileButton, styles.loginButtonView]}>
                    <ButtonView
                        shouldAnimate
                        disabled={this.props.loading}
                        style={styles.resetPasswordButton}
                        onPress={()=> this.changePassword()}>
                            <Text style={styles.loginText}>Change</Text>
                    </ButtonView>
                </View>
                <View style={{flex: 1}}/>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    ...user
});

const actions = {changePasswordRequest};

export default connect(mapStateToProps, actions)(ChangePassword);