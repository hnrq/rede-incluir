import * as types from './types';
import {signOut} from '../firebase/auth';
import {editProfile,saveExperience, editExperience} from '../firebase/queries';
import {firebaseRef,storageRef} from '../firebase';
import { toast } from 'react-toastify';


export const login = (user) => ({type:types.LOGIN,user});
export const logout = () => ({type:types.LOGOUT});

export function getUserInfo(uid,ready) {
    return (dispatch) => {
        return firebaseRef.child(`users/${uid}`).once('value').then((doc) => {
            var values = doc.val();
            return storageRef.child(`users/${uid}/profile-picture`).getDownloadURL().then((downloadURL) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', downloadURL);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    const blob = xhr.response;
                    const image = new File([blob], 'profile', {type: blob.type,lastModified: Date.now()});
                    const reader = new FileReader();
                    reader.onload = () =>  {
                        dispatch(addUserInfo({...values,profilePic: reader.result}));
                        ready();
                    }
                    reader.readAsDataURL(image);
                }
                xhr.send();
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

export function addExperience(experience,uid) {
    return {
        type: types.ADD_EXPERIENCE,
        payload: {
            ...experience,
            uid
        }
    };
}

export function startAddExperience(experience) {
    return (dispatch, getState) => {
        const uid = getState().auth.user.uid;
        return saveExperience(experience,uid).then((result)=>{
            dispatch(addExperience(experience, result.key));
        });
    }
}

export function startEditExperience(experience,id) {
    return (dispatch, getState) => {
        debugger;
        const uid = getState().auth.user.uid;
        return editExperience(experience,uid,id).then(()=>{
            dispatch(addExperience(experience, id));
        });
    }
}

export function startLogout(callback) {
    return (dispatch, getState) => {
        return signOut().then((result) => {
            callback();
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
                const image = new File([profilePic], 'profile', {type: profilePic.type,lastModified: Date.now()});
                const reader = new FileReader();
                reader.onload = () => dispatch(addProfilePicture(reader.result));
                reader.readAsDataURL(image);
            });
        });
    }
}