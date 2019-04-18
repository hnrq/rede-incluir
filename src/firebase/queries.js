import {firebaseRef} from './';

export const editProfile = (userInfo,uid) => 
    firebaseRef.child(`users/${uid}`)
    .update(userInfo);

export const saveExperience = (experience,uid) =>
    firebaseRef.child(`users/${uid}/experiences`)
    .push(experience)

export const editExperience = (experience, uid, experienceId) => 
    firebaseRef.child(`users/${uid}/experiences/${experienceId}`)
    .update(experience);
