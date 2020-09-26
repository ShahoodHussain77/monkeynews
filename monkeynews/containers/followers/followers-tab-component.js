import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl, ImageBackground } from "react-native";
import {connect } from "react-redux";
import {Images, Colors} from "../../theme";
import { EmptyStateText, ButtonView } from "../../components";
import styles from "../../assets/stylesheets/styles";
import UsersProfile from "../profile/view-users-profile";

var DATA = [
    {
      key: 0,
      user_name: "Barbana Jones",
      is_following: true,
      like_date: "01 Dec, 2019",
      user_image: Images.temp1
    },
    {
        key: 1,
        user_name: "Kevin Reid",
        is_following: true,
        like_date: "01 Dec, 2019",
        user_image: Images.temp2
    },
    {
        key: 2,
        user_name: "Keanu Barnett",
        is_following: true,
        like_date: "01 Dec, 2019",
        user_image: Images.temp3
    },
    {
        key: 3,
        user_name: "Matthew Gilbert",
        is_following: true,
        like_date: "01 Dec, 2019",
        user_image: Images.temp4
    },
    {
        key: 4,
        user_name: "Marie Hughes",
        is_following: true,
        like_date: "01 Dec, 2019",
        user_image: Images.temp5
    },
];

class FollowersListComponent extends PureComponent {
    static routeName = "FollowersTab";

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    navigate(routeName) {
        this.props.navigation.navigate(routeName);
    }

    updateFollowingStatus(id) {
        const filteredData = DATA.filter(person=> person.key != id);
        DATA = filteredData;
        this.setState({})
    }

    renderActivities = ({key, user_image, user_name, like_date, is_following}) => {
        return (
            <View style={[styles.userListItem]}>
                <ButtonView style={[styles.flexDirectionRow, styles.backgroundTransparent]} key={key}
                onPress={()=> this.navigate(UsersProfile.routeName)} rippleColor={Colors.appButtonColor}>
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
                        <ButtonView style={styles.backgroundTransparent}
                            rippleColor={is_following ? Colors.appButtonColor : null}
                            onPress={()=> this.updateFollowingStatus(key)}>
                            <Text style={[styles.followText, is_following ? styles.unfollowTextColor:null]}>{is_following ? "Unfollow" : "Follow"}</Text>
                        </ButtonView>
                    </ImageBackground>
                </ButtonView>
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
export default connect()(FollowersListComponent);

