// @flow

import { ABOUT_US,TERMS_AND_CONDITION,PRIVACY_POLICY, FEED_BACK, APP_INFO_SHOW_LOADING } from "./ActionTypes";

export function loadingAction(payload) {
  return {
    payload,
    type: APP_INFO_SHOW_LOADING
  };
}

export function feedBackRequest(payload) {
  return {
    payload,
    type: FEED_BACK.REQUEST
  };
}
export function feedBackSuccess(data) {
  return {
    data,
    type: FEED_BACK.SUCCESS
  };
}
export function feedBackFailure() {
  return {
    type: FEED_BACK.FAILURE
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

