import React, { PureComponent } from 'react'
import { View, Text, Image } from "react-native";
import {connect } from "react-redux";
import {Images, Colors} from "../../theme";
import styles from "../../assets/stylesheets/styles";

class OtherUserProfile extends PureComponent {
    static routeName = "OtherUsersProfile";


    navigate(routeName) {
        this.props.navigation.navigate(routeName);
    }

    render() {
        return (
            <View style={[styles.backgroundContainer, styles.justifyAlignCenter]}>
                <View style={{flex: 0.4}}></View>
                <Image source={Images.userImage} style={styles.userProfileImage}/>
                <Text style={styles.headingUserNameText}>Will Smith</Text>
                <Text style={styles.detailsText}>Male, <Text>28</Text></Text>
                <Text style={styles.detailsText}>High School</Text>
                <Text style={styles.detailsText}>Research Assistant</Text>
                <Text style={styles.detailsText}>New York, NY, USA</Text>
                <View style={[styles.userTagsContainer, styles.flexDirectionRow]}>
                    <View style={styles.userTags}>
                        <Text style={styles.tagText}>Culture</Text>
                    </View>
                    <View style={styles.userTags}>
                        <Text style={styles.tagText}>Environment</Text>
                    </View>
                    <View style={styles.userTags}>
                        <Text style={styles.tagText}>Health</Text>
                    </View>
                    <View style={styles.userTags}>
                        <Text style={styles.tagText}>Politics</Text>
                    </View>
                    <View style={styles.userTags}>
                        <Text style={styles.tagText}>Technology</Text>
                    </View>
                </View>
                <View style={styles.container} />
            </View>
        )
    }
}


export default connect()(OtherUserProfile);