import React, {useMemo} from 'react'
import { Image, View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import {Images, Colors} from "../../theme";
import styles from "../../assets/stylesheets/styles";

const PickerComponent = (props) => {
    const pickerStyles = {
        placeholder: styles.placeholder,
        inputIOS: styles.inputIOS,
        inputAndroid: styles.inputAndroid,
        iconContainer: styles.iconContainer
    };
    const Picker = useMemo(()=> {
        return (
            <View style={styles.formInputs}>
                <Text style={styles.headerLabel}>{props.pickerHeaderText}</Text>
                <RNPickerSelect
                    {...props}
                    placeholder={{label: props.placeholderLabel, value: null, color: Colors.background.tertiary, key: null}}
                    style={pickerStyles}
                    Icon={()=> <Image source={Images.dropDownImage} style={styles.pickerDropDownImage}/>}
                    useNativeAndroidPickerStyle={false}
                />
            </View>
        )
    }, [props.value])
    return Picker
}

export default PickerComponent