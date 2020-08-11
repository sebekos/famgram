import { ADD_PERSON, SET_PERSON_LOADING, PERSON_ERROR, GET_PEOPLE } from "../constants/constants";

const initialState = {
    person: null,
    people: [],
    loading: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PEOPLE:
            return {
                ...state,
                people: payload,
                loading: false
            };
        case ADD_PERSON:
            return {
                ...state,
                people: [payload, ...state.people],
                loading: false
            };
        case SET_PERSON_LOADING:
            return {
                ...state,
                loading: true
            };
        case PERSON_ERROR:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
