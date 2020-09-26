import { take, put, call, fork } from "redux-saga/effects";
import {
  LOGOUT,
  FORGOT_PASSWORD,
  REGISTER_USER,
  VERIFY_USER,
  LOGIN,
  UPDATE_PASSWORD,
  VERIFY_PASSWORD_OTP,
  PROFILE,
  EDIT_PROFILE,
  MESSAGE_REQUEST,
  RESEND_VERIFICATION_CODE,
  COMPLETE_PROFILE,
  RESET_PASSWORD,
  CHANGE_PASSWORD
} from "../actions/ActionTypes";
import {
  userLoginSuccess,
  userLoginRequest,
  userLoginFailure,
  userLogoutSuccess,
  editUserProfileSuccess,
  registerUserSuccess,
  userProfileSuccess,
  messagesSuccess,
  editUserProfileFailure,
  registerFailure,
  verifyUserFailure,
  verifyUserSuccess,
  resendVerificationCodeFailure,
  completeProfileFailure,
  completeProfileSuccess,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  userLogoutFailure,
  changePasswordFailure,
  changePasswordSuccess
} from "../actions/UserActions";
import {
  LOGIN_URL,
  LOGOUT_URL,
  FORGOT_PASSWORD_URL,
  UPDATE_PASSWORD_URL,
  SIGNUP_URL,
  VERIFY_USER_URL,
  VERIFY_PASSWORD_OTP_URL,
  PROFILE_URL,
  EDIT_PROFILE_URL,
  MESSAGE_REQUEST_URL,
  RESEND_CODE_URL,
  COMPLETE_PROFILE_URL,
  CHANGE_PASSWORD_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";
import * as NavigationService from "../services/NavigationService";
import { routeName as otpRoute } from "../containers/register/otp-component";
import { routeName as completeProfileRoute } from "../containers/register/complete-profile";

function* messages() {
  while (true) {
    const { responseCallback } = yield take(MESSAGE_REQUEST.REQUEST);
    try {
      const response = yield call( callRequest, MESSAGE_REQUEST_URL, {}, "", {}, ApiSauce );
      if (response.status==1) {
        if (responseCallback) responseCallback(response.data, null);
        yield put( messagesSuccess(response.data) );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* login() {
  while (true) {
    const { payload } = yield take(LOGIN.REQUEST);
    try {
      const response = yield call( callRequest, LOGIN_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        yield put( userLoginSuccess(response.data, response.data.user_authentication) );
      } else {
        if( response && response.user_is_verified == false ) {
          Util.DialogAlert(response.message, "Info", "info");
          yield put( registerUserSuccess(response && response.user_id) );
          NavigationService.navigate(otpRoute)
        } else if( response && response.user_is_profile_complete == false ) {
          Util.DialogAlert(response.message, "Info", "info");
          yield put( registerUserSuccess(response && response.user_id) );
          NavigationService.navigate(completeProfileRoute)
        } else {
          Util.DialogAlert(response.message);
          yield put( userLoginFailure() );
        }
      }
    } catch (err) {
      yield put( userLoginFailure() );
      Util.DialogAlert(err.message)
    }
  }
}

function* registerUser() {
  while (true) {
    const { payload } = yield take(REGISTER_USER.REQUEST);
    try {
      const response = yield call( callRequest, SIGNUP_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        Util.DialogAlert(response.message, "Success", "success")
        yield put( registerUserSuccess(response.data) );
        //@desc navigate to verify user screen with check of interval when mounting
        NavigationService.navigate(otpRoute, {startOnMount: true} )
      } else {
        yield put(registerFailure(response.message))
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      Util.DialogAlert(err.message)
      yield put(registerFailure(err))
    }
  }
}

function* verifyUser() {
  while (true) {
    const { payload, isResetingPassword } = yield take(VERIFY_USER.REQUEST);
    try {
      const response = yield call( callRequest, VERIFY_USER_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        Util.DialogAlert(response.message, "Success", "success")
        yield put( verifyUserSuccess(response.data, isResetingPassword) );
        !isResetingPassword && NavigationService.navigate(completeProfileRoute);
      } else {
        Util.DialogAlert(response.message)
        yield put(verifyUserFailure())
      }
    } catch (err) {
      Util.DialogAlert(err.message)
      yield put(verifyUserFailure())
    }
  }
}

function* resendverificationCode() {
  while (true) {
    const { payload, responseCallback } = yield take(RESEND_VERIFICATION_CODE.REQUEST);
    try {
      const response = yield call( callRequest, RESEND_CODE_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        Util.DialogAlert(response.message, "Success", "success")
        if (responseCallback) responseCallback(true);
        yield put( resendVerificationCodeFailure() );
      } else {
        Util.DialogAlert(response.message)
        yield put(resendVerificationCodeFailure())
      }
    } catch (err) {
      Util.DialogAlert(err.message)
      yield put(resendVerificationCodeFailure())
    }
  }
}

function* completeProfile() {
  while (true) {
    const { payload, authToken } = yield take(COMPLETE_PROFILE.REQUEST);
    try {
      const response = yield call( callRequest, COMPLETE_PROFILE_URL, payload, "", {Authorization: authToken}, ApiSauce );
      if (response.status==1) {
        Util.DialogAlert(response.message, "Success", "success")
        yield put( completeProfileSuccess(response.data, response.data.user_authentication) );
      } else {
        Util.DialogAlert(response.message)
        yield put(completeProfileFailure())
      }
    } catch (err) {
      Util.DialogAlert(err.message)
      yield put(completeProfileFailure())
    }
  }
}

function* changePassword() {
  while (true) {
    const { payload } = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call( callRequest, CHANGE_PASSWORD_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        Util.DialogAlert(response.message, "Success", "success")
        yield put( changePasswordSuccess() );
        NavigationService.goBack();
      } else {
        Util.DialogAlert(response.message)
        yield put(changePasswordFailure())
      }
    } catch (err) {
      Util.DialogAlert(err.message)
      yield put(changePasswordFailure())
    }
  }
}

function* verifyPasswordOtp() {
  while (true) {
    const { payload, responseCallback } = yield take(VERIFY_PASSWORD_OTP.REQUEST);
    try {
      const response = yield call( callRequest, VERIFY_PASSWORD_OTP_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        if (responseCallback) responseCallback(response.data, null);
      } else {
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* logout() {
  while (true) {
    const { payload } = yield take(LOGOUT.REQUEST);
    try {
      const response = yield call( callRequest, LOGOUT_URL, payload, "", {Authorization: Util.getCurrentUserAccessToken()}, ApiSauce );
      if (response.status==1) {
        yield put(userLogoutSuccess());
      } else {
        Util.DialogAlert(response.message, "Error", 'error')
        yield put(userLogoutFailure());
      }
    } catch (err) {
      Util.DialogAlert(err.message, "Error", 'error')
      yield put(userLogoutFailure());
    }
  }
}

function* updateUserProfile() {
  while (true) {
    const { payload, responseCallback } = yield take( EDIT_PROFILE.REQUEST );
    try {
      const response = yield call( callRequest, EDIT_PROFILE_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        if (responseCallback) responseCallback(response.data, null);
        yield put(editUserProfileSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      yield put(editUserProfileFailure(err.data))
      Util.DialogAlert(err.message)
    }
  }
}

function* forgotPassword() {
  while (true) {
    const { payload } = yield take( RESET_PASSWORD.REQUEST );
    try {
      const response = yield call( callRequest, FORGOT_PASSWORD_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        yield put(forgotPasswordSuccess(response.data, true ));
        Util.DialogAlert(response.message, "Success", "success");
        NavigationService.navigate(otpRoute);
      } else {
        Util.DialogAlert(response.message)
        yield put(forgotPasswordFailure());
      }
    } catch (err) {
      yield put(forgotPasswordFailure());
      Util.DialogAlert(err.message)
    }
  }
}

function* updatePassword() {
  while (true) {
    const { payload, responseCallback } = yield take( UPDATE_PASSWORD.REQUEST );
    try {
      const response = yield call( callRequest, UPDATE_PASSWORD_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        if (responseCallback) responseCallback(response, null);
      } else {
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* getProfileData() {
  while (true) {
    const { payload, responseCallback } = yield take( PROFILE.REQUEST );
    try {
      const response = yield call( callRequest, PROFILE_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        if (responseCallback) responseCallback(response, null);
        yield put(userProfileSuccess(response.data));
      } else {
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

export default function* root() {
  yield fork(logout);
  yield fork(login);
  yield fork(registerUser);
  yield fork(verifyUser);
  yield fork(updateUserProfile);
  yield fork(forgotPassword);
  yield fork(updatePassword);
  yield fork(verifyPasswordOtp);
  yield fork(getProfileData);
  yield fork(messages);
  yield fork(resendverificationCode);
  yield fork(completeProfile);
  yield fork(changePassword);
}
