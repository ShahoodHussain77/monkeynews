// @flow

import {
  LOGIN,
  LOGOUT,
  UPDATE_USER_PROFILE,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD,
  REGISTER_USER,
  VERIFY_USER,
  VERIFY_PASSWORD_OTP,
  PROFILE,
  EDIT_PROFILE,
  MESSAGE_REQUEST,
  TUTORIALS_FINISH,
  CLEAR_ERROR,
  CLEAR_PROFILE_ERROR,
  SHOW_LOADING,
  RESEND_VERIFICATION_CODE,
  COMPLETE_PROFILE,
  RESET_PASSWORD,
  CLEAR_USER_TEMP_DATA,
  CHANGE_PASSWORD
} from "./ActionTypes";

export function updateNavigation() {
  return {
    type: "UPDATE_NAVIGATION"
  };
}

export function logout() {
  return {
    type: "LOGOUT"
  };
}
// loading indicator action
export function showLoaderRequest() {
  return {
    type: SHOW_LOADING
  };
}
// logout request
export function userLogoutRequest(payload) {
  return {
    payload,
    type: LOGOUT.REQUEST
  };
}
// logout request
export function userLogoutSuccess() {
  return {
    type: LOGOUT.SUCCESS
  };
}
// logout request
export function userLogoutFailure() {
  return {
    type: LOGOUT.FAILURE
  };
}
// user signup request
export function registerUserRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REGISTER_USER.REQUEST
  };
}
// user signup success
export function registerUserSuccess(data) {
  return {
    data,
    type: REGISTER_USER.SUCCESS
  };
}
// user signup failure
export function registerFailure(error) {
  return {
    error,
    type: REGISTER_USER.FAILURE
  };
}
// user signup clear error
export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}
// signup otp verification request
export function verifyUserRequest(payload, isResetingPassword) {
  return {
    payload,
    isResetingPassword,
    type: VERIFY_USER.REQUEST
  };
}
export function verifyUserFailure() {
  return {
    type: VERIFY_USER.FAILURE
  };
}
// otp verification success
export function verifyUserSuccess(data, resetPassword) {
  return {
    data,
    resetPassword,
    type: VERIFY_USER.SUCCESS
  };
}
// resend verification code request
export function resendVerificationCodeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESEND_VERIFICATION_CODE.REQUEST
  };
}
// resend verification code failure
export function resendVerificationCodeFailure() {
  return {
    type: RESEND_VERIFICATION_CODE.FAILURE
  };
}
// forgot password request
export function forgotPasswordRequest(payload) {
  return {
    payload,
    type: RESET_PASSWORD.REQUEST
  };
}
// forgot password success
export function forgotPasswordSuccess(data, isResetPassword) {
  return {
    data,
    isResetPassword,
    type: RESET_PASSWORD.SUCCESS
  };
}
// forgot password failure
export function forgotPasswordFailure() {
  return {
    type: RESET_PASSWORD.FAILURE
  };
}
// clear user data after reset password
export function clearTempUserData() {
  return {
    type: CLEAR_USER_TEMP_DATA
  };
}
// verify forgot password opt request
export function verifyPasswordOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VERIFY_PASSWORD_OTP.REQUEST
  };
}
// update password request 
export function updatePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_PASSWORD.REQUEST
  };
}
// user login request
export function userLoginRequest(payload) {
  return {
    payload,
    type: LOGIN.REQUEST
  };
}
// user login success
export function userLoginSuccess(data, access_token) {
  return {
    data,
    access_token,
    type: LOGIN.SUCCESS
  };
}
// user login failure
export function userLoginFailure() {
  return {
    type: LOGIN.FAILURE
  };
}
// complete user profile request
export function completeProfileRequest(payload, authToken) {
  return {
    payload,
    authToken,
    type: COMPLETE_PROFILE.REQUEST
  };
}
// complete user profile success
export function completeProfileSuccess(data, access_token) {
  return {
    data,
    access_token,
    type: COMPLETE_PROFILE.SUCCESS
  };
}
// complete user profile success
export function completeProfileFailure() {
  return {
    type: COMPLETE_PROFILE.FAILURE
  };
}
// change password request
export function changePasswordRequest(payload) {
  return {
    payload,
    type: CHANGE_PASSWORD.REQUEST
  };
}
// user profile success
export function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD.SUCCESS
  };
}
// change password failure
export function changePasswordFailure() {
  return {
    type: CHANGE_PASSWORD.FAILURE
  };
}

// user profile request
export function userProfileRequest(responseCallback) {
  return {
    responseCallback,
    type: PROFILE.REQUEST
  };
}
// user profile success
export function userProfileSuccess(data) {
  return {
    data,
    type: PROFILE.SUCCESS
  };
}
// edit user profile request
export function editUserProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_PROFILE.REQUEST
  };
}

export function editUserProfileSuccess(data) {
  return {
    data,
    type: EDIT_PROFILE.SUCCESS
  };
}

export function editUserProfileFailure(error) {
  return {
    error,
    type: EDIT_PROFILE.FAILURE
  };
}

export function clearProfileError() {
  return {
    type: CLEAR_PROFILE_ERROR
  };
}

export function messagesRequest(responseCallback) {
  return {
    responseCallback,
    type: MESSAGE_REQUEST.REQUEST
  };
}

export function messagesSuccess(data) {
  return {
    data,
    type: MESSAGE_REQUEST.SUCCESS
  };
}

export function completeTutorials() {
  return {
    type: TUTORIALS_FINISH
  };
}

// export function updatePasswordSuccess(token, responseCallback) {
//   return {
//     token,
//     responseCallback,
//     type: UPDATE_PASSWORD.SUCCESS
//   };
// }
