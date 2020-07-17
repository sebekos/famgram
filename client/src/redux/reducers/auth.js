import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants/constants";

const initialState = {
    token: localStorage.getItem("token")
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload
            };
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
}
