import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_ALL_ACTIVITIES,
  CREATE_ACTIVITY,
  GET_ALL_PACKAGES,
  ADD_ACTIVITY_PACKAGES,
  GET_CART_ITEMS,
  ACTIVITY_BOOKING_DATE,
  APPLY_VOUCHER_CODE,
  CHECKOUT,
  UPDATE_CART,
  REMOVE_CART
  //GET_CLASS_TYPES,
  //CREATE_CARD
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getAllActivitiesSuccess,
  createActivitySuccess,
  getAllPackgesSuccess,
  createActivityPackageSuccess,
  getCartItemsSuccess,
  bookingDateSuccess,
  applyVoucerSuccess,
  checkoutSuccess,
  updateCardSuccess,
  removeCartSuccess
 //getClassTypesSucces
} from "../actions/ActivitiesAction";
import {
    //CREATE_CARD as CREATE_CARD_URL,
    GET_ALL_ACTIVITIES as GET_ALL_ACTIVITIES_URL,
    CREATE_ACTIVITY as CREATE_ACTIVITY_URL,
    GET_ALL_PACKAGES as GET_VALUE_PACKAGES_URL,
    ADD_ACTIVITY_PACKAGES as ADD_ACTIVITY_PACKAGES_URL,
    GET_CART_ITEMS_ROUTE as GET_CART_ITEMS_ROUTE_URL,  
    GET_BOOKING_TIME_SLOTS as GET_BOOKING_TIME_SLOTS_URL,
    APPLY_VOUCER as APPLY_VOUCER_URL,
    CHECKOUT as CHECKOUT_URL,
    UPDATE_CART as UPDATE_CART_URL,
    REMOVE_CART as REMOVE_CART_URL,
    //GET_CLASS_TYPES as GET_CLASS_TYPES_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";
// import { getFilterDates } from "../helpers/classesHelper";

function alert(message, type = "error") {
    setTimeout(() => {
      Util.topAlert(message, type);
    }, SAGA_ALERT_TIMEOUT);
  }

function* getActivities() {
    while (true) {
      const { responseCallback } = yield take(GET_ALL_ACTIVITIES.REQUEST);
      
      try {
        const response = yield call(
          callRequest,
          GET_ALL_ACTIVITIES_URL,
          {},
          "",
          {},
          ApiSauce
        );
        // console.log(response)
        if (response.status==1) {
          if (responseCallback) responseCallback(response.data);
          yield put(getAllActivitiesSuccess(response.data));
        } else {
          alert("Something went wrong");
        }
      } catch (err) {
        if (responseCallback) responseCallback(null, err);
        alert(Util.getErrorText(err.error));
      }
    }
  }

  function* createActivity() {
    while (true) {
      const { payload, responseCallback } = yield take(CREATE_ACTIVITY.REQUEST);
      
      try {
        const response = yield call(
          callRequest,
          CREATE_ACTIVITY_URL,
          payload,
          "",
          {},
          ApiSauce
        );
        if (response.status==1) {
        
          if (responseCallback) responseCallback(response.data, null);
          yield put( createActivitySuccess(response.data));
        } else {
         
          alert("Something went wrong");
        }
      } catch (err) {
        if (responseCallback) responseCallback(null, err);
        alert(Util.getErrorText(err.error));
      //  console.log(err,"error")
      }
    }
  }

  function* createActivityPackage() {
    while (true) {
      const { payload, responseCallback } = yield take(ADD_ACTIVITY_PACKAGES.REQUEST);
      try {
        const response = yield call(
          callRequest,
          ADD_ACTIVITY_PACKAGES_URL,
          payload,
          "",
          {},
          ApiSauce
        );
        if (response.status==1) {
          if (responseCallback) responseCallback(response.data, null);
          yield put( createActivityPackageSuccess(response.data));
        } else {
          alert("Something went wrong");
        }
      } catch (err) {
        if (responseCallback) responseCallback(null, err);
        alert(Util.getErrorText(err.error));
      }
    }
  }

  function* getBookingDateTimeSlot() {
    while (true) {
      const { payload, responseCallback } = yield take(ACTIVITY_BOOKING_DATE.REQUEST);
      try {
        const response = yield call(
          callRequest,
          GET_BOOKING_TIME_SLOTS_URL,
          payload,
          "",
          {},
          ApiSauce
        );
        if (response.status==1) {
          if (responseCallback) responseCallback(response.data, null);
          yield put( bookingDateSuccess(response.data));
        } else alert("Something went wrong");
      } catch (err) {
        if (responseCallback) responseCallback(null, err);
        Util.getErrorText(err.error);
      }
    }
  }

  function* getValuePackges() {
    while(true) {
      const { payload, responseCallback } = yield take(GET_ALL_PACKAGES.REQUEST)
      try {
        const response = yield call(
          callRequest,
          GET_VALUE_PACKAGES_URL,
          {},
          "",
          {},
          ApiSauce
        );
        if (response.status==1) {
        
          if (responseCallback) responseCallback(response.data, null);
          yield put( getAllPackgesSuccess(response.data));
        } else {
         
          alert("Something went wrong");
        }
      } catch (err) {
        if (responseCallback) responseCallback(null, err);
        alert(Util.getErrorText(err.error));
      //  console.log(err,"error")
      }
    }
  }

  function* getCartItems() {
    while(true) {
      const { responseCallback } = yield take(GET_CART_ITEMS.REQUEST)
      try {
        const response = yield call(
          callRequest,
          GET_CART_ITEMS_ROUTE_URL,
          {},
          "",
          {},
          ApiSauce
        );
        if (response.status==1) {
          if (responseCallback) responseCallback(response.data, null);
          yield put( getCartItemsSuccess(response.data));
        } else {
          alert("Something went wrong");
        }
      } catch (err) {
        if (responseCallback) responseCallback(null, err);
        alert(Util.getErrorText(err.error));
      }
    }
  }

  function* applyVoucher() {
    while (true) {
      const { payload, responseCallback } = yield take(APPLY_VOUCHER_CODE.REQUEST);
      try {
        const response = yield call(
          callRequest,
          APPLY_VOUCER_URL,
          payload,
          "",
          {},
          ApiSauce
        );
        if (response.status==1) {
          if (responseCallback) responseCallback(response.data, null);
          yield put( applyVoucerSuccess(response.data));
        } else {
          alert("Something went wrong");
        }
      } catch (err) {
        if (responseCallback) responseCallback(null, err);
        alert(Util.getErrorText(err.error));
      }
    }
  }

  function* checkout() {
    while (true) {
      const { payload, responseCallback } = yield take(CHECKOUT.REQUEST);
      try {
        const response = yield call(
          callRequest,
          CHECKOUT_URL,
          payload,
          "",
          {},
          ApiSauce
        );
        if (response.status==1) {
          if (responseCallback) responseCallback(response.booking, null);
          yield put( checkoutSuccess(response.booking));
        } else {
          alert("Something went wrong");
        }
      } catch (err) {
        if (responseCallback) responseCallback(null, err);
        alert(Util.getErrorText(err.error));
      }
    }
  }

    function* updateCart() {
      while (true) {
        const { payload, responseCallback } = yield take(UPDATE_CART.REQUEST);
        try {
          const response = yield call(
            callRequest,
            UPDATE_CART_URL,
            payload,
            "",
            {},
            ApiSauce
          );
          if (response.status==1) {
            if (responseCallback) responseCallback(response.data, null);
            yield put( updateCardSuccess(response.data));
          } else {
            alert("Something went wrong");
          }
        } catch (err) {
          if (responseCallback) responseCallback(null, err);
          alert(Util.getErrorText(err.error));
        }
      }
    }

    function* removeCart() {
      while (true) {
        const { payload, responseCallback } = yield take(REMOVE_CART.REQUEST);
        try {
          const response = yield call(
            callRequest,
            REMOVE_CART_URL,
            payload,
            "",
            {},
            ApiSauce
          );
          if (response.status==1) {
            if (responseCallback) responseCallback(response.data, null);
            yield put( removeCartSuccess(response.data));
          } else {
            alert("Something went wrong");
          }
        } catch (err) {
          if (responseCallback) responseCallback(null, err);
          alert(Util.getErrorText(err.error));
        }
      }
    }

  export default function* root() {
    yield fork(getActivities);
    yield fork(createActivity);
    yield fork(getValuePackges);
    yield fork(createActivityPackage);
    yield fork(getCartItems);
    yield fork(getBookingDateTimeSlot);
    yield fork(applyVoucher);
    yield fork(checkout);
    yield fork(updateCart);
    yield fork(removeCart);
  }