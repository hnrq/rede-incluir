import {ADD_VACANCY_CANDIDATES} from '../actions/types';

export default function vacancyReducer(state = {}, action) {
    switch (action.type) {
        case ADD_VACANCY_CANDIDATES:
            return action.payload;
        default:
            return state;
    }
}