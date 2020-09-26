import { GET_SEARCH_CARDS,GET_ALL_CARDS} from "./ActionTypes";



export function getAllCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_ALL_CARDS.REQUEST
  };
}
export function getAllCardSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: GET_ALL_CARDS.SUCCESS
  };
}
export function getSearchCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SEARCH_CARDS.REQUEST
  };
}
export function getSearchCardSuccess(data, payload) {
  return {
    data,
    payload,
    type: GET_SEARCH_CARDS.SUCCESS
  };
}