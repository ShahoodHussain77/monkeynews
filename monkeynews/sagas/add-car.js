import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_AREA_BUILDING,
  GET_STATES,
  GET_STATES_AREA,
  GET_CAR_MAKER,
  GET_CAR_MODEL,
  ADD_NEW_CAR,
  GET_CARS,
  DELETE_CAR
} from "../actions/ActionTypes";
import { getCarsSuccess, addCarFailure, getCarsFailure } from "../actions/AddCarActions";
import {
  GET_STATES_URL,
  GET_STATES_AREA_URL,
  GET_AREA_BUILDING_URL,
  GET_CAR_MAKER_URL,
  GET_CAR_MODEL_URL,
  ADD_CAR_URL,
  GET_CARS_URL,
  DELETE_CAR_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";
import { BASE_URL } from "../config/WebService";


function* getStates() {
  while (true) {
    const { responseCallback } = yield take(GET_STATES.REQUEST);
    try {
      const response = yield call( callRequest, GET_STATES_URL, {}, "", {}, ApiSauce );
      if (response && response.length > 0) {
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

function* statesArea() {
  while (true) {
    const { payload, responseCallback } = yield take(GET_STATES_AREA.REQUEST);
    try {
      const url = {
        ...GET_STATES_AREA_URL,
        route: `${GET_STATES_AREA_URL.route}/${payload.stateId}`
      };
      const response = yield call( callRequest, url, {}, "", {}, ApiSauce );
      if (response && response.length > 0) {
        if (responseCallback) responseCallback(response, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        Util.DialogAlert("No area available for selected state");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* areaBuilding() {
  while (true) {
    const { payload, responseCallback } = yield take(GET_AREA_BUILDING.REQUEST);
    try {
      const url = {
        ...GET_STATES_AREA_URL,
        route: `${GET_AREA_BUILDING_URL.route}/${payload.areaId}`
      };
      const response = yield call( callRequest, url, {}, "", {}, ApiSauce );
      if (response && response.length > 0) {
        if (responseCallback) responseCallback(response, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        Util.DialogAlert("No building available for selected area");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* carMaker() {
  while (true) {
    const { responseCallback } = yield take(GET_CAR_MAKER.REQUEST);
    try {
      const response = yield call( callRequest, GET_CAR_MAKER_URL, {}, "", {}, ApiSauce );
      if (response && response.length > 0) {
        if (responseCallback) responseCallback(response, null);
      } else {
        if (responseCallback) responseCallback(false, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* carModel() {
  while (true) {
    const { payload, responseCallback } = yield take(GET_CAR_MODEL.REQUEST);
    try {
      const url = {
        ...GET_CAR_MODEL_URL,
        route: `${GET_CAR_MODEL_URL.route}?make_id=${payload.makerId}`
      };
      const response = yield call( callRequest, url, {}, "", {}, ApiSauce );
      if (response && response.length > 0) {
        if (responseCallback) responseCallback(response, null);
      } else {
        if (responseCallback) responseCallback(false, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* addCar() {
  while (true) {
    const { addCarFormData, responseCallback } = yield take(ADD_NEW_CAR.REQUEST);
    try {
      let response = yield fetch(`${BASE_URL}${ADD_CAR_URL.route}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: Util.getCurrentUserAccessToken()
        },
        body: addCarFormData
      });
      const responseJson = yield response.json();
      // const response = yield call(UploadNewCar, addCarFormData);//callRequest, ADD_CAR_URL, data, "", {}, ApiSauce );
      if (responseJson.status==1) {
        if (responseCallback) responseCallback(responseJson.data, null);
      } else {
        Util.DialogAlert(responseJson.message)
      }
    } catch (err) {
      yield put(addCarFailure(err.data))
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}
// const response = yield https://medium.com/swlh/asynchronous-with-redux-sagas-b43c9630f218call(UploadNewCar, addCarFormData);//callRequest, ADD_CAR_URL, data, "", {}, ApiSauce );

async function UploadNewCar(formData) {
  try {
    let response = await fetch(`${BASE_URL}${ADD_CAR_URL.route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: Util.getCurrentUserAccessToken()
      },
      body: formData
    });
    const responseJson = await response.json();
    return responseJson;
  } catch(error) {
    return error;
  }
}

function* getCars() {
  while (true) {
    const { responseCallback } = yield take(GET_CARS.REQUEST);
    try {
      const response = yield call( callRequest, GET_CARS_URL, {}, "", {}, ApiSauce );
      if (response.length == 0 ) {
        if (responseCallback) responseCallback([], null);
      }
      if (response.length > 0 ) {
        if (responseCallback) responseCallback(response, null);
        yield put(getCarsSuccess(response));
      } else {
        // Util.DialogAlert(response.message)
        if (responseCallback) responseCallback(null, null);
        yield put(getCarsFailure());
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
      yield put(getCarsFailure());
    }
  }
}

function* deleteCar() {
  while (true) {
    const { payload, responseCallback } = yield take(DELETE_CAR.REQUEST);
    try {
      const url = {
        ...DELETE_CAR_URL,
        route: `${DELETE_CAR_URL.route}/${payload.carId}`
      };
      const response = yield call( callRequest, url, payload, "", {}, ApiSauce );
      if (response.status == 1 ) {
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

export default function* root() {
  yield fork(carModel);
  yield fork(getStates);
  yield fork(statesArea);
  yield fork(areaBuilding);
  yield fork(carMaker);
  yield fork(addCar);
  yield fork(getCars);
  yield fork(deleteCar);
}
