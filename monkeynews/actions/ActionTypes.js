// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const CANCEL = "CANCEL";
const FAILURE = "FAILURE";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}
// USER ACTIONS
export const NETWORK_INFO = "NETWORK_INFO";
export const SHOW_LOADING = "SHOW_LOADING";
export const APP_INFO_SHOW_LOADING = "APP_INFO_SHOW_LOADING";
export const CLEAR_USER_TEMP_DATA = "CLEAR_USER_TEMP_DATA";

export const REGISTER_USER = createRequestTypes("USER_SIGNUP");
export const CLEAR_ERROR = "CLEAR_ERROR";
export const VERIFY_USER = createRequestTypes("VERIFY_USER");
export const VERIFY_PASSWORD_OTP = createRequestTypes("VERIFY_PASSWORD_OTP");
export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");
export const RESEND_VERIFICATION_CODE = createRequestTypes("RESEND_VERIFICATION_CODE");
export const UPDATE_PASSWORD = createRequestTypes("UPDATE_PASSWORD");
export const LOGIN = createRequestTypes("LOGIN");
export const COMPLETE_PROFILE = createRequestTypes("COMPLETE_PROFILE");
export const RESET_PASSWORD = createRequestTypes("RESET_PASSWORD");
export const LOGOUT = createRequestTypes("LOGOUT");
export const PROFILE = createRequestTypes("USER_PROFILE");
export const EDIT_PROFILE = createRequestTypes("EDIT_PROFILE");
export const CLEAR_PROFILE_ERROR = "CLEAR_PROFILE_ERROR";
export const MESSAGE_REQUEST = createRequestTypes("MESSAGE_REQUEST");
export const TUTORIALS_FINISH = "TUTORIALS_FINISH";
export const LOADER_ACTION = createRequestTypes("LOADER_ACTION");
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");

// CAR ACTIONS 
export const GET_STATES = createRequestTypes("GET_STATES");
export const GET_STATES_AREA = createRequestTypes("GET_STATES_AREA");
export const GET_AREA_BUILDING = createRequestTypes("GET_AREA_BUILDING");
export const GET_CAR_MAKER = createRequestTypes("GET_CAR_MAKER");
export const GET_CAR_MODEL = createRequestTypes("GET_CAR_MODEL");
export const ADD_NEW_CAR = createRequestTypes("ADD_NEW_CAR");
export const GET_CARS = createRequestTypes("GET_CARS");
export const DELETE_CAR = createRequestTypes("DELETE_CAR");
export const CLEAR_CAR_ERROR = "CLEAR_CAR_ERROR";
export const ADD_CAR_IMAGES = "ADD_CAR_IMAGES";
export const CLEAR_CAR_IMAGES = "CLEAR_CAR_IMAGES";

// SERVICES ACTIONs
export const GET_SERVICES = createRequestTypes("GET_SERVICES");
export const GET_SERVICES_PACKAGE = createRequestTypes("GET_SERVICES_PACKAGE");
export const GET_TOTAL_CARE_PACKAGE = createRequestTypes("GET_TOTAL_CARE_PACKAGE");
export const CLEAR_SELECTION = createRequestTypes("CLEAR_SELECTION");
export const SERVICE_SELECTION = createRequestTypes("SERVICE_SELECTION");
export const SUBSCRIBE_SERVICE = createRequestTypes("SUBSCRIBE_SERVICE");
export const GET_QUOTATION = "GET_QUOTATION";
export const MY_SUBSCRIPTION = createRequestTypes("MY_SUBSCRIPTION");
export const UPDATE_PRICE = "UPDATE_PRICE";
export const UPDATE_ON_DEMAND_PRICE = "UPDATE_ON_DEMAND_PRICE";
export const CLEAR_PACKAGES = "CLEAR_PACKAGES";
export const UPDATE_BOOKING_DATE = "UPDATE_BOOKING_DATE";
export const TOTAL_CARE_PACKAGE = "TOTAL_CARE_PACKAGE";
export const PREPARING_SUBSCRIPTION = createRequestTypes("PREPARING_SUBSCRIPTION");

// STATUS ACTIONS
export const CAR_STATUS = createRequestTypes("CAR_STATUS");
export const GET_CAR_STATUS = createRequestTypes("GET_CAR_STATUS");
export const SELECT_CAR_STATUS = "SELECT_CAR_STATUS";

// OFFERS ACTIONS
export const GET_OFFERS = createRequestTypes("GET_OFFERS");
export const APPLY_OFFER = createRequestTypes("APPLY_OFFER");
export const GET_NOTIFICATIONS = createRequestTypes("GET_NOTIFICATIONS");
export const READ_NOTIFICATIONS = "READ_NOTIFICATIONS";
export const READ_OFFERS = "READ_OFFERS";
export const CLEAR_OFFER = "CLEAR_OFFER"
export const COPY_OFFER = "COPY_OFFER";


export const UPDATE_USER_PROFILE = createRequestTypes("UPDATE_USER_PROFILE");
export const UPDATE_PROFILE = createRequestTypes("UPDATE_PROFILE");
export const EMPTY = createRequestTypes("EMPTY");
export const CLEAR_CHECKOUT_DATA=createRequestTypes("CLEAR_CHECKOUT_DATA");

// AppINFO Actions 
export const TERMS_AND_CONDITION = createRequestTypes("TERMS_AND_CONDITION");
export const ABOUT_US = createRequestTypes("ABOUT_US");
export const PRIVACY_POLICY = createRequestTypes("PRIVACY_POLICY");
export const FEED_BACK = createRequestTypes("FEED_BACK");

// ACTIVITIES ACTIONS 
export const GET_ALL_ACTIVITIES=createRequestTypes("GET_ALL_ACTIVITIES");
export const CREATE_ACTIVITY=createRequestTypes("CREATE_ACTIVITY");
export const ACTIVITY_BOOKING_DATE=createRequestTypes("ACTIVITY_BOOKING_DATE");
export const GET_CLASS_TYPES=createRequestTypes("GET_CLASS_TYPES");
export const GET_ALL_PACKAGES=createRequestTypes("GET_ALL_PACKAGES");
export const ADD_ACTIVITY_PACKAGES=createRequestTypes("ADD_ACTIVITY_PACKAGES");
// card Actions
export const CREATE_CARD=createRequestTypes("CREATE_CARD");
export const GET_ALL_CARDS=createRequestTypes("GET_ALL_CARDS");
export const GET_SEARCH_CARDS = createRequestTypes("GET_SEARCH_CARDS");
export const GET_CART_ITEMS=createRequestTypes("GET_CART_ITEMS");
export const APPLY_VOUCHER_CODE=createRequestTypes("APPLY_VOUCHER_CODE");
export const CHECKOUT=createRequestTypes("CHECKOUT");
export const UPDATE_CART = createRequestTypes("UPDATE_CART");
export const REMOVE_CART = createRequestTypes("REMOVE_CART");
//NotificationActions
export const GET_ALL_NOTIFICATIONS=createRequestTypes("GET_ALL_NOTIFICATIONS");

// Feeds Actions
export const GET_ALL_NEWS_FEEDS = createRequestTypes("GET_ALL_NEWS_FEEDS");
