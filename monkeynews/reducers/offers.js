// @flow
import Immutable from "seamless-immutable";
import {
  GET_OFFERS,
  APPLY_OFFER,
  CLEAR_OFFER,
  GET_NOTIFICATIONS,
  READ_NOTIFICATIONS,
  READ_OFFERS
} from "../actions/ActionTypes";

const initialState = Immutable({
    offers: [],
    discountedData: null,
    showOfferBadge: false,
    notifications: [],
    notificationsBadgeCounter: null,
    offerBadgeNotification: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_OFFERS.REQUEST: {
            return Immutable.merge(state, {
                loading: true
            });
        }
        case GET_OFFERS.SUCCESS: {
            let showIndicator = state.offerBadgeNotification;
            if( state.offers.length < action.offers.length ) {
                showIndicator = true;;
            }
            return Immutable.merge(state, {
                offers: action.offers,
                loading: false,
                offerBadgeNotification: showIndicator
            });
        }
        case GET_OFFERS.FAILURE: {
            return Immutable.merge(state, {
                offers: [],
                loading: false
            });
        }
        case READ_OFFERS: {
            return Immutable.merge(state, {
                offerBadgeNotification: false
            });
        }
        case APPLY_OFFER.REQUEST: {
            return Immutable.merge(state, {
                offerLoading: true
            });
        }
        case APPLY_OFFER.SUCCESS: {
            return Immutable.merge(state, {
                discountedData: action.offer,
                offerLoading: false,
            });
        }
        case APPLY_OFFER.FAILURE: {
            return Immutable.merge(state, {
                offerLoading: false,
            });
        }
        case CLEAR_OFFER: {
            return Immutable.merge(state, {
                discountedData: null,
            });
        }
        case GET_NOTIFICATIONS.SUCCESS: {
            let count = state.notificationsBadgeCounter;
            if( state.notifications.length < action.data.length ) {
                count = action.data.length - state.notifications.length;
            }
            return Immutable.merge(state, {
                notifications: action.data,
                notificationsBadgeCounter: count,
            });
        }
        case READ_NOTIFICATIONS: {
            return Immutable.merge(state, {
                notificationsBadgeCounter: null,
            });
        }
        case "UPDATE_OFFER_BADGE": {
            return Immutable.merge(state, {
                notificationsBadgeCounter: true,
            });
        }
        default:
            return state;
    }
};
