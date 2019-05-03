import {ADD_SEARCH_RESULTS} from '../actions/types';

export default function searchReducer(state = {}, action){
    switch(action.type){
        case ADD_SEARCH_RESULTS:
            return action.payload
        default: return state;
    }
}