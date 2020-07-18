import { SET_LOADING } from "../constants/constants";

// Loading
export const setLoading = (loading) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: loading });
};
