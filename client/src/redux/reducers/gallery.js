import {
    ADD_GALLERY,
    EDIT_GALLERY,
    GET_USER_GALLERIES,
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

const initialState = {
    mygalleries: [],
    mygalleriesfetch: true,
    galleries: [],
    curGallery: null,
    oneGallery: null,
    recentGalleries: [],
    viewGallery: null,
    tags: [],
    tags_people: [],
    tags_photos: [],
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
                oneGallery: payload,
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
        case GET_RECENT_GALLERIES:
            return {
                ...state,
                recentGalleries: payload,
                loading: false
            };
        case GET_VIEW_GALLERY:
            return {
                ...state,
                viewGallery: payload,
                loading: false
            };
        case SET_GALLERY_LOADING:
            return {
                ...state,
                loading: payload
            };
        case DELETE_GALLERY:
            const delete_id = parseInt(payload.id, 10);
            return {
                ...state,
                mygalleries: state.mygalleries.filter((item) => item.id !== delete_id),
                recentGalleries: state.recentGalleries.filter((item) => item.id !== delete_id),
                galleries: state.galleries.filter((item) => item.id !== delete_id),
                loading: false
            };
        case REMOVE_MEDIA:
            return {
                ...state,
                viewGallery: {
                    ...state.viewGallery,
                    photos: state.viewGallery.photos.filter((item) => item.id !== parseInt(payload, 10))
                }
            };
        case SAVE_MEDIA:
            return {
                ...state,
                loading: false
            };
        case GET_GALLERY_TAGS:
            return {
                ...state,
                tags: payload.tags,
                tags_people: payload.people,
                tags_photos: payload.photos,
                loading: false
            };
        case ADD_TAG:
            return {
                ...state,
                tags: [...state.tags, payload],
                loading: false
            };
        case REMOVE_TAG:
            const tag_id = parseInt(payload.id, 10);
            return {
                ...state,
                tags: state.tags.filter((item) => item.id !== tag_id),
                loading: false
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
