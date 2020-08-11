import axios from "axios";
import { ADD_PERSON, SET_PERSON_LOADING, PERSON_ERROR, GET_PEOPLE, GET_PERSON, EDIT_PERSON } from "../constants/constants";
import { toast } from "react-toastify";

// Add person
export const addPerson = (formData) => async (dispatch) => {
    dispatch(setPersonLoading(true));
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post("/api/person/add", body, config);
        dispatch({
            type: ADD_PERSON,
            payload: res.data
        });
        toast.success("Person added");
    } catch (err) {
        dispatch({ type: PERSON_ERROR });
        const errors = err.response.data.errors;
        console.log(err);
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            toast.error("Server Error");
        }
    }
};

// Get recent galleries
export const getPeople = () => async (dispatch) => {
    dispatch(setPersonLoading(true));
    try {
        const res = await axios.get(`/api/person/all`);
        dispatch({
            type: GET_PEOPLE,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: PERSON_ERROR });
        const errors = err.response.data.errors;
        console.log(err);
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            toast.error("Server Error");
        }
    }
};

// Get person
export const getPerson = (id) => async (dispatch) => {
    dispatch(setPersonLoading(true));
    try {
        const res = await axios.get(`/api/person/one/${id}`);
        dispatch({
            type: GET_PERSON,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: PERSON_ERROR });
        const errors = err.response.data.errors;
        console.log(err);
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            toast.error("Server Error");
        }
    }
};

// Edit person
export const editPerson = (formData) => async (dispatch) => {
    dispatch(setPersonLoading(true));
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post("/api/person/edit", body, config);
        dispatch({
            type: EDIT_PERSON,
            payload: res.data
        });
        toast.success("Person updated");
    } catch (err) {
        console.log(err);
        dispatch({ type: PERSON_ERROR });
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            toast.error("Server Error");
        }
    }
};

// Set person loading
export const setPersonLoading = (payload) => async (dispatch) => {
    dispatch({ type: SET_PERSON_LOADING, payload });
};
