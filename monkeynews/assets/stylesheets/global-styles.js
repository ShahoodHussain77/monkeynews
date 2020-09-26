/**
 * Created by Shahood Hussain.
 */

// import Theme from "./theme";
import { Colors, Fonts } from "../../theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {Dimensions, PixelRatio} from 'react-native';
const {width, height} = Dimensions.get('window');
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const pixelRatio = PixelRatio.get();
export default {
  container: {
    flex: 1,
  },
  bgImageContainer: {
    flex: 1,
    width,
    height,
  },
  bgImageContainerStyle: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'stretch',
  },
  // @global app button styles
  appButton: {
    flex: 1,
    backgroundColor: Colors.appButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  noStyleAppButton: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden'
  },
  shadowLevel6: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  marginHorizontal10: {
    marginHorizontal: 10
  },
  justifyAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundTransparent: {
    backgroundColor: 'transparent'
  },
  flexGrow: {
    flexGrow: 1,
  },

  // @login screen styles
  loginContainer: {
    // flex: 1,
    height: hp('100%'),
    // backgroundColor: 'red',
    justifyContent: 'center'
  },
  formContainer: {
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 20
  },
  prefixIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  inputHeaderLabel: {
    color: Colors.iceblue,
    fontSize: Fonts.size.small
  },
  inputView: {
    flex: 1,
    marginLeft: 10,
  },
  textInput: {
    // height: 40,
    fontSize: Fonts.size.normal,
    padding: 0,
    color: Colors.white
  },
  passwordEyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  eyeIconButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  mediaIconsView: {
    marginLeft: 10,
  },
  mediaIcon: {
    width: 55,
    height: 55,
    resizeMode: 'contain'
  },
  loginButtonView: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  loginText: {
    color: Colors.white,
    fontSize: Fonts.size.large
  },
  signUpBottom: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText: {
    color: Colors.white,
    fontSize: Fonts.size.medium
  },
  signUpImage: {
    marginHorizontal: 5,
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  forgotPasswordNavView: {
    marginHorizontal: 20,
    alignItems: 'center'
  },
  forgotPasswordText: {
    color: Colors.white,
    fontSize: Fonts.size.small
  },

  // @forgot password screen
  resetPasswordContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    height: 55,
  },
  resetPasswordButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  // @sign up screen
  
  // @otp user screen
  otpContainer: {
    alignItems: 'center',
  },
  verifyButton: {
    marginVertical: 20
  },
  underlineStyleBase: {
    width: 55,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.4)',//'#ffffff80',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
    fontSize: 17,
    borderColor: 'transparent',
    borderRadius: 20,
  },
  underlineStyleHighLighted: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: Platform.OS === "android" ? 60 : 60,
    height: Platform.OS === "android" ? 65 : 65,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    color: Colors.white,
    fontSize: Fonts.size.normal
  },

  // @complete profile screen
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerLabel: {
    color: Colors.black1,
    fontSize: Fonts.size.xSmall
  },
  cmpTextInput: {
    color: Colors.black,
    fontSize: Fonts.size.normal,
  },
  formInputs: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  pickerDropDownImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  inputIOS: {
    fontSize: Fonts.size.normal,
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: Colors.black,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: Fonts.size.normal,
    paddingHorizontal: 0,
    paddingVertical: 8,
    color: Colors.black,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidFilter: {
    paddingHorizontal: 20,
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
  placeholder: {
    color: Colors.background.tertiary,
    fontSize: Fonts.size.normal,
  },
  cmProfileButton: {
    alignItems: 'center',
  },
  dateInputContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10
  },
  selectedDateText: {
    fontSize: Fonts.size.normal,
    color: Colors.black,
  },

  // @home tabbar styles
  tabBarContainer: {
    height: 50, width: '75%', flexDirection: 'row', backgroundColor: Colors.white,
    position: 'absolute', bottom: 20, alignSelf: 'center', borderRadius: 20
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 35,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  tabIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  feedsHeaderIconContainer: {
    top: 10,
  },

  // @feed screen 
  feedItemContainer: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  itemHeaderTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerLabelText: {
    color: Colors.windowTint,
    fontSize: Fonts.size.small,
    fontStyle: 'italic'
  },
  headerContentText: {
    color: Colors.black,
    fontSize: Fonts.size.normal
  },
  itemBodyContainer: {
    height: pixelRatio < 3 ? pixelRatio * 90 : pixelRatio * 70,
    marginVertical: 10
  },
  bodyImage: {
    resizeMode: 'cover',
    borderRadius: 25,
  },
  bodyCategoryContainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20
  },
  bodyCategoryText: {
    color: Colors.white,
    fontSize: Fonts.size.small,
    fontStyle: 'italic'
  },
  postReactionSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 5,
  },
  dotSeprator: {
    width: 5,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 5
  },
  reactionText: {
    color: Colors.white,
    fontSize: Fonts.size.xxxSmall,
    textShadowColor: '#000', color: '#fff', textShadowRadius: 1, textShadowOffset: {width: 2, height: 1}
  },
  bodyBottomSection: {
    flexDirection: 'row',
    backgroundColor: '#00000070',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  bodyBottomImages: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginHorizontal: 4,
  },
  bodyBottomImagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyImageCountText: {
    color: Colors.white,
    fontSize: Fonts.size.xSmall
  },
  footerContainer: {},
  feedTitle: {
    color: Colors.black,
    fontSize: Fonts.size.normal
  },
  descriptionText: {
    textAlign: 'justify',
    color: Colors.windowTint,
    fontSize: Fonts.size.small,
    fontStyle: 'italic'
  },

  // @feed user likes list 
  userListItem: {
    marginVertical: 7,
    marginHorizontal: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerImageContainer: {
    borderRadius: 20,
  },
  likeUserImage: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
    overflow: 'hidden'
  },
  bodyUserDetailsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  userNameText: {
    color: Colors.black,
    fontSize: Fonts.size.normal
  },
  heartIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 5
  },
  userFooterContainer: {
    flex: 0.4,
    borderRadius: 20,
    overflow: 'hidden',
    height: 30,
    alignSelf: 'center'
  },
  userCommentsFooterContainer: {
    height: 30,
    width: 70,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 20,
    overflow: 'hidden'
  },
  footerImageStyle: {
    resizeMode: 'contain'
  },
  followText: {
    color: Colors.white,
    fontSize: Fonts.size.xxSmall,
  },
  unfollowTextColor: {
    color: Colors.followColor,
  },
  commentsText: {
    color: Colors.windowTint,
    fontSize: Fonts.size.xxSmall
  },

  // @view other users profile screen
  headingUserNameText: {
    marginVertical: 1,
    color: Colors.black,
    fontSize: Fonts.size.xLarge,
    fontFamily: Fonts.type.SemiBoldItalic,
    fontStyle: 'italic'
  },
  detailsText: {
    marginVertical: 1,
    color: Colors.black,
    fontSize: Fonts.size.small,
  },
  userTagsContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    flexWrap: 'wrap'
  },
  userTags: {
    borderRadius: 14,
    borderColor: Colors.followColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  tagText: {
    color: Colors.black,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Light
  },
  userProfileImage: {
    // flex: 1,
    height: '28%',
    resizeMode: 'contain',
    marginVertical: 10
  },

  // @settings profile screen
  rowStackContainer: {
    marginHorizontal: 5
  },
  itemContainer: {
    backgroundColor: Colors.followColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5
  },
  settingsIcon: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 5
  },
  settingsText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Light
  },
  myUserProfileImage: {
    height: 150,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  // @terms and condition screen
  termsText: {
    marginHorizontal: 15, marginVertical: 20, letterSpacing: 1.2, lineHeight: 20, fontSize: 16, textAlign: 'justify'
  }
}