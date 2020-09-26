import {
    GET_OFFERS,
    APPLY_OFFER,
    CLEAR_OFFER,
    GET_NOTIFICATIONS,
    READ_NOTIFICATIONS,
    READ_OFFERS
} from "./ActionTypes";


export function getOffersRequest(responseCallback) {
    return {
        responseCallback,
        type: GET_OFFERS.REQUEST
    };
}

export function getOffersSuccess(offers) {
    return {
        offers,
        type: GET_OFFERS.SUCCESS
    };
}

export function getOffersFailure() {
    return {
        type: GET_OFFERS.FAILURE
    };
}

export function readOffers() {
    return {
        type: READ_OFFERS
    };
}

export function applyOfferRequest(offerData) {
    return {
        offerData,
        type: APPLY_OFFER.REQUEST
    };
}

export function applyOfferSuccess(offer) {
    return {
        offer,
        type: APPLY_OFFER.SUCCESS
    };
}

export function applyOfferFailure() {
    return {
        type: APPLY_OFFER.FAILURE
    };
}

export function clearOfferData() {
    return {
        type: CLEAR_OFFER
    };
}

export function updateOfferNotificationBadge() {
    return {
        // updateOfferBadge,
        type: "UPDATE_OFFER_BADGE"
    };
}

export function getNotificationsRequest() {
    return {
        type: GET_NOTIFICATIONS.REQUEST
    };
}

export function getNotificationsSuccess(data) {
    return {
        data,
        type: GET_NOTIFICATIONS.SUCCESS
    };
}

export function readNotifications() {
    return {
        type: READ_NOTIFICATIONS
    };
}
