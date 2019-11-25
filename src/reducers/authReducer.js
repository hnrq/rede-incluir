import {LOGIN, LOGOUT} from '../actions/types';

export default function authReducer(state = {}, action){
    switch (action.type) {
        case LOGIN:
            return {user: action.user};
        case LOGOUT:
            return {};
        default:
            return state;
    }
}