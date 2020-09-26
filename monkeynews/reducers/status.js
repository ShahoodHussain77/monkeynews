// @flow
import Immutable from "seamless-immutable";
import {
    CAR_STATUS,
    SELECT_CAR_STATUS,
    GET_CAR_STATUS
} from "../actions/ActionTypes";

const initialState = Immutable({
    car_status: null,
    selectedCarStatus: null,
    showStatusNotification: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case CAR_STATUS.SUCCESS: {
            return Immutable.merge(state, {
                car_status: action.data,
                selectedCarStatus: action.payload.car_id
            });
        }
        case SELECT_CAR_STATUS: {
            return Immutable.merge(state, {
                car_status: null,
                selectedCarStatus: null
            });
        }
        case GET_CAR_STATUS.SUCCESS: {
            return Immutable.merge(state, {
                showStatusNotification: action && action.data && action.data.status
            });
        }
        case "UPDATE_STATUS_NOTIFICATION": {
            return {
                ...state,
                showStatusNotification: action.showNotification
            }
        }
        default:
        return state;
    }
};
