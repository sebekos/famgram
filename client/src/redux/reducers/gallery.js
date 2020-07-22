import { ADD_GALLERY, GET_USER_GALLERIES } from "../constants/constants";

const initialState = {
    mygalleries: [],
    mygalleriesfetch: true,
    galleries: [],
    curGallery: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_GALLERY:
            return {
                ...state,
                mygalleries: [payload, ...state.mygalleries]
            };
        case GET_USER_GALLERIES:
            return {
                ...state,
                mygalleries: [...payload],
                mygalleriesfetch: false
            };
        default:
            return state;
    }
}
