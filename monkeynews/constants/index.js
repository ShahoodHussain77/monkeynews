export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;
// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = "";
export const APP_DOMAIN = "";
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;
export const POST_VIEW_TIMEOUT = 2000;
export const IMAGE_QUALITY = 1;
export const IMAGE_MAX_WIDTH = 720;
export const IMAGE_MAX_HEIGHT = 480;
export const IMAGE_COMPRESS_MAX_WIDTH = 720;
export const IMAGE_COMPRESS_MAX_HEIGHT = 480;
export const VERSES_OF_THE_DAY_LIMIT = 10;
export const IMAGE_COMPRESS_FORMAT = "JPEG";
export const ANDROID_NOTI_CHANNEL = "VeteranAppChanel";

// date time formats
export const DATE_FORMAT1 = "dddd, DD MMMM, YYYY";
export const DATE_FORMAT2 = "DD MMM YYYY";
export const DATE_FORMAT3 = "YYYY-MM-DD";
export const TIME_FORMAT1 = "hh:mm A";
export const TIME_FORMAT2 = "HH:mm ";

export const DATE_FORMAT_TIME1 = "Do | MMM | HH";
export const DATE_FORMAT4 = "dddd, DD MMMM YYYY";
export const DATE_FORMAT5 = "MMM DD, YYYY";

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  "Location permission required, please go to app settings to allow access";
export const INVALID_NAME_ERROR = "Invalid name";
export const INVALID_EMAIL_ERROR = "Invalid email";
export const INVALID_PASSWORD_ERROR = `Invalid password, at least ${PASSWORD_MIN_LENGTH} characters`;
export const INTERNET_ERROR = "Please connect to the working internet";
export const ARE_U_SURE = "Are you sure?";
export const WELCOME_NOTE = "Welcome to the Veteran App!";
export const PROFILE_UPDATE_SUCCESS = "Profile successfully updated!";
export const SESSION_EXPIRED_ERROR = "Session expired, Please login again";

// Message types
export const MESSAGE_TYPES = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success"
};

// File Types
export const FILE_TYPES = { VIDEO: "video", IMAGE: "image", AUDIO: "audi" };

// User Types
export const USER_TYPES = [
  {
    value: "Veteran",
    label: "Veteran"
  },
  {
    value: "Service Provider",
    label: "serviceProvider"
  }
];
export const weekdays = new Array(7);
weekdays[0] =  "Sun";
weekdays[1] = "Mon";
weekdays[2] = "Tue";
weekdays[3] = "Wed";
weekdays[4] = "Thu";
weekdays[5] = "Fri";
weekdays[6] = "Sat";

// Delta location

export const DELTA_LOCATION = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

