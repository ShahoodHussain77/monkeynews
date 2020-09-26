// /**
//  * Created by Shahood Hussain.
//  */

import React, { PureComponent } from "react";
import { connect, useDispatch } from "react-redux";
import SplashScreen from 'react-native-splash-screen'
import { Colors } from "../theme";
import { setNavigator } from "../services/NavigationService";
import { generateFormData } from "../helpers/classesHelper";

// redux actions
import { userLogoutRequest, userLogoutSuccess } from "../actions/UserActions";
import { getAllFeedsRequest } from "../actions/FeedsActions";

// @navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from 'react-native-screens';


// @navigation header components
import { HeaderTitle, HeaderLeft, HeaderRightFilter, HeaderRight, HeaderLogoutContainer } from "./header-options";
import CustomTabBar from "./custom-nav-bar";

// @Authentication component imports
import LoginComponent from "../containers/login/login";
import ForgotPassword from "../containers/forgot-password/forgot-password-component";
import SignUpComponent from "../containers/register/sign-up";
import OTPSignUp from "../containers/register/otp-component";
import CompleteProfile from "../containers/register/complete-profile";

// @App logic component imports
import HomeComponent from "../containers/feeds/home-page-component";
import FeedReactUsersList from "../containers/feeds/onfeed-users-react-list";
import FeedCommentsList from "../containers/feeds/feeds-comments-components";
import FollowersTab from "../containers/followers/followers-tab-component";
import UsersProfileComponent from "../containers/profile/view-users-profile";
import SettingsTabComponent from "../containers/settings/settings-tab-component";
import ChangePasswordComponent from "../containers/settings/change-password-component";
import EditProfileComponent from "../containers/settings/edit-profile-component";
import FeedBackComponent from "../containers/settings/help-feedback-component";
import PrivacyPolicyComponent from "../containers/settings/privacy-policy-component";
import TermsConditionComponent from "../containers/settings/terms-condition-component";

enableScreens();
const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();
const TabBar = createBottomTabNavigator();

const dispatchNewsFeedAction = (user, category, dispatch) => {
  const feedsPayload = {
    user_id: user.userData.user_id,
    category: category
  }
  dispatch(getAllFeedsRequest(feedsPayload));
}

function FeedStack({navigation, userData}) {
  let filterValue = 'general';
  const dispatch = useDispatch();
  return(
    <NativeStack.Navigator>
      <NativeStack.Screen name={HomeComponent.routeName} component={HomeComponent} options={{
        headerHideShadow: true,
        headerTitle: null,
        headerRight: ()=> <HeaderRightFilter 
          onFilterChangeDone={()=> dispatchNewsFeedAction(userData, filterValue, dispatch)}
          onValueChange={(value)=> filterValue = value}
        />
      }}/>
      <NativeStack.Screen name={FeedReactUsersList.routeName} component={FeedReactUsersList} options={{
        headerHideShadow: true,
        headerTitle: null,
        headerLeft: ()=> <HeaderLeft blueHeaderIcon={true} onPress={()=> navigation.navigate(HomeComponent.routeName)}/>
      }}/>
      <NativeStack.Screen name={FeedCommentsList.routeName} component={FeedCommentsList} options={{
        headerHideShadow: true,
        headerCenter: ()=> <HeaderTitle title="Comments" fontColor={Colors.black}/>,
        headerLeft: ()=> <HeaderLeft blueHeaderIcon={true} onPress={()=> navigation.navigate(HomeComponent.routeName)}/>
      }}/>
    </NativeStack.Navigator>
  )
}

function FollowersStack({navigation}) {
  return(
    <NativeStack.Navigator>
      <NativeStack.Screen name={FollowersTab.routeName} component={FollowersTab} options={{
        title: null,
        headerHideShadow: true,
        // headerLeft: ()=> <HeaderLeft blueHeaderIcon={true} onPress={()=> navigation.goBack()}/>,
      }}/>
      <NativeStack.Screen name={UsersProfileComponent.routeName} component={UsersProfileComponent} options={{
        title: null,
        headerHideShadow: true,
        headerLeft: ()=> <HeaderLeft blueHeaderIcon={true} onPress={()=> navigation.navigate(FollowersTab.routeName)}/>,
        headerRight: ()=> <HeaderRight onPress={()=> {}}/>
      }}/>
    </NativeStack.Navigator>
  )
}

function SettingsStack({navigation, userData}) {
  const dispatch = useDispatch();
  const logoutPayload = {
    user_id: userData.userData.user_id
  }
  return(
    <NativeStack.Navigator>
      <NativeStack.Screen name={SettingsTabComponent.routeName} component={SettingsTabComponent} options={{
        title: null,
        headerHideShadow: true,
        // headerLeft: ()=> <HeaderLeft blueHeaderIcon={true} onPress={()=> navigation.goBack()}/>,
        headerRight: ()=> <HeaderLogoutContainer onLogoutPress={()=> [dispatch(userLogoutRequest(generateFormData(logoutPayload))), dispatch(userLogoutSuccess()) ] }
          onEditProfilePress={()=> navigation.navigate(EditProfileComponent.routeName)}
          loading={userData.loading}
        />
      }}/>
      <NativeStack.Screen name={ChangePasswordComponent.routeName} component={ChangePasswordComponent} options={{
        headerHideShadow: true,
        headerCenter: ()=> <HeaderTitle title="Change Password" fontColor={Colors.black}/>,
        headerLeft: ()=> <HeaderLeft blackHeaderIcon={true} onPress={()=> navigation.navigate(SettingsTabComponent.routeName)}/>,
      }}/>
      <NativeStack.Screen name={TermsConditionComponent.routeName} component={TermsConditionComponent} options={{
        headerHideShadow: true,
        headerCenter: ()=> <HeaderTitle title="Terms & Condition" fontColor={Colors.black}/>,
        headerLeft: ()=> <HeaderLeft blackHeaderIcon={true} onPress={()=> navigation.navigate(SettingsTabComponent.routeName)}/>,
      }}/>
      <NativeStack.Screen name={PrivacyPolicyComponent.routeName} component={PrivacyPolicyComponent} options={{
        headerHideShadow: true,
        headerCenter: ()=> <HeaderTitle title="Privacy Policy" fontColor={Colors.black}/>,
        headerLeft: ()=> <HeaderLeft blackHeaderIcon={true} onPress={()=> navigation.navigate(SettingsTabComponent.routeName)}/>,
      }}/>
      <NativeStack.Screen name={FeedBackComponent.routeName} component={FeedBackComponent} options={{
        headerHideShadow: true,
        headerCenter: ()=> <HeaderTitle title="Help & Feedback" fontColor={Colors.black}/>,
        headerLeft: ()=> <HeaderLeft blackHeaderIcon={true} onPress={()=> navigation.navigate(SettingsTabComponent.routeName)}/>,
      }}/>
      <NativeStack.Screen name={EditProfileComponent.routeName} component={EditProfileComponent} options={{
        headerHideShadow: true,
        headerCenter: ()=> <HeaderTitle title="Edit Profile" fontColor={Colors.black}/>,
        headerLeft: ()=> <HeaderLeft blackHeaderIcon={true} onPress={()=> navigation.navigate(SettingsTabComponent.routeName)}/>,
      }}/>
    </NativeStack.Navigator>
  )
}

class Routes extends PureComponent{

  componentDidMount() {
    SplashScreen.hide();
  }

  renderTabNavigation = (props) => {
    return(
      <TabBar.Navigator 
      tabBar={props => <CustomTabBar navigationProps={props} /> }
      initialRouteName="FeedsTab"
      tabBarOptions={{keyboardHidesTabBar: true}}>
        <TabBar.Screen name="FollowingTab" component={FollowersStack} />
        <TabBar.Screen name="FeedsTab" children={()=> <FeedStack userData={this.props.userData} {...props}/> }/>
        <TabBar.Screen name="SettingsTab" children={()=> <SettingsStack userData={this.props.userData} {...props}/> } />
      </TabBar.Navigator>
    )
  }

  render(){
    const {userData} = this.props;
    // if( this.props.userData && !this.props.userData.finish_tutorials ) {
    //   <Stack.Navigator>
    //     <Stack.Screen name="Welcome" component={LoginComponent} />
    //   </Stack.Navigator>
    // }
    if( this.props.userData && this.props.userData.access_token ) {
      return(
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={this.renderTabNavigation} />
        </Stack.Navigator>
      );
    } else {
      const authHeaderNavigationConfig = {
        headerTransparent: true,
        headerTitleAlign: "center",
        headerShown: true
      }
      return(
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name={LoginComponent.routeName} component={LoginComponent} options={{headerShown: false }}/>
          <Stack.Screen name={SignUpComponent.routeName} component={SignUpComponent} options={{headerShown: false}}/>
          <Stack.Screen name={ForgotPassword.routeName} component={ForgotPassword} options={({navigation, route}) => ({
            headerTitle: ()=> <HeaderTitle title="Forgot Password"/>,
            headerLeft: ()=> <HeaderLeft onPress={()=> navigation.goBack()}/>,
            ...authHeaderNavigationConfig
          })}/>
          <Stack.Screen name={OTPSignUp.routeName} component={OTPSignUp} options={({navigation, route}) => ({
            headerTitle: ()=> <HeaderTitle title={userData.resetingPassword ? "Reset Password" : "Email Verification"}/>,
            headerLeft: ()=> <HeaderLeft onPress={()=> navigation.goBack()}/>,
            ...authHeaderNavigationConfig
          })}/>
          <Stack.Screen name={CompleteProfile.routeName} component={CompleteProfile} options={({navigation, route}) => ({
            headerTitle: ()=> <HeaderTitle title="Complete Profile" fontColor={Colors.black}/>,
            headerLeft: ()=> <HeaderLeft onPress={()=> navigation.goBack()} blackHeaderIcon={true}/>,
            headerStyle: { elevation: 0, shadowColor: 0 },
            headerTitleAlign: "center",
          })}/>
        </Stack.Navigator>
      )
    }
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user
});

const RouterComponent = connect(mapStateToProps, null)(Routes);

const Router = () => {
  return (
    <NavigationContainer ref={nav=> setNavigator(nav)}>
      <RouterComponent />
    </NavigationContainer>
  );
}

export default Router;