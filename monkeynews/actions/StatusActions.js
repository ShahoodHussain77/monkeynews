import {
    CAR_STATUS,
    SELECT_CAR_STATUS,
    GET_CAR_STATUS
} from "./ActionTypes";

export function carStatusRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: CAR_STATUS.REQUEST
    };
}

export function getCarStatusRequest() {
    return {
        type: GET_CAR_STATUS.REQUEST
    };
}

export function allCarStatusSuccess(data) {
    return {
        data,
        type: GET_CAR_STATUS.SUCCESS
    };
}

export function carStatusSuccess(data, payload) {
    return {
        data,
        payload,
        type: CAR_STATUS.SUCCESS
    };
}

export function selectCarStatus() {
    return {
        type: SELECT_CAR_STATUS
    };
}

export function updateStatusNotification(reportObject) {
    const keys = Object.keys(reportObject);
    keys.map( key => {
        const singleReportData = Object.values(reportObject[key])
        singleReportData.map(singleReport => {
            if( singleReport.status == "3" ) {
                return {
                    showNotification: true,
                    type: "UPDATE_STATUS_NOTIFICATION"
                };
            }
        })
    })
    return {
        showNotification: true,
        type: "UPDATE_STATUS_NOTIFICATION"
    };
}
