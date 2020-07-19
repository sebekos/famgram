import { SET_LOADING, SET_DASH_TAB } from "../constants/constants";

// Loading
export const setLoading = (loading) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: loading });
};

// Dash tab
export const setDashTab = (tab) => async (dispatch) => {
    dispatch({ type: SET_DASH_TAB, payload: tab });
};
