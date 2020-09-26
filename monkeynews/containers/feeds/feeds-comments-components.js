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
        user_image: Images.temp1,
        comment: "Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod na eliqua"
    },
    {
        key: 1,
        user_name: "Kevin Reid",
        is_following: false,
        like_date: "01 Dec, 2019",
        user_image: Images.temp2,
        comment: "Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod na eliqua"
    },
    {
        key: 3,
        user_name: "Keanu Barnett",
        is_following: true,
        like_date: "01 Dec, 2019",
        user_image: Images.temp3,
        comment: "Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod na eliqua"
    },
    {
        key: 4,
        user_name: "Matthew Gilbert",
        is_following: false,
        like_date: "01 Dec, 2019",
        user_image: Images.temp4,
        comment: "Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod na eliqua"
    },
    {
        key: 5,
        user_name: "Marie Hughes",
        is_following: true,
        like_date: "01 Dec, 2019",
        user_image: Images.temp5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod na eliqua"
    },
];
class FeedComments extends Component {
    static routeName = "FeedComments";

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
        const index = DATA.findIndex(person=> person.key == id);
        DATA[index].is_following = !DATA[index].is_following;
        this.setState({})
    }

    renderActivities = ({key, user_image, user_name, like_date, is_following, comment}) => {
        return (
            <View style={[styles.userListItem, styles.flexDirectionRow]} key={key}>
                <View style={[styles.headerImageContainer, styles.justifyContentCenter]}>
                    <Image source={user_image} style={styles.likeUserImage}/>
                </View>
                <View style={[styles.bodyUserDetailsContainer, styles.justifyContentCenter]}>
                    <Text style={styles.userNameText}>{user_name}</Text>
                    <View style={[styles.flexDirectionRow, styles.alignItemsCenter]}>
                        <Image source={Images.heartIcon} style={styles.heartIcon}/>
                        <Text style={styles.descriptionText}>{like_date}</Text>
                        <ImageBackground source={is_following ? Images.unFollowBg : Images.followBg} style={styles.userCommentsFooterContainer}
                        imageStyle={styles.footerImageStyle}>
                            <ButtonView style={{backgroundColor: 'transparent'}}
                            rippleColor={is_following ? Colors.black : null}
                            onPress={()=> this.updateFollowingStatus(key)}>
                                <Text style={[styles.followText, is_following ? styles.unfollowTextColor:null]}>{is_following ? "Unfollow" : "Follow"}</Text>
                            </ButtonView>
                        </ImageBackground>
                    </View>
                    <Text style={styles.commentsText}>{comment}</Text>
                </View>
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
export default connect()(FeedComments);

