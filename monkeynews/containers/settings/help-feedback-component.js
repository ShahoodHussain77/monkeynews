import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import {Images, Colors} from "../../theme";
import { ButtonView } from "../../components";
import styles from "../../assets/stylesheets/styles";
import { loadingAction, feedBackRequest } from "../../actions/AppInfoActions";
import ImagePicker from 'react-native-image-crop-picker';
import _ from "lodash";
import util from '../../util';

const PICKER_TYPE = {
    GALLERY: 0,
    CAMERA: 1
}

class FeedBack extends PureComponent {
    static routeName = "FeedBackComponent";

    state = {
        subject: '',
        description: '',
        images: []
    }

    uploadFeedBack(type) {
        switch (type) {
            case PICKER_TYPE.GALLERY:
                ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    multiple: true
                }).then(images => {
                    this.setState({ images })
                });
                break;
            case PICKER_TYPE.CAMERA:
                ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                }).then(image => {
                    let temp = this.state.images;
                    temp.push(image);
                    this.setState({ images: temp })
                });
                break;
            default:
                break;
        }
    }

    imageSelectorAlert() {
        Alert.alert("Select Image", "Select option for attachement", [
            {text: "Pick from gallery", onPress:() => this.uploadFeedBack(PICKER_TYPE.GALLERY)},
            {text: "Open Camera", onPress: ()=> this.uploadFeedBack(PICKER_TYPE.CAMERA)},
            {text: "Cancel", onPress: ()=> null}
        ]);
    }

    submitFeedBack() {
        const {subject, description, images} = this.state;
        if( _.isEmpty(subject) ) {
            util.DialogAlert("Enter subject");
        } else if( _.isEmpty(description) ) {
            util.DialogAlert("Enter desciption");
        } else {
            let _data_body = new FormData()
            images.forEach((item, i) => {
                _data_body.append("hf_images[]", {
                    uri: item.path,
                    type: "image/jpeg",
                    name: item.filename || `filename${i}.jpg`,
                });
            });
            _data_body.append('user_id', this.props.user_id)
            _data_body.append('hf_subject', subject)
            _data_body.append('hf_description', description)
            this.props.feedBackRequest( _data_body );
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={[styles.justifyContentCenter, styles.flexGrow]} style={styles.backgroundContainer}>
                <View style={{flex: 0.5}}/>
                <View>
                    <View style={styles.inputContainer}>
                        <View style={styles.container}>
                            <Text style={styles.headerLabel}>Subject</Text>
                            <TextInput
                                placeholderTextColor={Colors.background.tertiary}
                                placeholder="It's related to..."
                                style={[styles.textInput, styles.cmpTextInput]}
                                keyboardType="default"
                                returnKeyType="next"
                                onSubmitEditing={()=> this.newPassRef.focus()}
                                onChangeText={(subject)=> this.setState({subject})}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.container}>
                            <Text style={styles.headerLabel}>What's your thinking</Text>
                            <TextInput
                                placeholderTextColor={Colors.background.tertiary}
                                placeholder="Give us some details"
                                style={[styles.textInput, styles.cmpTextInput]}
                                keyboardType="default"
                                returnKeyType="done"
                                ref={(ref)=> this.newPassRef = ref}
                                onChangeText={(description)=> this.setState({description})}
                            />
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
                    style={{marginHorizontal: 10}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                        {
                            this.state.images.length > 0 && this.state.images.map((image, index) => {
                                return(
                                    <View style={{marginHorizontal: 10}} key={index}>
                                        <Image source={{uri: image.path}} style={{width: 80, height: 80, resizeMode: 'cover'}}/>
                                        <TouchableOpacity style={{position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', backgroundColor: '#00000070'}}>
                                            <Text style={{color: '#fff', paddingVertical: 5}}>REMOVE</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <View style={styles.container}>
                            <Text style={styles.headerLabel}>Add Attachment</Text>
                        </View>
                        <ButtonView style={[styles.noStyleAppButton, styles.eyeIconButton]}
                        onPress={()=> this.imageSelectorAlert()}>
                            <Image
                                style={styles.passwordEyeIcon}
                                source={Images.addIcon}
                            />
                        </ButtonView>
                    </View>
                </View>
                <View style={[styles.cmProfileButton, styles.loginButtonView]}>
                    <ButtonView
                        shouldAnimate
                        disabled={this.props.appInfo.loading}
                        style={styles.resetPasswordButton}
                        onPress={()=> this.submitFeedBack()}>
                            <Text style={styles.loginText}>Submit</Text>
                    </ButtonView>
                </View>
                <View style={{flex: 1}}/>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({appInfo, user}) => ({
    user_id: user.userData.user_id,
    appInfo
});
const actions = { loadingAction, feedBackRequest };

export default connect(mapStateToProps, actions)(FeedBack);
