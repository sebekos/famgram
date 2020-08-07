import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOADED, AUTH_ERROR, REGISTER_USER, REGISTER_FAIL } from "../constants/constants";
import { toast } from "react-toastify";
import setAuthToken from "../utils/setAuthToken";

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Login User
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post("/api/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Register User
export const register = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    try {
        await axios.post("/api/user", body, config);
        toast.success("Registration complete, your account is awaiting approval");
        dispatch({
            type: REGISTER_USER
        });
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Logout
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};
