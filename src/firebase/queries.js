import {firebaseRef} from './';

export const editProfile = (userInfo,uid) => firebaseRef.child(`users/${uid}`).update({...userInfo,profilePic:null});

export const addExperience = (experience,uid) =>
    firebaseRef.child(`users/${uid}/experiences`).push({
        ...experience
    })

