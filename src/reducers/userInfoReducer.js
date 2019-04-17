import {ADD_USER_INFO,ADD_EXPERIENCE_INFO,ADD_PROFILE_PICTURE} from "../actions/types";

export default function userInfoReducer(state = {}, action) {
    switch (action.type) {
        case ADD_USER_INFO:
        return {...state,...action.payload};
        case ADD_EXPERIENCE_INFO:
            return {...state,
            experiences:{
                ...state.experiences,
                [action.payload.uid]:{...action.payload,uid:undefined}
            }};
        case ADD_PROFILE_PICTURE:
            return {
                ...state,
                profilePic: action.payload
            }
        default:
            return state;
    }
}