import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const state = combineReducers({
    auth: authReducer,
    form: formReducer,
    userInfo: userInfoReducer,
});

export default state;
