// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
    GET_CARS,
    ADD_NEW_CAR,
    CLEAR_CAR_ERROR,
    ADD_CAR_IMAGES,
    CLEAR_CAR_IMAGES
} from "../actions/ActionTypes";

const initialState = Immutable({
    allCars: [],
    carError: null,
    loading: false,
    carImages: []
});

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_CARS.REQUEST: {
        return Immutable.merge(state, {
          loading: true
        });
      }
      case GET_CARS.SUCCESS: {
        return Immutable.merge(state, {
          allCars: action.data,
          loading: false
        });
      }
      case GET_CARS.FAILURE: {
        return Immutable.merge(state, {
          loading: false
        });
      }
      case ADD_NEW_CAR.FAILURE: {
        return {
          carError: action.error
        };
      }
      case CLEAR_CAR_ERROR: {
        return {
          ...state,
          carError: null
        };
      }
      case ADD_CAR_IMAGES: {
        // if( state.carImages.length < 2 ) {
        // }
        const imageData = {...action.image, uri: action.image.path }
        state.carImages.unshift(imageData)
        return {
          ...state,
          carImages: state.carImages
        };
      }
      case CLEAR_CAR_IMAGES: {
        return {
          ...state,
          carImages: []
        };
      }
      default:
      return state;
    }
};
