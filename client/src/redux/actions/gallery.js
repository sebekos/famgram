import axios from "axios";
import { GET_USER_GALLERIES, ADD_GALLERY, GET_ONE_GALLERY } from "../constants/constants";
import { toast } from "react-toastify";
import { setLoading } from "./ui";

// Get user galleries
export const userGalleries = () => async (dispatch) => {
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
            toast.error("Server Error");
        }
    }
};

// Get one gallery
export const getOneGallery = (gallery_id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/gallery/${gallery_id}`);
        dispatch({
            type: GET_ONE_GALLERY,
            payload: res.data
        });
    } catch (err) {
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
    dispatch(setLoading(true));
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
        const errors = err.response.data.errors;
        console.log(err);
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        } else {
            toast.error("Server Error");
        }
    }
    dispatch(setLoading(false));
};
