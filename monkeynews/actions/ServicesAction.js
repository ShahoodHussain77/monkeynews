import {
    GET_SERVICES,
    GET_SERVICES_PACKAGE,
    CLEAR_SELECTION,
    SERVICE_SELECTION,
    SUBSCRIBE_SERVICE,
    MY_SUBSCRIPTION,
    UPDATE_PRICE,
    UPDATE_ON_DEMAND_PRICE,
    GET_TOTAL_CARE_PACKAGE,
    CLEAR_PACKAGES,
    PREPARING_SUBSCRIPTION,
    UPDATE_BOOKING_DATE,
    GET_QUOTATION,
    TOTAL_CARE_PACKAGE
} from "./ActionTypes";


export function getServicesRequest(responseCallback) {
    return {
        responseCallback,
        type: GET_SERVICES.REQUEST
    };
}

export function getServicesSuccess(services) {
    return {
        services,
        type: GET_SERVICES.SUCCESS
    };
}

export function getServicePackageRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_SERVICES_PACKAGE.REQUEST
    };
}

export function getServicePackageSuccess(packages, plans) {
    return {
        packages,
        plans,
        type: GET_SERVICES_PACKAGE.SUCCESS
    };
}

export function getTotalCarePackageRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_TOTAL_CARE_PACKAGE.REQUEST
    };
}

export function getTotalCarePackageSuccess(packages) {
    return {
        packages,
        type: GET_TOTAL_CARE_PACKAGE.SUCCESS
    };
}

export function serviceSelectionRequest(payload) {
    return {
        payload,
        type: SERVICE_SELECTION.REQUEST
    };
}

export function clearSelectionRequest() {
    return {
        type: CLEAR_SELECTION.REQUEST
    };
}

export function preparingSubscriptionRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: PREPARING_SUBSCRIPTION.REQUEST
    };
}

export function subscribeServiceRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: SUBSCRIBE_SERVICE.REQUEST
    };
}

export function getQuotationRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_QUOTATION
    };
}

export function subscriptionRequest(responseCallback) {
    return {
        responseCallback,
        type: MY_SUBSCRIPTION.REQUEST
    };
}

export function subscriptionSuccess(payload) {
    return {
        payload,
        type: MY_SUBSCRIPTION.SUCCESS
    };
}

export function updatePrice() {
    return {
        type: UPDATE_PRICE
    };
}

export function updateOnDemandPrice() {
    return {
        type: UPDATE_ON_DEMAND_PRICE
    };
}

export function clearPackages() {
    return {
        type: CLEAR_PACKAGES
    };
}

export function updateBookingDate(date) {
    return {
        date,
        type: UPDATE_BOOKING_DATE
    };
}

export function totalCareData(totalCarePackage) {
    return {
        totalCarePackage,
        type: TOTAL_CARE_PACKAGE
    };
}
