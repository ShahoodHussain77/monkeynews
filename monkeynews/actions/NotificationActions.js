// @flow

import { GET_ALL_NOTIFICATIONS } from "./ActionTypes";

export function getNotificationRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ALL_NOTIFICATIONS.REQUEST
  };
}

export function getNotificationSuccess(data: Object) {
  return {
    data,
    type: GET_ALL_NOTIFICATIONS.SUCCESS
  };
}
