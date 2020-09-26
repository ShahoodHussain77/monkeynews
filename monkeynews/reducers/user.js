// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  LOGIN,
  UPDATE_USER_PROFILE,
  USER_UPDATE_PASSWORD,
  REGISTER_USER,
  VERIFY_USER,
  LOGOUT,
  PROFILE,
  EDIT_PROFILE,
  LOADER_ACTION,
  MESSAGE_REQUEST,
  TUTORIALS_FINISH,
  CLEAR_ERROR,
  CLEAR_PROFILE_ERROR,
  SHOW_LOADING,
  RESEND_VERIFICATION_CODE,
  COMPLETE_PROFILE,
  RESET_PASSWORD,
  CLEAR_USER_TEMP_DATA,
  CHANGE_PASSWORD
} from "../actions/ActionTypes";

const initialState = Immutable({
  userData: null,
  access_token: null,
  loading: false,
  registerError: null,
  finish_tutorials: false,
  tempUserId: null,
  tempRegisterationData: null,
  tempToken: null,
  shouldAnimate: true,
  resetingPassword: false,
  isForgotPassword: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NAVIGATION": {
      return {
        ...state,
        access_token: true
      }
    }
    case LOGOUT.FAILURE: {
      return Immutable.merge(state, {
        loading: false
      });
    }
    case SHOW_LOADING: {
      return Immutable.merge(state, {
        loading: true
      });
    }
    case CHANGE_PASSWORD.REQUEST: {
      return Immutable.merge(state, { loading: true });
    }
    case CHANGE_PASSWORD.SUCCESS: {
      return Immutable.merge(state, { loading: false });
    }
    case CHANGE_PASSWORD.FAILURE: {
      return Immutable.merge(state, { loading: false });
    }
    case REGISTER_USER.REQUEST: {
      return Immutable.merge(state, {
        loading: true
      });
    }
    case REGISTER_USER.SUCCESS: {
      return Immutable.merge(state, {
        tempUserId: action.data,
        loading: false
      });
    }
    case REGISTER_USER.FAILURE: {
      return Immutable.merge(state, {
        loading: false
      });
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        registerError: null
      };
    }
    case VERIFY_USER.SUCCESS: {
      return Immutable.merge(state, {
        tempToken: action.data.user_authentication,
        tempRegisterationData: action.data,
        resetingPassword: action.resetPassword,
        loading: false
      });
    }
    case VERIFY_USER.FAILURE: {
      return Immutable.merge(state, {
        tempToken: null,
        loading: false
      });
    }
    case RESEND_VERIFICATION_CODE.REQUEST: {
      return Immutable.merge(state, {
        loading: true,
        shouldAnimate: false
      });
    }
    case RESEND_VERIFICATION_CODE.FAILURE: {
      return Immutable.merge(state, {
        loading: false,
        shouldAnimate: true
      });
    }
    case LOGIN.SUCCESS: {
      return Immutable.merge(state, {
        userData: action.data,
        access_token: action.access_token,
        loading: false
      });
    }
    case LOGIN.FAILURE: {
      return Immutable.merge(state, {
        loading: false
      });
    }
    case COMPLETE_PROFILE.FAILURE: {
      return Immutable.merge(state, {
        loading: false
      });
    }
    case COMPLETE_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        userData: action.data,
        access_token: action.access_token,
        loading: false
      });
    }
    case RESET_PASSWORD.FAILURE: {
      return Immutable.merge(state, {
        loading: false
      });
    }
    case RESET_PASSWORD.SUCCESS: {
      return Immutable.merge(state, {
        tempUserId: action.data.user_id,
        isForgotPassword: action.isResetPassword,
        loading: false
      });
    }
    case CLEAR_USER_TEMP_DATA: {
      return Immutable.merge(state, initialState);
    }
    case PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        userData: action.data,
      });
    }
    case EDIT_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        userData: action.data,
      });
    }
    case EDIT_PROFILE.FAILURE: {
      return Immutable.merge(state, {
        updateError: action.error,
      });
    }
    case CLEAR_PROFILE_ERROR: {
      return Immutable.merge(state, {
        updateError: null,
      });
    }
    case LOADER_ACTION.REQUEST: {
      return Immutable.merge(state, {
        loading: true,
      });
    }
    case LOADER_ACTION.SUCCESS: {
      return Immutable.merge(state, {
        loading: false,
      });
    }
    case MESSAGE_REQUEST.SUCCESS: {
      return Immutable.merge(state, {
        messages: action.data,
      });
    }
    case TUTORIALS_FINISH: {
      return Immutable.merge(state, {
        finish_tutorials: true 
      });
    }
    // case USER_UPDATE_PASSWORD.SUCCESS: {

    //   let newToken = _.cloneDeep(state.access_token);
    //   newToken = action.token;

    //   return Immutable.merge(state, {
    //     access_token: newToken
    //   });
    // }
    case UPDATE_USER_PROFILE.SUCCESS: {
       let tempData = _.cloneDeep(state.data);

       tempData = action.data;

      return Immutable.merge(state, {
        data: tempData
      });
    }
    // case LOGOUT.SUCCESS:
    //   return initialState;
    default:
      return state;
  }
};
