import authReducer from './authReducer';
import profileInfoReducer from './profileInfoReducer';
import searchReducer from './searchReducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const state = combineReducers({
    auth: authReducer,
    form: formReducer,
    profileInfo: profileInfoReducer,
    searchResults: searchReducer,
});

export default state;
