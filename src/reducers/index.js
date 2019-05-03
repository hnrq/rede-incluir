import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import searchReducer from './searchReducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const state = combineReducers({
    auth: authReducer,
    form: formReducer,
    userInfo: userInfoReducer,
    searchResults: searchReducer,
});

export default state;
