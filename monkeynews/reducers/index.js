import { combineReducers } from "redux";

import { LOGOUT } from "../actions/ActionTypes";

import user from "./user";
import appInfo from"./appInfo";
import feeds from"./feeds";

const appReducer = combineReducers({
  user,
  appInfo,
  feeds
})

export default (state, action) => {
  if (action.type === LOGOUT.SUCCESS) {
    state = { 
      appInfo: undefined,
      feeds: undefined,
      user: {
        finish_tutorials: state.user.finish_tutorials
      }
    }
  }
  return appReducer(state, action)
}
