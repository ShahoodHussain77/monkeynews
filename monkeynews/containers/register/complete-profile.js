import React, { PureComponent } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StatusBar, TextInput, Dimensions } from 'react-native';
import { connect } from "react-redux";
import {Images, Colors} from "../../theme";
import styles from "../../assets/stylesheets/styles";
import {ButtonView, PickerSelect} from "../../components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CountryPicker from 'react-native-country-picker-modal'
import { updateNavigation, completeProfileRequest, showLoaderRequest } from "../../actions/UserActions";
import Util from "../../util";
import _ from "lodash";
import { generateFormData } from "../../helpers/classesHelper";

const {width} = Dimensions.get('window');
class CompleteProfile extends PureComponent {
    static routeName = "CompleteProfile";

    state = {
        showDatePicker: false,
        showCountryPicker: false,
        countryCode: 'Pakistan',
        country: '',
        name: 'test user',
        gender: 'Male',
        dob: '2020-06-05',
        mStatus: 'Married',
        qualification: 'BS',
        profession: 'Software Engineer',
        countryState: 'Sindh',
        stateCity: 'Karachi',
        preference: 'like'
    }

    // onChange = (event, selectedDate) => {
    //     if (event.type == 'dismissed') {
    //         this.setState({ showDatePicker: false });
    //         return;
    //     }
    //     if( selectedDate == undefined || selectedDate == null ) return; 
    //     const currentDate = new Date(selectedDate);
    //     const finalDate = currentDate.getDate() + "/" + parseInt(currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
    //     this.setState({ dob: finalDate, showDatePicker: false })
    //     // setShow(Platform.OS === 'ios');
    //     // setDate(currentDate);
    // };

    onChange = (date) => {
        if( date == undefined || date == null ) return;
        const currentDate = new Date(date);
        const finalDate = currentDate.getDate() + "/" + parseInt(currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
        this.setState({ dob: finalDate, showDatePicker: false })
    };

    onSelect = (country) => {
        this.setState({ country: country.cca2, countryCode: country.cca2})
    }

    completeProfile() {
        console.log('props', this.props)
        const {name, gender, dob, mStatus, qualification, preference, profession, countryState, stateCity, countryCode} = this.state;
        if( _.isEmpty(name) ) {
            Util.DialogAlert('Enter your name', 'Error');
        } else if( _.isEmpty(gender) ) {
            Util.DialogAlert('Select gender', 'Error');
        } else if( _.isEmpty(dob) ) {
            Util.DialogAlert('Select Date of birth', 'Error');
        } else if( _.isEmpty(mStatus) ) {
            Util.DialogAlert('Select marital status', 'Error');
        } else if( _.isEmpty(qualification) ) {
            Util.DialogAlert('Select qualification', 'Error');
        } else if( _.isEmpty(profession) ) {
            Util.DialogAlert('Select profession', 'Error');
        } else if( _.isEmpty(countryCode) ) {
            Util.DialogAlert('Select country', 'Error');
        } else if( _.isEmpty(countryState) ) {
            Util.DialogAlert('Select state', 'Error');
        } else if( _.isEmpty(stateCity) ) {
            Util.DialogAlert('Select city', 'Error');
        } else if( _.isEmpty(preference) ) {
            Util.DialogAlert('Select preference', 'Error');
        } else {
            this.props.showLoaderRequest();
            const payload = {
                user_id: this.props.userData.tempUserId,
                user_name: name,
                user_dob: dob,
                user_gender: gender,
                user_marital_status: mStatus,
                user_qualification: qualification,
                user_profession: profession,
                user_country: countryCode,
                user_state: countryState,
                user_city: stateCity,
                user_preference: preference
            }
            this.props.completeProfileRequest(generateFormData(payload), this.props.userData.tempToken );
        }
    }

    render() {
        const {showDatePicker, dob, country} = this.state;
        return (
            <View style={styles.backgroundContainer}>
                <StatusBar barStyle="dark-content" />
                <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                    <View style={styles.formContainer}>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>Name</Text>
                            <TextInput
                                maxLength={50}
                                placeholderTextColor={Colors.background.tertiary}
                                placeholder="John Doe"
                                style={[styles.textInput, styles.cmpTextInput]}
                                keyboardType="default"
                                returnKeyType="done"
                                onChangeText={(name)=> this.setState({name})}
                            />
                        </View>
                        <PickerSelect
                            pickerHeaderText="Gender"
                            placeholderLabel="Select Gender"
                            onValueChange={(value) => this.setState({ gender: value })}
                            value={this.state.gender}
                            items={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                            ]}
                        />
                        <TouchableOpacity style={styles.formInputs}
                        onPress={()=> this.setState({showDatePicker: true})}>
                            <Text style={styles.headerLabel}>Date Of Birth</Text>
                            <DateTimePickerModal
                                isVisible={showDatePicker}
                                mode="date"
                                onConfirm={this.onChange}
                                onCancel={()=> this.setState({ showDatePicker: false })}
                                headerTextIOS="Select your birth date"
                                maximumDate={new Date()}
                            />
                            <View style={styles.dateInputContainer}>
                                <Text style={dob ? styles.selectedDateText : styles.placeholder}>{dob ? dob : "Select Date Of Birth"}</Text>
                                <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>
                            </View>
                        </TouchableOpacity>
                        <PickerSelect
                            pickerHeaderText="Marital Status"
                            placeholderLabel="Select Marital Status"
                            onValueChange={(value) => this.setState({ mStatus: value })}
                            value={this.state.mStatus}
                            items={[
                                { label: 'Single', value: 'single' },
                                { label: 'Married', value: 'married' },
                            ]}
                        />
                        <PickerSelect
                            pickerHeaderText="Qualification"
                            placeholderLabel="Select Qualification"
                            onValueChange={(value) => this.setState({ qualification: value })}
                            value={this.state.qualification}
                            items={[
                                { label: 'High School', value: 'high_school' },
                                { label: 'Bachelor', value: 'graduate' },
                                { label: 'Post Graduate', value: 'master' },
                                { label: 'PHD', value: 'phd' },
                            ]}
                        />
                        <PickerSelect
                            pickerHeaderText="Profession"
                            placeholderLabel="Select Profession"
                            onValueChange={(value) => this.setState({ profession: value })}
                            value={this.state.profession}
                            items={[
                                { label: 'Engineer', value: 'engineer' },
                                { label: 'Computer Scientist', value: 'cs' },
                                { label: 'Doctor', value: 'doctor' },
                                { label: 'Others', value: 'others' },
                            ]}
                        />
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>Country Of Residence</Text>
                            <View style={styles.dateInputContainer}>
                                <CountryPicker
                                    {...{
                                        countryCode: country,
                                        withFilter: true,
                                        withFlag: true,
                                        withCountryNameButton: true,
                                        withAlphaFilter: true,
                                        withCallingCode: true,
                                        withEmoji: true,
                                        withFlagButton: false,
                                        withCallingCodeButton: false,
                                        onSelect: this.onSelect,
                                        containerButtonStyle: { paddingTop: 5, paddingBottom: 3, width: width/1.16 },
                                        theme: {
                                            itemHeight: 50,
                                            fontSize: 17,
                                            onBackgroundTextColor: country ? Colors.black : Colors.background.tertiary,
                                        },
                                        modalProps: {
                                            animationType: 'fade',
                                            hardwareAccelerated: true,
                                            transparent: true
                                        }
                                    }}
                                />
                                <View style={{position: 'absolute', right: 0}}>
                                    <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>
                                </View>
                            </View>
                        </View>
                        <PickerSelect
                            pickerHeaderText="State"
                            placeholderLabel="Select State"
                            onValueChange={(value) => this.setState({ countryState: value })}
                            value={this.state.countryState}
                            items={[]}
                        />
                        <PickerSelect
                            pickerHeaderText="City"
                            placeholderLabel="Select City"
                            onValueChange={(value) => this.setState({ stateCity: value })}
                            value={this.state.stateCity}
                            items={[]}
                        />
                        <PickerSelect
                            pickerHeaderText="Preference"
                            placeholderLabel="Select Preference"
                            onValueChange={(value) => this.setState({ preference: value })}
                            value={this.state.preference}
                            items={[]}
                        />
                        <View style={[styles.cmProfileButton, styles.loginButtonView]}>
                            <ButtonView
                                style={styles.resetPasswordButton}
                                onPress={()=> this.completeProfile()}>
                                    <Text style={styles.loginText}>Finish</Text>
                            </ButtonView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    userData: user
});
const actions = {updateNavigation, completeProfileRequest, showLoaderRequest};

export default connect(
    mapStateToProps,
    actions
)(CompleteProfile);
export const routeName = "CompleteProfile";