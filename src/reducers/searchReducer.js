import {ADD_SEARCH_RESULTS, ADD_SEARCH_PROFILE_PIC} from '../actions/types';

export default function searchReducer(state = {}, action){
    switch(action.type){
        case ADD_SEARCH_RESULTS:
            return action.payload
        case ADD_SEARCH_PROFILE_PIC:
            return action.payload.isCompany ? {
                ...state,
                companies:{...state.companies,[action.payload.uid]:{
                    ...state.companies[action.payload.uid],
                    profilePic: action.payload.profilePic
                }}
                } : {
                    ...state,
                    users:{...state.users,[action.payload.uid]:{
                        ...state.users[action.payload.uid],
                        profilePic: action.payload.profilePic
                    }}
                };
        default: return state;
    }
}