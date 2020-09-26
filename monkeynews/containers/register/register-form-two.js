import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground, 
  TextInput,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal'
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { BACKGROUND_IMAGE_CAR } from "../../constants";
const BUTTON_GRADIENT_COLORS = ["#0033E9", "#366ECE", "#BD10E0"];
const INPUT_GRADIENT_COLORS = ["#FFFFFF6E", "#FFFFFF29"]
import Theme from "../../assets/stylesheets/theme";
import Fonts from "../../assets/stylesheets/fonts";

class RegisterFormTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    showCarForm() {
        const pickerStyle = {
            inputIOS: {
                width: Dimensions.get("window").width/1.2,
                color: 'white',
                paddingTop: 13,
                height: 50,
                paddingBottom: 12,
            },
            inputAndroid: {
                color: 'white',
                width: Dimensions.get("window").width/1.2,
            },
        };
        return(
            <View>
                <View style={styles.inputSpace}></View>
                <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                    <RNPickerSelect
                        style={pickerStyle}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{label: "Select Make", color: '#000'}}
                        placeholderTextColor="#fff"
                        onValueChange={(value) => this.setState({})}
                        items={[
                            { label: 'Make One', value: 'Toyota' },
                            { label: 'Make Two', value: 'Honda' },
                            { label: 'Make Three', value: 'Ford' },
                        ]}
                        Icon={() => {
                            return (
                                <Image
                                source={require('../../assets/images/register/down-arrow.png')}
                                style={styles.downArrowIcon}/>
                            );
                        }}
                    />
                </LinearGradient>
                <View style={styles.inputSpace}></View>
                <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                    <TextInput 
                    placeholder="Model"
                    placeholderTextColor="#fff"
                    style={styles.input}/>
                </LinearGradient>
                <View style={styles.inputSpace}></View>
                <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                    <TextInput 
                    placeholder="Engine/cc"
                    placeholderTextColor="#fff"
                    keyboardType="number-pad"
                    style={styles.input}/>
                </LinearGradient>
                <View style={styles.inputSpace}></View>
                <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                    <TextInput 
                    placeholder="No. Plate"
                    placeholderTextColor="#fff"
                    style={styles.input}/>
                </LinearGradient>
            </View>
        )
    }

    render() {
        const pickerStyle = {
            inputIOS: {
                width: Dimensions.get("window").width/1.2,
                color: 'white',
                paddingTop: 13,
                height: 50,
                paddingBottom: 12,
            },
            inputAndroid: {
                color: 'white',
                width: Dimensions.get("window").width/1.2,
            },
        };
        return (
            <ImageBackground source={BACKGROUND_IMAGE_CAR}
            style={styles.container}>
            <SafeAreaView style={styles.logoContainer}>
                <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.formContainer}>
                        <View style={styles.inputSpace}></View>
                        <View style={styles.headerText}>
                            <Text style={styles.addCarText}>Add Your Car</Text>
                        </View>
                        <View style={styles.inputSpace}></View>
                        <View style={styles.inputContainer}>
                            <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                                <TextInput 
                                placeholder="Car Title"
                                placeholderTextColor="#fff"
                                style={styles.input}/>
                            </LinearGradient>
                            <View style={styles.inputSpace}></View>
                            <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                                <RNPickerSelect
                                    style={pickerStyle}
                                    useNativeAndroidPickerStyle={false}
                                    placeholder={{label: "Select Emirate", color: '#000'}}
                                    placeholderTextColor="#fff"
                                    onValueChange={(value) => this.setState({})}
                                    items={[
                                        { label: 'Emirate One', value: 'Dubai' },
                                        { label: 'Emirate Two', value: 'Sharjah' },
                                        { label: 'Emirate Three', value: 'Abu Dhabi' },
                                    ]}
                                    Icon={() => {
                                        return (
                                            <Image
                                            source={require('../../assets/images/register/down-arrow.png')}
                                            style={styles.downArrowIcon}/>
                                        );
                                    }}
                                />
                            </LinearGradient>
                            <View style={styles.inputSpace}></View>
                            <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                                <RNPickerSelect
                                    style={pickerStyle}
                                    placeholder={{label: "Select Area", color: '#000'}}
                                    placeholderTextColor="#fff"
                                    onValueChange={(value) => this.setState({})}
                                    items={[
                                        { label: 'Area One', value: 'Dubai' },
                                        { label: 'Area Two', value: 'Sharjah' },
                                        { label: 'Area Three', value: 'Abu Dhabi' },
                                    ]}
                                    Icon={() => {
                                        return (
                                            <Image
                                            source={require('../../assets/images/register/down-arrow.png')}
                                            style={styles.downArrowIcon}/>
                                        );
                                    }}
                                />
                            </LinearGradient>
                            <View style={styles.inputSpace}></View>
                            <LinearGradient style={styles.textInputBox} colors={INPUT_GRADIENT_COLORS}>
                                <RNPickerSelect
                                    style={pickerStyle}
                                    placeholder={{label: "Select Building", color: '#000'}}
                                    placeholderTextColor="#fff"
                                    onValueChange={(value) => this.setState({})}
                                    items={[
                                        { label: 'Building One', value: 'Dubai' },
                                        { label: 'Building Two', value: 'Sharjah' },
                                        { label: 'Building Three', value: 'Abu Dhabi' },
                                    ]}
                                    Icon={() => {
                                        return (
                                            <Image
                                            source={require('../../assets/images/register/down-arrow.png')}
                                            style={styles.downArrowIcon}/>
                                        );
                                    }}
                                />
                            </LinearGradient>
                            {/* <View style={styles.inputSpace}></View>
                            <CheckBox
                                checkBoxColor="#fff"
                                onClick={()=>{
                                    this.setState({
                                        isChecked:!this.state.isChecked
                                    })
                                }}
                                rightText="Scan Manually"
                                rightTextStyle={{color: '#fff'}}
                                isChecked={this.state.isChecked}
                            /> */}
                            {this.showCarForm()}
                            <View style={styles.inputSpace}></View>
                            <Text style={styles.addCarPhotosText}>Add car photos</Text>
                            <View style={styles.inputSpace}></View>
                            <View style={styles.photosContainer}>
                                <LinearGradient style={styles.photoBox} colors={["#FFFFFF6E","#FFFFFF29"]}>
                                    <View style={styles.photosInnerBox}>
                                        <Image source={require('../../assets/images/register/add-image.png')}/>
                                    </View>
                                </LinearGradient>
                                {/* <View style={styles.inputSpace}></View> */}
                                <LinearGradient style={styles.photoBox} colors={["#FFFFFF6E","#FFFFFF29"]}>
                                    <View style={styles.photosInnerBox}>
                                        <Image source={require('../../assets/images/register/add-image.png')}/>
                                    </View>
                                </LinearGradient>
                                {/* <View style={styles.inputSpace}></View> */}
                                <LinearGradient style={styles.photoBox} colors={["#FFFFFF6E","#FFFFFF29"]}>
                                    <View style={styles.photosInnerBox}>
                                        <Image source={require('../../assets/images/register/add-image.png')}/>
                                    </View>
                                </LinearGradient>
                            </View>
                            <View style={styles.inputSpace}></View>
                            <View style={styles.agrementContainer}>
                                <CheckBox
                                    style={{ padding: 10}}
                                    checkBoxColor="#fff"
                                    onClick={()=>{
                                    this.setState({
                                        isChecked:!this.state.isChecked
                                    })
                                    }}
                                    isChecked={this.state.isChecked}
                                />
                                <Text style={styles.agrementText}>I agree with the terms & conditions of Carman</Text>
                            </View>
                            <View style={styles.inputSpace}></View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                onPress={()=> this.props.navigation.navigate('OtpVerification')}
                                style={[styles.buttonView, styles.continueButton]}>
                                    <Text style={styles.continueText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputSpace}></View>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.accountText}>Already have an account?   </Text>
                        <TouchableOpacity 
                            onPress={()=> this.props.navigation.navigate('SignIn')}
                            style={[styles.buttonView, styles.loginButton]}>
                                <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputSpace}></View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
            </ImageBackground>
        );
    }
}

export default RegisterFormTwo;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
    },
    headerText: {
        flex: 1,
        justifyContent: 'center'
    },
    addCarText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '700'
    },
    addCarPhotosText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700'
    },
    logoImage: {
        width: 250,
        height: 150,
        resizeMode: 'contain'
    },
	registerContainer: {
		flex: 0.5,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	noAccountText: {
		color: '#fff',
		fontSize: 16
	},
	registerText: {
		color: '#0033E9',
		textDecorationLine: 'underline'
	},
    formContainer: {
		flex: 2,
		paddingLeft: '3%',
		paddingRight: '3%',
	},
	inputContainer: {
		flex: 2,
	},
	inputSpace: {
        // flex: 0.4
        height: 20,
	},
	textInputBox: {
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 20,
        paddingRight: 20,
        borderColor: '#FFFFFF4D',
        borderWidth: 1
    },
    countryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRightColor: '#fff',
        borderRightWidth: 0.3,
        paddingRight: 7,
        marginRight: 7
    },
	input: {
		height: 50,
        flex: 1,
	},
	buttonContainer: {
        flex: 0.5,
		flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonView: {
        flex: 1,
        // margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 30
    },
    continueButton: {
        backgroundColor: '#fff',
        elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    continueText: {
        color: Theme.fontBlack,
        fontSize: Fonts.size.normal,
        fontFamily: Fonts.type.Regular
    },
	gradientButton: {
		flex: 1,
		width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
	},
    forgotButton: {
		elevation: 3,
        // borderWidth: 1,
        // borderColor: '#fff',
    },
    forgotPasswordText: {
        color: '#fff',
		fontSize: 16,
		textDecorationLine: 'underline'
    },
    loginButton: {
        borderColor: '#fff',
        borderWidth: 1,
        flex: 0.5,
        height: 35
    },
    loginText: {
        color: '#fff',
        fontSize: 16
    },
    bottomContainer: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
	},
	iconImages: {
		width: 20, height: 20, resizeMode: 'center'
    },
    accountText: {
        color: '#fff'
    },
    photosContainer: {
        flexDirection: 'row'
    },
    photoBox: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderColor: '#FFFFFF4D',
        borderWidth: 1,
        padding: 3,
        marginHorizontal: 10
    },
    photosInnerBox: {
        flex: 1,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    agrementContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    agrementText: {
        color: '#fff',
        fontSize: 14,
        paddingLeft: 5,
        paddingRight: 5
    },
    downArrowIcon: {
        position: 'absolute', width: 15, height: 15, top: 20, right: 15, resizeMode: 'contain'
    }
})
