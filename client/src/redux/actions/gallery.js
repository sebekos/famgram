import axios from "axios";
import {
    GET_USER_GALLERIES,
    ADD_GALLERY,
    EDIT_GALLERY,
    GET_ONE_GALLERY,
    GET_RECENT_GALLERIES,
    SET_GALLERY_LOADING,
    GALLERY_ERROR
} from "../constants/constants";
import { toast } from "react-toastify";

// Get user galleries
export const userGalleries = () => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    try {
        const res = await axios.get("/api/gallery/user");
        dispatch({
            type: GET_USER_GALLERIES,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(err);
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            dispatch({ type: GALLERY_ERROR });
            toast.error("Server Error");
        }
    }
};

// Get one gallery
export const getOneGallery = (gallery_id) => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    try {
        const res = await axios.get(`/api/gallery/single/${gallery_id}`);
        dispatch({
            type: GET_ONE_GALLERY,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: GALLERY_ERROR });
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
export const getRecentGalleries = () => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    try {
        const res = await axios.get(`/api/gallery/recent`);
        dispatch({
            type: GET_RECENT_GALLERIES,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: GALLERY_ERROR });
        const errors = err.response.data.errors;
        console.log(err);
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            toast.error("Server Error");
        }
    }
};

// Add gallery
export const addGallery = (formData) => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post("/api/gallery/add", body, config);
        dispatch({
            type: ADD_GALLERY,
            payload: res.data
        });
        toast.success("Gallery added");
    } catch (err) {
        dispatch({ type: GALLERY_ERROR });
        const errors = err.response.data.errors;
        console.log(err);
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            toast.error("Server Error");
        }
    }
};

// Edit gallery
export const editGallery = (formData) => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post("/api/gallery/edit", body, config);
        dispatch({
            type: EDIT_GALLERY,
            payload: res.data
        });
        toast.success("Gallery updated");
    } catch (err) {
        dispatch({ type: GALLERY_ERROR });
        const errors = err.response.data.errors;
        console.log(err);
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            toast.error("Server Error");
        }
    }
};

// Set gallery loading
export const setGalleryLoading = (payload) => async (dispatch) => {
    dispatch({ type: SET_GALLERY_LOADING, payload });
};
