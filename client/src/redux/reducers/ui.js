import { SET_LOADING, SET_DASH_TAB } from "../constants/constants";

const initialState = {
    loading: true,
    tab: 1
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload
            };
        case SET_DASH_TAB:
            return {
                ...state,
                tab: payload
            };
        default:
            return state;
    }
}
