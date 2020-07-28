import { ADD_GALLERY, EDIT_GALLERY, GET_USER_GALLERIES, GET_ONE_GALLERY, SET_GALLERY_LOADING, GALLERY_ERROR } from "../constants/constants";

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
                mygalleries: [payload, ...state.mygalleries],
                loading: false
            };
        case EDIT_GALLERY:
            return {
                ...state,
                mygalleries: state.mygalleries.map((item) => {
                    if (item.id === payload.id) return payload;
                    return item;
                }),
                loading: false
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
                oneGallery: payload,
                loading: false
            };
        case SET_GALLERY_LOADING:
            return {
                ...state,
                loading: payload
            };
        case GALLERY_ERROR:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
