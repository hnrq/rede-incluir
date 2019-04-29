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

export const deleteExperience = (uid, experienceId) => 
    firebaseRef.child(`users/${uid}/experiences/${experienceId}`)
    .remove();

export const saveGraduation = (graduation, uid) => firebaseRef
    .child(`users/${uid}/graduations`)
    .push(graduation)

export const editGraduation = (graduation, uid, graduationId) => firebaseRef
    .child(`users/${uid}/graduations/${graduationId}`)
    .update(graduation);

export const deleteGraduation = (uid, graduationId) => firebaseRef
    .child(`users/${uid}/graduations/${graduationId}`)
    .remove();


