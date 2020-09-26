// @flow

import { ABOUT_US,TERMS_AND_CONDITION,PRIVACY_POLICY, APP_INFO_SHOW_LOADING, GET_ALL_NEWS_FEEDS } from "./ActionTypes";

export function loadingAction(payload) {
  return {
    payload,
    type: APP_INFO_SHOW_LOADING
  };
}

export function getAllFeedsRequest(payload) {
    return {
        payload,
        type: GET_ALL_NEWS_FEEDS.REQUEST
    };
}
export function getAllFeedsSuccess(feeds) {
    return {
        feeds,
        type: GET_ALL_NEWS_FEEDS.SUCCESS
    };
}
export function getAllFeedsFailure() {
    return {
        type: GET_ALL_NEWS_FEEDS.FAILURE
    };
}

export function aboutRequest(responseCallback) {
  return {
    responseCallback,
    type: ABOUT_US.REQUEST
  };
}
export function aboutSuccess(data) {
  return {
    data,
    type: ABOUT_US.SUCCESS
  };
}
export function termsRequest(payload) {
  return {
    payload,
    type: TERMS_AND_CONDITION.REQUEST
  };
}
export function termsSuccess(data) {
  return {
    data,
    type: TERMS_AND_CONDITION.SUCCESS
  };
}
export function privacyRequest(payload) {
  return {
    payload,
    type: PRIVACY_POLICY.REQUEST
  };
}
export function privacySuccess(data) {
  return {
    data,
    type: PRIVACY_POLICY.SUCCESS
  };
}

