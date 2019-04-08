import {ADD_USER_INFO,ADD_EXPERIENCE_INFO} from "../actions/types";

export default function userInfoReducer(state = {}, action) {
    switch (action.type) {
        case ADD_USER_INFO:
        return action.payload;
        case ADD_EXPERIENCE_INFO:
            return {...state,
            experiences:{
                ...state.experiences,
                [action.payload.uid]:{...action.payload,uid:null}
            }};
        default:
            return state;
    }
}