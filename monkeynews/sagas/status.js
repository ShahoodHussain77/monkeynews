import { take, put, call, fork } from "redux-saga/effects";
import {
  CAR_STATUS,
  GET_CAR_STATUS
} from "../actions/ActionTypes";
import { carStatusSuccess, updateStatusNotification, allCarStatusSuccess } from "../actions/StatusActions";
import {
  CAR_STATUS_URL,
  GET_CAR_STATUS_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";


function* carStatus() {
  while (true) {
    const { payload, responseCallback } = yield take(CAR_STATUS.REQUEST);
    try {
      const url = {
        ...CAR_STATUS_URL,
        route: `${CAR_STATUS_URL.route}?car_id=${payload.car_id}`
      };
      const response = yield call( callRequest, url, {}, "", {}, ApiSauce );
      if (response && response.status == 1) {
        if (responseCallback) responseCallback(response.data, null);
        yield put(carStatusSuccess(response.data, payload));
        yield put(updateStatusNotification(response.data.Full_health_Report));
      } else {
        if (responseCallback) responseCallback(null, null);
        Util.DialogAlert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback({errorMessage: err.message}, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* getCarStatus() {
  while (true) {
    yield take(GET_CAR_STATUS.REQUEST);
    try {
      const response = yield call( callRequest, GET_CAR_STATUS_URL, {}, "", {}, ApiSauce );
      if (response && response.status == 1) {
        yield put(allCarStatusSuccess(response.data));
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (err) {
      Util.DialogAlert(err.message)
    }
  }
}


export default function* root() {
  yield fork(carStatus);
  yield fork(getCarStatus);
}
