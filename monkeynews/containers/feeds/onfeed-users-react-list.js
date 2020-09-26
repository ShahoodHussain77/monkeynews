import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl, ImageBackground } from "react-native";
import {connect } from "react-redux";
import {Images, Colors} from "../../theme";
import { EmptyStateText, ButtonView } from "../../components";
import styles from "../../assets/stylesheets/styles";

const DATA = [
    {
      key: 0,
      user_name: "Barbana Jones",
      is_following: false,
      like_date: "01 Dec, 2019",
      user_image: Images.temp1
    },
    {
        key: 1,
        user_name: "Kevin Reid",
        is_following: false,
        like_date: "01 Dec, 2019",
        user_image: Images.temp2
    },
    {
        key: 3,
        user_name: "Keanu Barnett",
        is_following: true,
        like_date: "01 Dec, 2019",
        user_image: Images.temp3
    },
    {
        key: 4,
        user_name: "Matthew Gilbert",
        is_following: false,
        like_date: "01 Dec, 2019",
        user_image: Images.temp4
    },
    {
        key: 5,
        user_name: "Marie Hughes",
        is_following: true,
        like_date: "01 Dec, 2019",
        user_image: Images.temp5
    },
];

export class FeedReactUsers extends Component {
    static routeName = "FeedReactUsers";

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    navigate(routeName) {
        this.props.navigation.navigate(routeName);
    }

    renderActivities = ({key, user_image, user_name, like_date, is_following}) => {
        return (
            <View style={[styles.userListItem, styles.flexDirectionRow]} key={key}>
                <View style={styles.headerImageContainer}>
                    <Image source={user_image} style={styles.likeUserImage}/>
                </View>
                <View style={[styles.bodyUserDetailsContainer, styles.justifyContentCenter]}>
                    <Text style={styles.userNameText}>{user_name}</Text>
                    <View style={[styles.flexDirectionRow, styles.alignItemsCenter]}>
                        <Image source={Images.heartIcon} style={styles.heartIcon}/>
                        <Text style={styles.descriptionText}>{like_date}</Text>
                    </View>
                </View>
                <ImageBackground source={is_following ? Images.unFollowBg : Images.followBg} style={styles.userFooterContainer}
                imageStyle={styles.footerImageStyle}>
                    <ButtonView style={{backgroundColor: 'transparent'}}
                        rippleColor={is_following ? Colors.black : null}
                        onPress={()=> null}>
                        <Text style={[styles.followText, is_following ? styles.unfollowTextColor:null]}>{is_following ? "Unfollow" : "Follow"}</Text>
                    </ButtonView>
                </ImageBackground>
            </View>
        )
    }

    _renderEmptyComponent =  (isLoading)=> {
        if (isLoading) {
            return null;
        }
        return (
            <EmptyStateText/> 
        );
    };

    render() {
        const { loading } = this.state;
        return (
            <View style={styles.backgroundContainer}>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => this.renderActivities(item)}
                    keyExtractor={item => item.key.toString()}
                    ListEmptyComponent={()=>this._renderEmptyComponent(loading)}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponentStyle={{ marginBottom: '20%' }}
                    ListFooterComponent={()=><View />}
                    refreshControl={<RefreshControl refreshing={this.state.loading}/>}
                />
            </View>
        )
    }
}


// const mapStateToProps = ({ services }) => ({
//     ...services
// });
export default connect()(FeedReactUsers);

