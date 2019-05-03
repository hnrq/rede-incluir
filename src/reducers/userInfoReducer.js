import {ADD_USER_INFO, ADD_EXPERIENCE, ADD_PROFILE_PICTURE, ADD_GRADUATION, DELETE_EXPERIENCE, DELETE_GRADUATION, REMOVE_PROFILE_PICTURE} from "../actions/types";

export default function userInfoReducer(state = {}, action) {
    switch (action.type) {
        case ADD_USER_INFO:
            return action.payload;
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

        case DELETE_EXPERIENCE:
            delete state.experiences[action.payload.id];
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