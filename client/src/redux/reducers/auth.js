import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_USER,
    REGISTER_FAIL,
    SET_AUTH_LOADING
} from "../constants/constants";

const initialState = {
    token: localStorage.getItem("token"),
    email: null,
    userId: null,
    isAuth: 0,
    isRegister: false,
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            axios.defaults.headers.common["x-auth-token"] = payload.token;
            return {
                ...state,
                ...payload,
                loading: false
            };
        case REGISTER_USER:
            return {
                ...state,
                isRegister: true,
                loading: false
            };
        case USER_LOADED:
            return {
                ...state,
                ...payload,
                loading: false
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["x-auth-token"];
            return {
                ...state,
                token: null,
                email: null,
                userId: null,
                isAuth: 0,
                loading: false
            };
        default:
            return state;
    }
}
