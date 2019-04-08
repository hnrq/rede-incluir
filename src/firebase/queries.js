import {firebaseRef} from './';

export const editProfile = (userInfo,uid) => 
    firebaseRef.child(`users/${uid}`).update({
        ...userInfo
});
export const addExperience = (experience,uid) =>
    firebaseRef.child(`users/${uid}/experiences`).push({
        ...experience
    })