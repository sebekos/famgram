import axios from "axios";
import {
    GET_USER_GALLERIES,
    ADD_GALLERY,
    EDIT_GALLERY,
    GET_ONE_GALLERY,
    GET_RECENT_GALLERIES,
    SET_GALLERY_LOADING,
    GALLERY_ERROR,
    GET_VIEW_GALLERY,
    DELETE_GALLERY,
    REMOVE_MEDIA,
    SAVE_MEDIA,
    GET_GALLERY_TAGS,
    ADD_TAG,
    REMOVE_TAG
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

// Get gallery tags
export const getGalleryTags = (gallery_id) => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    try {
        const res = await axios.get(`/api/gallery/gallerytags/${gallery_id}`);
        dispatch({
            type: GET_GALLERY_TAGS,
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

// Get view gallery
export const getViewGallery = (gallery_id) => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    try {
        const res = await axios.get(`/api/gallery/viewgallery/${gallery_id}`);
        dispatch({
            type: GET_VIEW_GALLERY,
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

// Delete gallery
export const deleteGallery = (gallery_id, history) => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    try {
        const res = await axios.delete(`/api/gallery/delete/${gallery_id}`);
        dispatch({
            type: DELETE_GALLERY,
            payload: res.data
        });
        history.push("/addeditgallery");
        toast.success("Gallery deleted");
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

// Save media
export const saveMedia = (media_array, gallery_id) => async (dispatch) => {
    dispatch(setGalleryLoading(true));
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ media_array, gallery_id });
    try {
        const res = await axios.post(`/api/gallery/savemedia/${gallery_id}`, body, config);
        dispatch({
            type: SAVE_MEDIA,
            payload: res.data
        });
        toast.success("Updated gallery");
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

// Add tag
export const addTag = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post("/api/gallery/addtag", body, config);
        dispatch({
            type: ADD_TAG,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: GALLERY_ERROR });
        const errors = err.response.data.errors;
        const errorCheck = err.response.data;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else if (errorCheck) {
            toast.error(errorCheck.msg);
        } else {
            toast.error("Server Error");
        }
    }
};

// Remove tag
export const removeTag = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post("/api/gallery/removetag", body, config);
        console.log(res);
        dispatch({
            type: REMOVE_TAG,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: GALLERY_ERROR });
        const errors = err.response.data.errors;
        const errorCheck = err.response.data;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else if (errorCheck) {
            toast.error(errorCheck.msg);
        } else {
            toast.error("Server Error");
        }
    }
};

// Remove gallery
export const removeMedia = (payload) => async (dispatch) => {
    dispatch({ type: REMOVE_MEDIA, payload });
};

// Set gallery loading
export const setGalleryLoading = (payload) => async (dispatch) => {
    dispatch({ type: SET_GALLERY_LOADING, payload });
};
