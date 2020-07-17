import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants/constants";
import { toast } from "react-toastify";

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

// Logout
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};
