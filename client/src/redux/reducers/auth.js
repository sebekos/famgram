import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOADED, AUTH_ERROR } from "../constants/constants";

const initialState = {
    token: localStorage.getItem("token"),
    email: null,
    userId: null,
    isAuth: 0
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
        case USER_LOADED:
            return {
                ...state,
                ...payload
            };
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                email: null,
                userId: null,
                isAuth: 0
            };
        default:
            return state;
    }
}
