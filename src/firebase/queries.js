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
    .set(isCompany
        ? {
            ...account,
            isCompany
        }
        : account);

export const saveGraduation = (graduation, uid) => firebaseRef
    .child(`users/${uid}/graduations`)
    .push(graduation)

export const editGraduation = (graduation, uid, graduationId) => firebaseRef
    .child(`users/${uid}/graduations/${graduationId}`)
    .update(graduation);

export const deleteGraduation = (uid, graduationId) => firebaseRef
    .child(`users/${uid}/graduations/${graduationId}`)
    .remove();

export const saveVacancy = (vacancy, uid) => firebaseRef
    .child(`users/${uid}/vacancies`)
    .push(vacancy)

export const editVacancy = (vacancy, uid, vacancyId) => firebaseRef
    .child(`users/${uid}/vacancies/${vacancyId}`)
    .update(vacancy);

export const deleteVacancy = (uid, vacancyId) => firebaseRef
    .child(`users/${uid}/vacancies/${vacancyId}`)
    .remove();

export const fetchVacancyCandidates = (companyId, vacancyId) => firebaseRef
    .child(`users/${companyId}/vacancies/${vacancyId}/candidates`)
    .once('value');

export const fetchUsers = () => firebaseRef
    .child(`users`)
    .once('value');

export const fetchUser = (uid) => firebaseRef
    .child(`users/${uid}`)
    .once('value');

export const vacancyApply = (companyId, vacancyId, userId) => firebaseRef
    .child(`users/${companyId}/vacancies/${vacancyId}/candidates/${userId}`)
    .set(true);
