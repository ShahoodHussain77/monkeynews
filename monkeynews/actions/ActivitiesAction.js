// @flow

import { GET_ALL_ACTIVITIES,CREATE_ACTIVITY, GET_ALL_PACKAGES, ADD_ACTIVITY_PACKAGES, GET_CART_ITEMS, ACTIVITY_BOOKING_DATE, APPLY_VOUCHER_CODE, CHECKOUT, CLEAR_CHECKOUT_DATA, UPDATE_CART, REMOVE_CART} from "./ActionTypes";

export function finishCheckoutRequest(responseCallback) {
  return {
    responseCallback,
    type: CLEAR_CHECKOUT_DATA.SUCCESS
  };
}

export function getAllActivitiesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ALL_ACTIVITIES.REQUEST
  };
}

export function getAllActivitiesSuccess(data: Object) {
  return {
    data,
    type: GET_ALL_ACTIVITIES.SUCCESS
  };
}

export function createActivityRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_ACTIVITY.REQUEST
  };
}

export function createActivitySuccess(data) {
  return {
    selectedActivity: data,
    type: CREATE_ACTIVITY.SUCCESS
  };
}

export function bookingDateRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ACTIVITY_BOOKING_DATE.REQUEST
  };
}

export function bookingDateSuccess(data) {
  return {
    bookingTimeSlots: data,
    type: ACTIVITY_BOOKING_DATE.SUCCESS
  };
}

export function getClassTypesRequest( responseCallback) {
  return {
    responseCallback,
    type: GET_CLASS_TYPES.REQUEST
  };
}

export function getClassTypesSucces(data: Object) {
  return {
    data,
    type: GET_CLASS_TYPES.SUCCESS
  };
}

export function getAllPackgesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ALL_PACKAGES.REQUEST
  }
}

export function getAllPackgesSuccess(data: Object) {
  return {
    packages: data,
    type: GET_ALL_PACKAGES.SUCCESS
  };
}

export function createActivityPackageRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_ACTIVITY_PACKAGES.REQUEST
  };
}

export function createActivityPackageSuccess(data) {
  return {
    activityPackages: data,
    type: ADD_ACTIVITY_PACKAGES.SUCCESS
  };
}

export function getCartItemsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_CART_ITEMS.REQUEST
  }
}

export function getCartItemsSuccess(data: Object) {
  return {
    cartItems: data,
    type: GET_CART_ITEMS.SUCCESS
  };
}

export function applyVoucerRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: APPLY_VOUCHER_CODE.REQUEST
  };
}

export function applyVoucerSuccess(data: Object) {
  return {
    voucherDetails: data,
    type: APPLY_VOUCHER_CODE.SUCCESS
  };
}

export function checkoutRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHECKOUT.REQUEST
  };
}

export function checkoutSuccess(data) {
  return {
    checkoutData: data,
    type: APPLY_VOUCHER_CODE.SUCCESS
  };
}

export function updateCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_CART.REQUEST
  };
}
  
export function updateCardSuccess(data) {
  return {
    updateCard: data,
    type: UPDATE_CART.SUCCESS
  };
}

export function removeCartRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REMOVE_CART.REQUEST
  };
}

export function removeCartSuccess(data) {
  return {
    remove_cart: data,
    type: REMOVE_CART.SUCCESS
  };
}