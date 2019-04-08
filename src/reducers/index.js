import authReducer from './authReducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const state = combineReducers({
    auth: authReducer,
    form: formReducer,
});

export default state;
