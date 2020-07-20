import { ADD_GALLERY, GET_USER_GALLERIES } from "../constants/constants";

const initialState = {
    mygalleries: [],
    galleries: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_GALLERY:
            return {
                ...state,
                mygalleries: [...state.mygalleries, payload]
            };
        case GET_USER_GALLERIES:
            return {
                ...state,
                mygalleries: [...payload]
            };
        default:
            return state;
    }
}
