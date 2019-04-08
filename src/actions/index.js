import * as types from './types';
import {authenticate, signOut} from '../firebase/auth';

export const login = (user) => ({type:types.LOGIN,user});
export const logout = () => ({type:types.LOGOUT});

export function startLogin(user, password) {
    return(dispatch, getState) => {
        return authenticate(user, password).then((result) => {
            return result;
        }, (error) => {
            return error;
        });
    }
}

export function startLogout() {
    return (dispatch, getState) => {
        return signOut().then((result) => {
            return result;
        }, (error) => {
            return error;
        });
    }
}