import { ADD_GALLERY, GET_USER_GALLERIES, GET_ONE_GALLERY } from "../constants/constants";

const initialState = {
    mygalleries: [],
    mygalleriesfetch: true,
    galleries: [],
    curGallery: null,
    oneGallery: null,
    loading: false
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
        case GET_ONE_GALLERY:
            return {
                ...state,
                oneGallery: payload
            };
        default:
            return state;
    }
}
