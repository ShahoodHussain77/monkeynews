import _ from "lodash";
import Util from "../util";
export const BASE_URL = "https://appsstaging.com/appsnado/upyours/";
export const ASSETS_URL = "https://dev76.onlinetestingserver.com/";
export const API_TIMEOUT = 30000;
export const NEW_API_KEY = "1d399038bef14b0497d028fc27999696";

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: "Something went wrong, Please try again later",
  error: "Something went wrong, Please try again later"
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: "Please connect to the working Internet",
  error: "Please connect to the working Internet"
};

export const ERROR_TOKEN_EXPIRE = {
  message: "Session Expired, Please login again!",
  error: "Session Expired, Please login again!"
};

export const REQUEST_TYPE = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put"
};

// API USER ROUTES
export const MESSAGE_REQUEST_URL = {
  route: "popupmessages",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const SIGNUP_URL = {
  route: "signup",
  access_token_required: false,
  type: REQUEST_TYPE.POST
};
export const VERIFY_USER_URL = {
  route: "verification",
  access_token_required: false,
  type: REQUEST_TYPE.POST
};
export const RESEND_CODE_URL = {
  route: "verification/resend",
  access_token_required: false,
  type: REQUEST_TYPE.POST
};
export const COMPLETE_PROFILE_URL = {
  route: "profile/update",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const VERIFY_PASSWORD_OTP_URL = {
  route: "auth/forgot-password",
  access_token_required: false,
  type: REQUEST_TYPE.POST
};
export const FORGOT_PASSWORD_URL = {
  route: "password/reset",
  access_token_required: false,
  type: REQUEST_TYPE.POST
};
export const UPDATE_PASSWORD_URL = {
  route: "auth/update-password",
  access_token_required: false,
  type: REQUEST_TYPE.POST
}; 
export const LOGIN_URL = {
  route: "login",
  access_token_required: false,
  type: REQUEST_TYPE.POST
};
export const LOGOUT_URL = {
  route: "logout",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const PROFILE_URL = {
  route: "auth/profile",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const EDIT_PROFILE_URL = {
  route: "profile/edit",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const CHANGE_PASSWORD_URL = {
  route: "password/change",
  access_token_required: true,
  type: REQUEST_TYPE.POST
}; 


// add car routes
export const GET_STATES_URL = {
  route: "emirates",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const GET_STATES_AREA_URL = {
  route: "areas",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const GET_AREA_BUILDING_URL = {
  route: "buildings",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const GET_CAR_MAKER_URL = {
  route: "carmakes",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const GET_CAR_MODEL_URL = {
  route: "models",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const ADD_CAR_URL = {
  route: "car/add",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const GET_CARS_URL = {
  route: "user/cars",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const DELETE_CAR_URL = {
  route: "car/delete",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

// status routes 
export const CAR_STATUS_URL = {
  route: "car/status",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const GET_CAR_STATUS_URL = {
  route: "car/get-car-status",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};


// service routes
export const SERVICES_URL = {
  route: "services",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const SERVICE_PACKAGE_URL = {
  route: "packages",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const SUBSCRIBE_SERVICE_URL = {
  route: "booking/create",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const TEMP_BOOKING_URL = {
  route: "booking/temp-create",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const SUBSCRIPTION_URL = {
  route: "user/services",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};


// offers routes
export const OFFERS_URL = {
  route: "offers",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const APPLY_OFFER_URL = {
  route: "booking/offerapply",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const GET_NOTIFICATIONS_URL = {
  route: "notification/get-all",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};



export const UPDATE_USER_PROFILE = {
  route: "update-trainer-profile",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

// activities api
export const GET_ALL_ACTIVITIES = {
  route: "activities",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const CREATE_ACTIVITY = {
  route: "add-activity", //"create-activity",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const GET_ALL_PACKAGES = {
  route: "packages", //"create-activity",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const ADD_ACTIVITY_PACKAGES = {
  route: "add-inventory",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const GET_BOOKING_TIME_SLOTS = {
  route: "get-available-time-slots",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const GET_CLASS_TYPES = {
  route: "get-class-types",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
// card api
export const CREATE_CARD={
  route: "create-card",
  access_token_required: true,
  type: REQUEST_TYPE.POST
}
export const APPLY_VOUCER={
  route: "apply-coupon",
  access_token_required: true,
  type: REQUEST_TYPE.POST
}
export const GET_CART_ITEMS_ROUTE={
  route: "get-cart-items",
  access_token_required: true,
  type: REQUEST_TYPE.GET
}
export const CHECKOUT={
  route: "checkout",
  access_token_required: true,
  type: REQUEST_TYPE.POST
}
export const UPDATE_CART={
  route: "update-cart",
  access_token_required: true,
  type: REQUEST_TYPE.POST
}
export const REMOVE_CART={
  route: "remove-item",
  access_token_required: true,
  type: REQUEST_TYPE.POST
}
// ----appInfo //

export const FEED_BACK_URL= {
  route: "content/query",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const TERMS_AND_CONDITION = {
  route: "content",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const ABOUT_US = {
  route: "about",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const PRIVACY_POLICY = {
  route: "content",
  access_token_required: false,
  type: REQUEST_TYPE.GET
};
export const GET_ALL_NOTIFICATIONS={
  route: "all-notifications",
  access_token_required: true,
  type: REQUEST_TYPE.GET
}

// feeds routes
export const GET_ALL_NEWS_FEEDS_URL = {
  route: "feed",
  access_token_required: true,
  type: REQUEST_TYPE.GET
}


export const callRequest = function(
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL
) {
  // note, import of "ApiSause" has some errors, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `${_access_token}`
        }
      };
    }
  }

  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
