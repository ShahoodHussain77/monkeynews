import { take, put, call, fork, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_CARDS,
  GET_SEARCH_CARDS
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
 getAllCardSuccess
} from "../actions/CardsActions";
import {
    GET_ALL_CARDS as GET_ALL_CARDS_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";
import { getFilterDates } from "../helpers/classesHelper";

function alert(message, type = "error") {
    setTimeout(() => {
      Util.topAlert(message, type);
    }, SAGA_ALERT_TIMEOUT);
  }
  function* getCards() {
    while (true) {
      const { payload, responseCallback } = yield take(GET_ALL_CARDS.REQUEST);
      try {
        const response = yield call(
          callRequest,
          GET_ALL_CARDS_URL,
          {},
          "",
          {},
          ApiSauce
        );
        console.log(response)
        if (response.success) {
          yield put(getAllCardSuccess(response.data, null));
          if (responseCallback) responseCallback(true, null);
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

  function* getSearchCards(action) {
    const { payload, responseCallback } = action;
    const parameters = `events?query${Util.generateGetParameter({
      limit: payload.limit,
      offset: payload.offset,
      query: payload.query
    })}`;
    try {
      const response = yield call(
        callRequest,
        GET_ALL_CARDS_URL,
        payload,
        parameters,
        {},
        ApiSauce
      );
      if (response.success) {
        yield put(getAllCardSuccess(response.data, null));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert("Something went wrong");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }

  export default function* root() {
    yield fork(getCards);
    yield takeLatest(GET_SEARCH_CARDS.REQUEST, getSearchCards);

  }