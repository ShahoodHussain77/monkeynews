import { fork } from "redux-saga/effects";
import user from "./user"; 
import appInfo from "./appInfo"
import activities from "./activities";
import cards from "./cards";
import addCar from "./add-car";
import services from "./services";
import status from "./status";
import offers from "./offers";
import feeds from "./feeds";

export default function* root() {
    yield fork(user);
    yield fork(appInfo);
    yield fork(feeds);
    yield fork(activities);
    yield fork(status);
    yield fork(cards);
    yield fork(addCar);
    yield fork(services);
    yield fork(offers);
}
