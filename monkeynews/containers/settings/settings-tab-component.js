import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {connect } from "react-redux";
import {Images} from "../../theme";
import { ButtonView } from "../../components";
import styles from "../../assets/stylesheets/styles";
import ChangePassword from "./change-password-component";
import TermsCondition from "./terms-condition-component";
import PrivacyPolicy from "./privacy-policy-component";
import Feedback from "./help-feedback-component";

class SettingsTab extends PureComponent {
    static routeName = "SettingsTabComponent";

    navigate(routeName) {
        this.props.navigation.navigate(routeName);
    }

    render() {
        const {userData} = this.props
        return (
            <ScrollView contentContainerStyle={styles.justifyAlignCenter} style={styles.backgroundContainer}>
                <View style={{height: 30}}></View>
                <Image source={Images.userImage} style={styles.myUserProfileImage}/>
                <Text style={styles.headingUserNameText}>{userData && userData.user_name}</Text>
                <Text style={styles.detailsText}>{userData && userData.user_email}</Text>
                <View style={{height: 20}}/>
                <View style={styles.flexDirectionRow}>
                    <View style={styles.rowStackContainer}>
                        <ButtonView style={[styles.itemContainer, styles.justifyAlignCenter]}
                        onPress={()=> this.navigate(ChangePassword.routeName)}>
                            <Image source={Images.changePassIcon} style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Change{'\n'}Password</Text>
                        </ButtonView>
                        <ButtonView style={[styles.itemContainer, styles.justifyAlignCenter]}
                        onPress={()=> this.navigate(PrivacyPolicy.routeName)}>
                            <Image source={Images.privacyPolicyIcon} style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Privacy{'\n'}Policy</Text>
                        </ButtonView>
                    </View>
                    <View style={styles.rowStackContainer}>
                        <ButtonView style={[styles.itemContainer, styles.justifyAlignCenter]}
                        onPress={()=> this.navigate(TermsCondition.routeName)}>
                            <Image source={Images.termIcon} style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Terms {'&'}{'\n'}Conditions</Text>
                        </ButtonView>
                        <ButtonView style={[styles.itemContainer, styles.justifyAlignCenter]}
                        onPress={()=> this.navigate(Feedback.routeName)}>
                            <Image source={Images.helpIcon} style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Help {'&'}{'\n'}Feedback</Text>
                        </ButtonView>
                    </View>
                </View>
                <View style={{height: 100}}></View>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    ...user,
})

export default connect(mapStateToProps)(SettingsTab);