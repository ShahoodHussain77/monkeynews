// @flow
import Immutable from "seamless-immutable";
import { TERMS_AND_CONDITION,PRIVACY_POLICY,ABOUT_US, APP_INFO_SHOW_LOADING, FEED_BACK, GET_ALL_NEWS_FEEDS } from "../actions/ActionTypes";

const initialState = Immutable({
    allFeeds: [],
    currentFeedsCategory: "general",
    loading: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NEWS_FEEDS.REQUEST:
            return Immutable.merge(state, { loading: true, currentFeedsCategory: action.payload.category });
        case GET_ALL_NEWS_FEEDS.SUCCESS:
            return Immutable.merge(state, {
                allFeeds: action.feeds,
                loading: false
            });
        case GET_ALL_NEWS_FEEDS.FAILURE:
            return Immutable.merge(state, { loading: false });
        case APP_INFO_SHOW_LOADING:
        //@desc loading indicator function
        return Immutable.merge(state, {
            loading: action.payload.isLoading
        });
        case TERMS_AND_CONDITION.SUCCESS:
        return Immutable.merge(state, {
            termsData: action.data,
            loading: false
        });
        case ABOUT_US.SUCCESS:
        return Immutable.merge(state, {
            aboutData: action.data
        });
        case PRIVACY_POLICY.SUCCESS:
        return Immutable.merge(state, {
            privacyData: action.data,
            loading: false
        });
        case FEED_BACK.REQUEST:
        return Immutable.merge(state, {
            loading: true
        });
        case FEED_BACK.SUCCESS:
        return Immutable.merge(state, {
            loading: false
        });
        case FEED_BACK.FAILURE:
        return Immutable.merge(state, {
            loading: false
        });
        default:
        return state;
    }
};
