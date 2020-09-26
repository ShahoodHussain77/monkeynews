import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StatusBar, TextInput, Dimensions } from 'react-native';
import { connect } from "react-redux";
import {Images, Colors} from "../../theme";
import styles from "../../assets/stylesheets/styles";
import {ButtonView} from "../../components";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal'
import { updateNavigation } from "../../actions/UserActions";

const {width} = Dimensions.get('window');

export class EditProfile extends Component {
    static routeName = "EditProfile";

    state = {
        showDatePicker: false,
        date: null,
        showCountryPicker: false,
        countryCode: '',
        country: ''
    }

    componentDidMount() {
        console.log('this props, th', this.props)
    }
    

    onChange = (event, selectedDate) => {
        if( selectedDate == undefined || selectedDate == null ) return; 
        const currentDate = new Date(selectedDate);
        const finalDate = currentDate.getDate() + "/" + parseInt(currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
        this.setState({ date: finalDate, showDatePicker: false })
        // setShow(Platform.OS === 'ios');
        // setDate(currentDate);
    };

    onSelect = (country) => {
        this.setState({ country: country.cca2, countryCode: country.cca2})
    }

    render() {
        const pickerStyles = {
            placeholder: styles.placeholder,
            inputIOS: styles.inputIOS,
            inputAndroid: styles.inputAndroid,
            iconContainer: styles.iconContainer
        };
        const {showDatePicker, date, country} = this.state;
        return (
            <View style={styles.backgroundContainer}>
                <StatusBar barStyle="dark-content" />
                <ScrollView
                // style={{flex: 1, backgroundColor: ''}}
                contentContainerStyle={{flexGrow: 1, paddingBottom: '20%'}}
                keyboardShouldPersistTaps="handled">
                    <View style={styles.formContainer}>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>Name</Text>
                            <TextInput
                                maxLength={100}
                                placeholderTextColor={Colors.background.tertiary}
                                placeholder="John Doe"
                                style={[styles.textInput, styles.cmpTextInput]}
                                keyboardType="default"
                                returnKeyType="done"
                            />
                        </View>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>Gender</Text>
                            <RNPickerSelect
                                placeholder={{label: "Select Gender", value: "Select Gender", color: Colors.background.tertiary, key: null}}
                                style={pickerStyles}
                                Icon={()=> <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>}
                                onValueChange={(value) => console.log(value)}
                                useNativeAndroidPickerStyle={false}
                                items={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'Female' },
                                ]}
                            />
                        </View>
                        <TouchableOpacity style={styles.formInputs}
                        onPress={()=> this.setState({showDatePicker: true})}>
                            <Text style={styles.headerLabel}>Date Of Birth</Text>
                            {
                                showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        maximumDate={new Date()}
                                        value={new Date()}
                                        mode={'date'}
                                        display="default"
                                        onChange={this.onChange}
                                    />
                                )
                            }
                            <View style={styles.dateInputContainer}>
                                <Text style={date ? styles.selectedDateText : styles.placeholder}>{date ? date : "Select Date Of Birth"}</Text>
                                <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>Marital Status</Text>
                            <RNPickerSelect
                                placeholder={{label: "Select Marital Status", value: "Select Marital Status", color: Colors.background.tertiary, key: null}}
                                style={pickerStyles}
                                Icon={()=> <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>}
                                onValueChange={(value) => console.log(value)}
                                useNativeAndroidPickerStyle={false}
                                items={[
                                    { label: 'Single', value: 'single' },
                                    { label: 'Married', value: 'married' },
                                ]}
                            />
                        </View>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>Qualification</Text>
                            <RNPickerSelect
                                placeholder={{label: "Select Qualification", value: "Select Qualification", color: Colors.background.tertiary, key: null}}
                                style={pickerStyles}
                                Icon={()=> <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>}
                                onValueChange={(value) => console.log(value)}
                                useNativeAndroidPickerStyle={false}
                                items={[
                                    { label: 'High School', value: 'high_school' },
                                    { label: 'Bachelor', value: 'graduate' },
                                    { label: 'Post Graduate', value: 'master' },
                                    { label: 'PHD', value: 'phd' },
                                ]}
                            />
                        </View>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>Profession</Text>
                            <RNPickerSelect
                                placeholder={{label: "Select Profession", value: "Select Profession", color: Colors.background.tertiary, key: null}}
                                style={pickerStyles}
                                Icon={()=> <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>}
                                onValueChange={(value) => console.log(value)}
                                useNativeAndroidPickerStyle={false}
                                items={[
                                    { label: 'Engineer', value: 'engineer' },
                                    { label: 'Computer Scientist', value: 'cs' },
                                    { label: 'Doctor', value: 'doctor' },
                                    { label: 'Others', value: 'others' },
                                ]}
                            />
                        </View>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel} onPress={()=> this.setState({showCountryPicker: true})}>Country Of Residence</Text>
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
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>State</Text>
                            <RNPickerSelect
                                placeholder={{label: "Select State", value: "Select State", color: Colors.background.tertiary, key: null}}
                                style={pickerStyles}
                                Icon={()=> <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>}
                                onValueChange={(value) => console.log(value)}
                                useNativeAndroidPickerStyle={false}
                                items={[
                                    // { label: 'United Kingdom', value: 'UK' },
                                    // { label: 'U.S.A', value: 'usa' },
                                    // { label: 'Dubai', value: 'duabi' },
                                    // { label: 'Australia', value: 'autralia' },
                                ]}
                            />
                        </View>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>City</Text>
                            <RNPickerSelect
                                placeholder={{label: "Select City", value: "Select City", color: Colors.background.tertiary, key: null}}
                                style={pickerStyles}
                                Icon={()=> <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>}
                                onValueChange={(value) => console.log(value)}
                                useNativeAndroidPickerStyle={false}
                                items={[
                                    // { label: 'United Kingdom', value: 'UK' },
                                    // { label: 'U.S.A', value: 'usa' },
                                    // { label: 'Dubai', value: 'duabi' },
                                    // { label: 'Australia', value: 'autralia' },
                                ]}
                            />
                        </View>
                        <View style={styles.formInputs}>
                            <Text style={styles.headerLabel}>Preference</Text>
                            <RNPickerSelect
                                placeholder={{label: "Select Preference", value: "Select Preference", color: Colors.background.tertiary, key: null}}
                                style={pickerStyles}
                                Icon={()=> <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>}
                                onValueChange={(value) => console.log(value)}
                                useNativeAndroidPickerStyle={false}
                                items={[]}
                            />
                        </View>
                        <View style={[styles.cmProfileButton, styles.loginButtonView]}>
                            <ButtonView
                                style={styles.resetPasswordButton}
                                onPress={()=> this.props.updateNavigation()}>
                                    <Text style={styles.loginText}>Update</Text>
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
const actions = {updateNavigation};

export default connect(
    mapStateToProps,
    actions
)(EditProfile);