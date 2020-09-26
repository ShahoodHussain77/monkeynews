import { take, put, call, fork } from "redux-saga/effects";
import {
    TERMS_AND_CONDITION,
    PRIVACY_POLICY,
    GET_ALL_NEWS_FEEDS
} from "../actions/ActionTypes";
import {
    termsSuccess,
    privacySuccess,
} from "../actions/AppInfoActions";
import {
    getAllFeedsFailure,
    getAllFeedsSuccess,
    loadingAction
} from "../actions/FeedsActions";
import {
    PRIVACY_POLICY as PRIVACY_POLICY_URL,
    TERMS_AND_CONDITION as TERMS_AND_CONDITION_URL,
    GET_ALL_NEWS_FEEDS_URL,
    callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function* getAllFeeds() {
    while (true) {
        const { payload } = yield take(GET_ALL_NEWS_FEEDS.REQUEST);
        try {
            const response = yield call( callRequest, GET_ALL_NEWS_FEEDS_URL, payload, "", {}, ApiSauce );
            console.log('response', response)
            if (response.status==1) {
                Util.DialogAlert(response.message, "Success", "success")
                yield put( getAllFeedsSuccess(response.data) );
            } else {
                yield put( getAllFeedsFailure() )
                Util.DialogAlert(response.message)
            }
        } catch (err) {
            console.log('errro', err)
            Util.DialogAlert(err.message)
            yield put( getAllFeedsFailure() )
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
  yield fork(privacypolicyRequest);
  yield fork(getAllFeeds)

}
