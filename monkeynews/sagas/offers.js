import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_OFFERS,
  APPLY_OFFER,
  GET_NOTIFICATIONS
} from "../actions/ActionTypes";
import {
  getOffersSuccess,
  getOffersFailure,
  applyOfferFailure,
  applyOfferSuccess,
  updateOfferNotificationBadge,
  getNotificationsSuccess
} from "../actions/OfferActions";
import {
  OFFERS_URL,
  APPLY_OFFER_URL,
  GET_NOTIFICATIONS_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function* offers() {
  while (true) {
    const { responseCallback } = yield take(GET_OFFERS.REQUEST);
    try {
      const response = yield call( callRequest, OFFERS_URL, {}, "", {}, ApiSauce );
      if (response && response.status == 1) {
        if (responseCallback) responseCallback(response, null);
        yield put(getOffersSuccess(response.data, null))
        yield put(updateOfferNotificationBadge(true))
      } else {
        if (responseCallback) responseCallback(false, null);
        yield put(getOffersFailure())
        Util.DialogAlert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      yield put(getOffersFailure())
      Util.DialogAlert(err.message)
    }
  }
}

function* applyOffer() {
  while (true) {
    const { offerData } = yield take(APPLY_OFFER.REQUEST);
    try {
      const response = yield call( callRequest, APPLY_OFFER_URL, offerData, "", {}, ApiSauce );
      if (response && response.status == 1) {
        Util.DialogAlert(response.message, "Confirm")
        yield put(applyOfferSuccess(response.data))
        // if (responseCallback) responseCallback(response, null);
      } else {
        // if (responseCallback) responseCallback(false, null);
        yield put(applyOfferFailure())
        Util.DialogAlert(response.message);
      }
    } catch (err) {
      // if (responseCallback) responseCallback(null, err);
      yield put(applyOfferFailure())
      Util.DialogAlert(err.message)
    }
  }
}

function* getNotifications() {
  while (true) {
    yield take(GET_NOTIFICATIONS.REQUEST);
    try {
      const response = yield call( callRequest, GET_NOTIFICATIONS_URL, {}, "", {}, ApiSauce );
      if (response && response.status == 1) {
        yield put(getNotificationsSuccess(response.data))
      } else {
        // yield put(getNotificationsSuccess(null))
      }
    } catch (err) {
      // yield put(getNotificationsSuccess(null))
    }
  }
}


export default function* root() {
  yield fork(offers);
  yield fork(applyOffer);
  yield fork(getNotifications);
}
