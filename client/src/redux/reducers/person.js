import { ADD_PERSON, SET_PERSON_LOADING, PERSON_ERROR, GET_PEOPLE, GET_PERSON, EDIT_PERSON, DELETE_PERSON } from "../constants/constants";

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
        case GET_PERSON:
            return {
                ...state,
                person: payload,
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
        case EDIT_PERSON:
            return {
                ...state,
                people: state.people.map((item) => {
                    if (item.id === payload.id) return payload;
                    return item;
                }),
                person: payload,
                loading: false
            };
        case DELETE_PERSON:
            const delete_id = parseInt(payload.id, 10);
            return {
                ...state,
                people: state.people.filter((item) => item.id !== delete_id),
                loading: false
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
