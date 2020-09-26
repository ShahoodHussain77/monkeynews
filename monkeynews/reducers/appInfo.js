// @flow
import Immutable from "seamless-immutable";
import { TERMS_AND_CONDITION,PRIVACY_POLICY,ABOUT_US, APP_INFO_SHOW_LOADING, FEED_BACK } from "../actions/ActionTypes";

const initialState = Immutable({
  termsData: "",
  privacyData: "",
  aboutData: "",
  loading: false
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case APP_INFO_SHOW_LOADING:
      //@desc loading indicator function
      return Immutable.merge(state, {
        loading: action.payload.isLoading
      });
    case TERMS_AND_CONDITION.SUCCESS:
      return Immutable.merge(state, {
        termsData: action.data,
        loading: false
      });
    case ABOUT_US.SUCCESS:
      return Immutable.merge(state, {
        aboutData: action.data
      });
    case PRIVACY_POLICY.SUCCESS:
      return Immutable.merge(state, {
        privacyData: action.data,
        loading: false
      });
    case FEED_BACK.REQUEST:
      return Immutable.merge(state, {
        loading: true
      });
    case FEED_BACK.SUCCESS:
      return Immutable.merge(state, {
        loading: false
      });
    case FEED_BACK.FAILURE:
      return Immutable.merge(state, {
        loading: false
      });
    default:
      return state;
  }
};
