import * as types from './types';
import {signOut} from '../firebase/auth';
import {editProfile} from '../firebase/queries';
import {firebaseRef,storageRef} from '../firebase';
import { toast } from 'react-toastify';


export const login = (user) => ({type:types.LOGIN,user});
export const logout = () => ({type:types.LOGOUT});

export function getUserInfo(uid) {
    return (dispatch, getState) => {
        return firebaseRef.child(`users/${uid}`).once('value').then((doc) => {
            var values = doc.val();
            return storageRef.child(`users/${uid}/profile-picture`).getDownloadURL().then((downloadUrl) => {
                dispatch(addUserInfo({...values,profilePic: downloadUrl}));
            });
        });
        
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

export function addProfilePicture(downloadURL) {
    return {
        type: types.ADD_PROFILE_PICTURE,
        payload: downloadURL
    }
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

export function startEditUserInfo(userInfo) {
    return (dispatch, getState) => {
        const profilePic = userInfo.profilePic;
        delete userInfo.profilePic;
        return editProfile({...userInfo},getState().auth.user.uid).then((result) => {
            dispatch(addUserInfo({...userInfo}));
            toast.success("Perfil editado com sucesso.");
            return dispatch(startUploadProfilePic(profilePic));
        });
    }
}

export function startUploadProfilePic(profilePic) {
    return (dispatch, getState) => {
        var upload = storageRef.child(`users/${getState().auth.user.uid}/profile-picture`).put(profilePic);
        return upload.on('state_changed', function (snapshot) {}, (error) => {}, function () {
            return upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                dispatch(addProfilePicture(downloadURL));
            });
        });
    }
}