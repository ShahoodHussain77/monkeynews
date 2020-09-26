import {
    GET_STATES,
    GET_STATES_AREA,
    GET_AREA_BUILDING,
    GET_CAR_MAKER,
    GET_CAR_MODEL,
    ADD_NEW_CAR,
    GET_CARS,
    DELETE_CAR,
    CLEAR_CAR_ERROR,
    ADD_CAR_IMAGES,
    CLEAR_CAR_IMAGES
} from "./ActionTypes";

import { Platform } from 'react-native';

import Util from "../util";

export function getStatesRequest(responseCallback) {
    return {
        responseCallback,
        type: GET_STATES.REQUEST
    };
}

export function getStatesAreaRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_STATES_AREA.REQUEST
    };
}

export function getAreaBuildingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_AREA_BUILDING.REQUEST
    };
}

export function getCarMakeRequest(responseCallback) {
    return {
        responseCallback,
        type: GET_CAR_MAKER.REQUEST
    };
}

export function getCarModelRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_CAR_MODEL.REQUEST
    };
}

export function getCarsRequest(responseCallback) {
    return {
        responseCallback,
        type: GET_CARS.REQUEST
    };
}

export function getCarsSuccess(data) {
    return {
        data,
        type: GET_CARS.SUCCESS
    };
}

export function getCarsFailure() {
    return {
        type: GET_CARS.FAILURE
    };
}

export function deleteCarRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: DELETE_CAR.REQUEST
    };
}

export function addCarRequest(payload, carImage, responseCallback) {
    let image = null;
    if( carImage && carImage.length > 0 ) {
        let image = {
            name: carImage[0].filename,
            type: carImage[0].meme,
            uri: Platform.OS === "android" ? carImage[0].uri : carImage[0].uri.replace("file://", "")
        }
    }
    if (payload.carTitle == null || payload.carTitle == "") {
        Util.DialogAlert("Enter Car Title");
        responseCallback(null);
        return { type: null };
    } else if (payload.selectedState == null) {
        Util.DialogAlert("Select emirate");
        responseCallback(null);
        return { type: null };
    } else if (payload.selectedArea == null) {
        Util.DialogAlert("Select area");
        responseCallback(null);
        return { type: null };
    } else if (payload.selectedBuilding == null) {
        Util.DialogAlert("Select building");
        responseCallback(null);
        return { type: null };
    } else if (payload.selectedMaker == null) {
        Util.DialogAlert("Select car maker");
        responseCallback(null);
        return { type: null };
    } else if (payload.selectedModel == null) {
        Util.DialogAlert("Select car model");
        responseCallback(null);
        return { type: null };
    }
    // else if( payload.engine == null || payload.engine == "" ) {
    //     Util.DialogAlert("Enter engine cc");
    //     responseCallback(null);
    //     return {type: null};
    // }
    else if (payload.plate == null || payload.plate == "") {
        Util.DialogAlert("Enter plate number");
        responseCallback(null);
        return { type: null };
    } else {
        let addCarFormData = new FormData();
        addCarFormData.append("title", payload.carTitle)
        addCarFormData.append("emirate_id", payload.selectedState.stateId)
        addCarFormData.append("area_id", payload.selectedArea.areaId)
        addCarFormData.append("building_id", payload.selectedBuilding.buildingId)
        addCarFormData.append("year", "2020")
        addCarFormData.append("no_plate", payload.plate)
        addCarFormData.append("make_id", payload.selectedMaker.makerId)
        addCarFormData.append("model_id", payload.selectedModel.modelId)
        addCarFormData.append("car_engine", "0")
        addCarFormData.append("id", payload.id)
        image && image.uri && addCarFormData.append("images", image)
        return {
            addCarFormData,
            responseCallback,
            type: ADD_NEW_CAR.REQUEST
        };
    }
}

export function addCarFailure(error) {
    return {
        error,
        type: ADD_NEW_CAR.FAILURE
    };
}

export function clearCarError() {
    return {
        type: CLEAR_CAR_ERROR
    };
}

export function addImageRequest(image) {
    return {
        image,
        type: ADD_CAR_IMAGES
    };
}

export function clearImage() {
    return {
        type: CLEAR_CAR_IMAGES
    };
}