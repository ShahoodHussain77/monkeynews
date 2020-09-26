import React, { PureComponent } from "react";
import { View, Text, Image as RNImage, TouchableOpacity, FlatList, RefreshControl, StatusBar, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { Images } from "../../theme";
import { EmptyStateText } from "../../components";
import styles from "../../assets/stylesheets/styles";
import FeedUsers from "./onfeed-users-react-list";
import FeedComments from "./feeds-comments-components";
import { getAllFeedsRequest } from "../../actions/FeedsActions";

const DATA = [
	{
		key: 0,
		author_name: "John Doe",
		source: "John Doe",
		category: "Health and Benefits",
		likes: "25k",
		comments: 50,
		dislike: 100,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		image: Images.feedImage
	},
	{
		key: 2,
		author_name: "John Doe",
		source: "John Doe",
		category: "Health and Benefits",
		likes: "25k",
		comments: 50,
		dislike: 100,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		image: Images.feedImage
	},
	{
		key: 3,
		author_name: "John Doe",
		source: "John Doe",
		category: "Health and Benefits",
		likes: "25k",
		comments: 50,
		dislike: 100,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		image: Images.feedImage
	},
];

class HomePageComponent extends PureComponent {
	static routeName = "FeedHome";

	componentDidMount() {
		this.fetchFeeds();
	}

	fetchFeeds() {
		const payload = {
			user_id: this.props.userData.user_id,
			category: 'general'
		}
		this.props.getAllFeedsRequest(payload)
	}

	navigate(routeName) {
		this.props.navigation.navigate(routeName);
	}

	renderActivities = ({ feed_id, title, author, source, description, category, likes, comments, dislike, urlToImage }) => {
		return (
			<View style={styles.feedItemContainer} key={feed_id}>
				<View style={styles.itemHeaderTextContainer}>
					<View style={styles.alignItemsCenter}>
						<Text style={styles.headerLabelText}>Author Name</Text>
						<Text style={styles.headerContentText}>{author && author.length > 20 ? author.split(',')[0] : author}</Text>
					</View>
					<View style={styles.alignItemsCenter}>
						<Text style={styles.headerLabelText}>Source Name</Text>
						<Text style={styles.headerContentText}>{author && author.length > 20 ? author.split(',')[0] : author}</Text>
					</View>
				</View>
				<ImageBackground style={styles.itemBodyContainer}
					source={{uri: urlToImage}}
					imageStyle={styles.bodyImage}>
					<View style={styles.bodyCategoryContainer}>
						<Text style={styles.bodyCategoryText}>{category}</Text>
					</View>
					<View style={styles.postReactionSection}>
						<TouchableOpacity style={[styles.flexDirectionRow, styles.justifyAlignCenter]}
							onPress={() => this.navigate(FeedUsers.routeName)}>
							<Text style={styles.reactionText}>{likes} Likes</Text>
							<View style={styles.dotSeprator}/>
						</TouchableOpacity>
						<View style={[styles.flexDirectionRow, styles.justifyAlignCenter]}>
							<Text style={styles.reactionText}>{dislike} Dislike</Text>
							<View style={styles.dotSeprator}/>
						</View>
						<TouchableOpacity style={[styles.flexDirectionRow, styles.justifyAlignCenter, {marginEnd: 5}]}
							onPress={() => this.navigate(FeedComments.routeName)}>
							<Text style={styles.reactionText}>{comments} Comments</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.bodyBottomSection}>
						<TouchableOpacity style={[styles.flexDirectionRow, styles.bodyBottomImagesContainer]}
							onPress={() => this.navigate(FeedUsers.routeName)}>
							<RNImage source={Images.likeIcon} style={styles.bodyBottomImages} />
							<Text style={styles.bodyImageCountText}>Like</Text>
						</TouchableOpacity>
						<View style={[styles.flexDirectionRow, styles.bodyBottomImagesContainer]}>
							<RNImage source={Images.disLikeIcon} style={styles.bodyBottomImages} />
							<Text style={styles.bodyImageCountText}>Dislike</Text>
						</View>
						<TouchableOpacity style={[styles.flexDirectionRow, styles.bodyBottomImagesContainer]}
							onPress={() => this.navigate(FeedComments.routeName)}>
							<RNImage source={Images.commentIcon} style={styles.bodyBottomImages} />
							<Text style={styles.bodyImageCountText}>Comments</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
				<View style={styles.footerContainer}>
					<Text style={styles.feedTitle}>{title}</Text>
					<Text style={styles.descriptionText} ellipsizeMode="tail" numberOfLines={5}>{description}</Text>
				</View>
			</View>
		)
	}

	_renderEmptyComponent = (isLoading) => {
		if (isLoading) {
			return null;
		}
		return (
			<EmptyStateText />
		);
	};

	render() {
		console.log('this.props', this.props);
		return (
			<View style={styles.backgroundContainer}>
				<StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
				<FlatList
					data={this.props.newsFeeds.allFeeds}
					renderItem={({ item }) => this.renderActivities(item)}
					keyExtractor={item => item.feed_id.toString()}
					ListEmptyComponent={this._renderEmptyComponent(this.props.newsFeeds.loading)}
					showsVerticalScrollIndicator={false}
					ListFooterComponentStyle={{ marginBottom: '20%' }}
					ListFooterComponent={() => <View />}
					refreshControl={<RefreshControl refreshing={this.props.newsFeeds.loading} onRefresh={()=> this.fetchFeeds()} />}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ feeds, user }) => ({
	newsFeeds: feeds,
	userData: user.userData
});

const actions = {
	getAllFeedsRequest
}

export default connect(
	mapStateToProps,
	actions
)(HomePageComponent);
