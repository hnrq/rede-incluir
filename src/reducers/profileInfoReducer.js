import {
    ADD_PROFILE_INFO,
    ADD_EXPERIENCE,
    ADD_PROFILE_PICTURE,
    ADD_GRADUATION,
    DELETE_EXPERIENCE,
    DELETE_GRADUATION,
    REMOVE_PROFILE_PICTURE,
    ADD_JOB_OPPORTUNITY,
    DELETE_JOB_OPPORTUNITY,
    LOGOUT,
    EDIT_PROFILE_INFO
} from "../actions/types";

export default function profileInfoReducer(state = {}, action) {
    switch (action.type) {
        case ADD_PROFILE_INFO:
            return action.payload;
        case EDIT_PROFILE_INFO:
            return {
                ...state,
                ...action.payload
            };
        case LOGOUT:
            return {};
        case ADD_EXPERIENCE:
            return {
                ...state,
                experiences: {
                    ...state.experiences,
                    [action.payload.id]: {
                        ...action.payload,
                        id: undefined
                    }
                }
            };

        case ADD_JOB_OPPORTUNITY:
            return {
                ...state,
                vacancies: {
                    ...state.vacancies,
                    [action.payload.id]: {
                        ...action.payload,
                        id: undefined
                    }
                }
            };

        case DELETE_EXPERIENCE:
            delete state.experiences[action.payload.id];
            return state;

        case DELETE_JOB_OPPORTUNITY:
            delete state.vacancies[action.payload.id];
            return state;

        case ADD_GRADUATION:
            return {
                ...state,
                graduations: {
                    ...state.graduations,
                    [action.payload.id]: {
                        ...action.payload,
                        id: undefined
                    }
                }
            };

        case DELETE_GRADUATION:
            delete state.graduations[action.payload.id];
            return state;

        case ADD_PROFILE_PICTURE:
            return {
                ...state,
                profilePic: action.payload
            }

        case REMOVE_PROFILE_PICTURE:
            delete state.profilePic;
            return state;
        default:
            return state;
    }
}