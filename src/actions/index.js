import * as types from './types';
import {signOut} from '../firebase/auth';
import {firebaseRef} from '../firebase';


export const login = (user) => ({type:types.LOGIN,user});
export const logout = () => ({type:types.LOGOUT});

export function getUserInfo(uid) {
    return (dispatch, getState) => {
        return firebaseRef
            .child(`users/${uid}`).once('value');
    }
}

export function addUserInfo(userInfo) {
    return {
        type: types.ADD_USER_INFO,
        payload: {
            ...userInfo
        }
    };
}

export function addExperienceInfo(experienceInfo,uid) {
    return {
        type: types.ADD_EXPERIENCE_INFO,
        payload: {
            ...experienceInfo,
            uid
        }
    };
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