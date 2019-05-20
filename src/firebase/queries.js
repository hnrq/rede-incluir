import {firebaseRef} from './';

export const editProfile = (userInfo, uid) => firebaseRef
    .child(`users/${uid}`)
    .update(userInfo);

export const saveExperience = (experience, uid) => firebaseRef
    .child(`users/${uid}/experiences`)
    .push(experience)

export const editExperience = (experience, uid, experienceId) => firebaseRef
    .child(`users/${uid}/experiences/${experienceId}`)
    .update(experience);

export const deleteExperience = (uid, experienceId) => firebaseRef
    .child(`users/${uid}/experiences/${experienceId}`)
    .remove();

export const saveInfo = (account, uid, isCompany) => firebaseRef
    .child(`users/${uid}`)
    .set(isCompany ? {...account,isCompany} : account);

export const saveGraduation = (graduation, uid) => firebaseRef
    .child(`users/${uid}/graduations`)
    .push(graduation)

export const editGraduation = (graduation, uid, graduationId) => firebaseRef
    .child(`users/${uid}/graduations/${graduationId}`)
    .update(graduation);

export const deleteGraduation = (uid, graduationId) => firebaseRef
    .child(`users/${uid}/graduations/${graduationId}`)
    .remove();

export const saveJobOpportunity = (jobOpportunity, uid) => firebaseRef
    .child(`users/${uid}/jobOpportunities`)
    .push(jobOpportunity)

export const editJobOpportunity = (jobOpportunity, uid, jobOpportunityId) => firebaseRef
    .child(`users/${uid}/jobOpportunities/${jobOpportunityId}`)
    .update(jobOpportunity);

export const deleteJobOpportunity = (uid, jobOpportunityId) => firebaseRef
    .child(`users/${uid}/jobOpportunities/${jobOpportunityId}`)
    .remove();
