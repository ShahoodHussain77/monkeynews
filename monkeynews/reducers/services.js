// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  GET_SERVICES,
  GET_SERVICES_PACKAGE,
  SERVICE_SELECTION,
  CLEAR_SELECTION,
  UPDATE_PRICE,
  UPDATE_ON_DEMAND_PRICE,
  GET_TOTAL_CARE_PACKAGE,
  MY_SUBSCRIPTION,
  CLEAR_PACKAGES,
  UPDATE_BOOKING_DATE,
  TOTAL_CARE_PACKAGE
} from "../actions/ActionTypes";

const initialState = Immutable({
  services: [],
  total_care: [],
  maintenance: {},
  car_wash: {},
  tyre_service: {},
  battery_service: {},
  packages: [],
  plans: [],
  serviceSelectionData: null,
  total_price: null,
  my_subscription: {},
  total_care_selection: null
});

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_SERVICES.SUCCESS: {
        return Immutable.merge(state, {
          services: action.services
        });
      }
      case GET_SERVICES_PACKAGE.SUCCESS: {
        return Immutable.merge(state, {
          packages: action.packages,
          plans: action.plans
        });
      }
      case GET_TOTAL_CARE_PACKAGE.SUCCESS: {
        return Immutable.merge(state, {
          total_care: action.packages,
        });
      }
      case SERVICE_SELECTION.REQUEST: {
        return Immutable.merge(state, {
          serviceSelectionData: {
            ...state.serviceSelectionData,
            ...action.payload
          }
        });
      }
      case CLEAR_SELECTION.REQUEST: {
        return Immutable.merge(state, {
          serviceSelectionData: null
        });
      }
      case UPDATE_PRICE: {
        let total_price = null;
        const {months, washes} = state.serviceSelectionData;
        if( washes && washes.washes_number && washes.price) {
          const washNumber = parseFloat(washes.washes_number);
          const washPrice = parseFloat(washes.price);
          total_price = washNumber * washPrice;
        }
        if( months && months.key && months.key.toLowerCase().match("subscription") ) {
          const totalMonths = parseFloat(months.washes_number);
          total_price = total_price * (totalMonths * 4);
        } else if( months && months.name ) {
          const totalMonths = parseFloat(months.name);
          total_price = total_price * (totalMonths * 4);
        }
        return Immutable.merge(state, {
          serviceSelectionData: {
            ...state.serviceSelectionData,
            total_price
          }
        });
      }
      case UPDATE_ON_DEMAND_PRICE: {
        const {plan_price} = state.serviceSelectionData;
        return Immutable.merge(state, {
          serviceSelectionData: {
            ...state.serviceSelectionData,
            total_price: plan_price
          }
        });
      }
      case MY_SUBSCRIPTION.SUCCESS: {
        return Immutable.merge(state, {
          my_subscription: action.payload
        });
      }
      case CLEAR_PACKAGES: {
        return Immutable.merge(state, {
          packages: []
        });
      }
      case UPDATE_BOOKING_DATE: {
        return Immutable.merge(state, {
          serviceSelectionData: {
            ...state.serviceSelectionData,
            booking_date: action.date
          }
        });
      }
      case TOTAL_CARE_PACKAGE: {
        return {
          ...state,
          total_care_selection: action.totalCarePackage
        }
      }
      default:
      return state;
    }
};
