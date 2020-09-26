import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_SERVICES,
  GET_SERVICES_PACKAGE,
  SUBSCRIBE_SERVICE,
  MY_SUBSCRIPTION,
  PREPARING_SUBSCRIPTION,
  GET_QUOTATION
} from "../actions/ActionTypes";
import {
  getServicesSuccess,
  getServicePackageSuccess,
  subscriptionSuccess,
  getTotalCarePackageSuccess
} from "../actions/ServicesAction";
import {
  SERVICES_URL,
  SERVICE_PACKAGE_URL,
  SUBSCRIBE_SERVICE_URL,
  SUBSCRIPTION_URL,
  TEMP_BOOKING_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function* carModel() {
  while (true) {
    const { responseCallback } = yield take(GET_SERVICES.REQUEST);
    try {
      const response = yield call(callRequest, SERVICES_URL, {}, "", {}, ApiSauce);
      if (response && response.length > 0) {
        if (responseCallback) responseCallback(response, null);
        yield put(getServicesSuccess(response, null))
      } else {
        if (responseCallback) responseCallback(false, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* packages() {
  while (true) {
    const { payload, responseCallback } = yield take(GET_SERVICES_PACKAGE.REQUEST);
    try {
      const url = {
        ...SERVICE_PACKAGE_URL,
        route: `${SERVICE_PACKAGE_URL.route}?service_id=${payload.service_id}`
      };
      const response = yield call(callRequest, url, {}, "", {}, ApiSauce);
      if (response && response.packages) {
        if (response.packages.length > 0) {
          if (responseCallback) responseCallback(response, null);
          yield put(getServicePackageSuccess(response.packages, response.plans))
        }
      } else if (response && response.options) {
        if (response.options.length > 0) {
          if (responseCallback) responseCallback(response, null);
          yield put(getServicePackageSuccess(response.options, null))
        }
      } else if (response && response.length > 0) {
        if (responseCallback) responseCallback(response, null);
        yield put(getServicePackageSuccess(response, null))
        // yield put(getTotalCarePackageSuccess(response))
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* preparing() {
  while (true) {
    const { payload, responseCallback } = yield take(PREPARING_SUBSCRIPTION.REQUEST);
    try {
      const response = yield call(callRequest, TEMP_BOOKING_URL, payload, "", {}, ApiSauce);
      if (response && response._id) {
        if (responseCallback) responseCallback(response, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* subscribe() {
  while (true) {
    const { payload, responseCallback } = yield take(SUBSCRIBE_SERVICE.REQUEST);
    try {
      const response = yield call(callRequest, SUBSCRIBE_SERVICE_URL, payload, "", {}, ApiSauce);
      if (response && response.status == 1) {
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* quotationSubscription() {
  while (true) {
    const { payload, responseCallback } = yield take(GET_QUOTATION);
    try {
      const response = yield call(callRequest, SUBSCRIBE_SERVICE_URL, payload, "", {}, ApiSauce);
      if (response && response.status == 1) {
        // Util.DialogAlert(response.message, "Thank You")
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* subscriptions() {
  while (true) {
    const { responseCallback } = yield take(MY_SUBSCRIPTION.REQUEST);
    try {
      const response = yield call(callRequest, SUBSCRIPTION_URL, {}, "", {}, ApiSauce);
      if (response && response.ondemand && response.subscriptions) {
        if (responseCallback) responseCallback(response, null);
        yield put(subscriptionSuccess(response))
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

export default function* root() {
  yield fork(carModel);
  yield fork(packages);
  yield fork(subscribe);
  yield fork(subscriptions);
  yield fork(preparing);
  yield fork(quotationSubscription);
}
