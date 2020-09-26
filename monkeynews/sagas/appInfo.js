import { take, put, call, fork } from "redux-saga/effects";
import {
TERMS_AND_CONDITION,
PRIVACY_POLICY,
ABOUT_US,
FEED_BACK
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  termsSuccess,
  aboutSuccess,
  privacySuccess,
  feedBackSuccess,
  feedBackFailure,
  loadingAction
} from "../actions/AppInfoActions";
import {
  PRIVACY_POLICY as PRIVACY_POLICY_URL,
  ABOUT_US as ABOUT_US_URL,
  TERMS_AND_CONDITION as TERMS_AND_CONDITION_URL,
  FEED_BACK_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";
import {goBack} from "../services/NavigationService";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* sendFeedBack() {
  while (true) {
    const { payload } = yield take(FEED_BACK.REQUEST);
    try {
      const response = yield call( callRequest, FEED_BACK_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        Util.DialogAlert(response.message, "Success", "success")
        yield put( feedBackSuccess(response.data) );
        goBack();
      } else {
        yield put( feedBackFailure() )
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      Util.DialogAlert(err.message)
      yield put( feedBackFailure() )
    }
  }
}

function* termsrequest() {
  while (true) {
    const { payload } = yield take(TERMS_AND_CONDITION.REQUEST);
    try {
      const response = yield call( callRequest, TERMS_AND_CONDITION_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        yield put(termsSuccess(response.data));
      } else {
        yield put(loadingAction({ isLoading: false }));
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      yield put(loadingAction({ isLoading: false }));
      Util.DialogAlert(response.message)
    }
  }
}
function* aboutusrequest() {
  while (true) {
    const { responseCallback } = yield take(ABOUT_US.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ABOUT_US_URL,
        {},
        "",
        {},
        ApiSauce
      );
      if (response.success) {
     
        if (responseCallback) responseCallback(true, response.success.content);
        yield put(aboutSuccess(response.success.content));
      } else {
        if (responseCallback) responseCallback(null, null);
        alert("Something went wrong");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* privacypolicyRequest() {
  while (true) {
    const { payload } = yield take(PRIVACY_POLICY.REQUEST);
    try {
      const response = yield call( callRequest, PRIVACY_POLICY_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        yield put(privacySuccess(response.data));
      } else {
        yield put(loadingAction({ isLoading: false }));
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      yield put(loadingAction({ isLoading: false }));
      Util.DialogAlert(response.message)
    }
  }
}

export default function* root() {
 
  yield fork(termsrequest);
  yield fork(aboutusrequest);
  yield fork(privacypolicyRequest);
  yield fork(sendFeedBack)

}
