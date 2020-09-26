import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Easing, Dimensions, ActivityIndicator, Platform } from 'react-native';
import {Images} from "../theme";
import styles from "../assets/stylesheets/styles";
import RNPickerSelect from 'react-native-picker-select';
const {width, height} = Dimensions.get('window');


export const HeaderBack = (navigation) => {
    return(
        <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Image source={require('../assets/images/general/right-arrow.png')} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
        </TouchableOpacity>
    )
}

export const HeaderLeftHome = (props) => {
    return(
        <TouchableOpacity onPress={()=> props.onPress()} style={{margin: 10, padding: 8}}>
            <Image source={require('../assets/images/drawer/drawer_icon.png')} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
        </TouchableOpacity>
    )
}

export const HeaderLeft = (props) => {
    let backImage;
    if( props && props.blackHeaderIcon ) {
        backImage = Images.arrowBackBlack;
    } else if( props && props.blueHeaderIcon ) {
        backImage = Images.arrowBackBlue;
    } else {
        backImage = Images.arrowBackWhite;
    }
    return(
        <TouchableOpacity onPress={()=> props.onPress()} style={{paddingLeft: 3, paddingRight: 7, paddingVertical: 7}}>
            <Image source={backImage} style={{width: 15, height: 15, resizeMode: 'contain'}}/>
        </TouchableOpacity>
    )
}

export const AuthHeaderLeft = (props) => {
    return(
        <TouchableOpacity onPress={()=> props.onPress()} style={{marginLeft: 10}}>
            <Image source={require('../assets/images/login/right-arrow.png')} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
        </TouchableOpacity>
    )
}

export const HomePageHeader = (navigation) => {
    return(
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -10}}>
            {/* <Image source={require('../assets/images/general/carman_logo.png')} style={{width: 100, height: 100, resizeMode: 'contain'}}/> */}
        </View>
    )
}

export const HeaderTitle = ({title, fontColor}) => {
    return(
        <View>
            <Text style={{color: fontColor ? fontColor:'#fff', fontSize: 18, fontWeight: '600', fontFamily: 'Poppins-SemiBold'}}>{title}</Text>
        </View>
    )
}

export const HeaderRightFilter = (props) => {
    const pickerStyles = {
        placeholder: styles.placeholder,
        inputIOS: styles.inputIOS,
        inputAndroid: [styles.inputAndroid, styles.inputAndroidFilter],
        iconContainer: styles.feedsHeaderIconContainer
    };
    return(
        <RNPickerSelect
            placeholder={{}}
            style={pickerStyles}
            Icon={()=> <Image source={Images.feedDropDown} style={styles.pickerDropDownImage}/>}
            onValueChange={Platform.OS === "android" ? props.onFilterChangeDone : props.onValueChange}
            onDonePress={props.onFilterChangeDone}
            useNativeAndroidPickerStyle={false}
            items={[
                { label: 'General', value: 'general' },
                { label: 'Health', value: 'health' },
                { label: 'Science', value: 'science' },
                { label: 'Sports', value: 'sports' },
                { label: 'Following', value: 'following' },
            ]}
        />
    )
}

export const HeaderRight = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <Image source={Images.followIcon} style={styles.tabIcon}/>
        </TouchableOpacity>
    )
}

export const HeaderLogoutContainer = (props) => {
    return(
        <View style={styles.flexDirectionRow}>
            {props.loading ? <ActivityIndicator size="small" color="#000"/> : (
                <TouchableOpacity onPress={props.onLogoutPress}>
                    <Image source={Images.logoutIcon} style={styles.tabIcon}/>
                </TouchableOpacity>
            )}
            <View style={{width: 10}}/>
            <TouchableOpacity onPress={props.onEditProfilePress}>
                <Image source={Images.followIcon} style={styles.tabIcon}/>
            </TouchableOpacity>
        </View>
    )
}


export const TabBarComponent = ({state, navigation}) => {
    const index = state.index;
    const [value] = useState(new Animated.Value(0))
    const [animateToValue, startAnimation] = useState(0)

    useEffect(()=>{
        Animated.timing(value, {
            useNativeDriver: true,
            toValue: animateToValue,
            easing: Easing.in(Easing.ease),
            duration: 250,
        }).start()
    }, [animateToValue]) // < Run animation only when props.value changed1

    const tabPress = (route) => {
        switch (route) {
            case "FollowingTab":
                navigation.navigate("FollowingTab")
                if( animateToValue > 0 ) startAnimation(animateToValue - (width/2))
                else if ( animateToValue == 0 ) startAnimation(animateToValue - (width/4))
                break;
            case "FeedsTab":
                if( animateToValue > 0 ) startAnimation(animateToValue - (width/4))
                else if ( animateToValue < 0 ) startAnimation(animateToValue + (width/4))
                navigation.navigate("FeedsTab")
                break;
            case "SettingsTab":
                if( animateToValue < 0 ) startAnimation(animateToValue + (width/2))
                else if ( animateToValue == 0 ) startAnimation(animateToValue + (width/4))
                navigation.navigate("SettingsTab")
                break;
            default:
                break;
        }
    }

    return(
        <View style={[styles.tabBarContainer, styles.shadowLevel6]}>
            <Animated.View style={{
                borderRadius: 30,
                backgroundColor: 'rgba(0,0,0,0.8)',
                transform: [{ translateX: value }],
                position: 'absolute',
                left: '41%',
                height: 82,
                width: 55,
                top: -15,
                }
            }/>
            <TouchableOpacity 
            style={styles.tabItem}
            // onPress={()=> navigation.navigate("FollowingTab")}
            onPress={()=> tabPress("FollowingTab")}>
                {/* <View style={index == 0 ? styles.selectedTabItem : styles.tabItem}> */}
                <View style={styles.tabItem}>
                    <Image source={index == 0 ? Images.followIconSelected : Images.followIcon} style={styles.tabIcon}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.tabItem}
            // onPress={()=> navigation.navigate("FeedsTab")}
            onPress={()=> tabPress("FeedsTab")}
            >
                {/* <View style={index == 1 ? styles.selectedTabItem : styles.tabItem}> */}
                <View style={styles.tabItem}>
                    <Image source={index == 1 ? Images.feedIconSelected : Images.feedIcon} style={styles.tabIcon}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.tabItem}
            // onPress={()=> navigation.navigate("SettingsTab")}
            onPress={()=> tabPress("SettingsTab")}
            >
                {/* <View style={index == 2 ? styles.selectedTabItem : styles.tabItem}> */}
                <View style={styles.tabItem}>
                    <Image source={index == 2 ? Images.settingsSelected : Images.settings} style={styles.tabIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}