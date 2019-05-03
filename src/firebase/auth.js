import {firebaseRef, firebaseAuth} from './index';
import {toast} from 'react-toastify';
import {getErrorMessage} from '../utils/Messages';

export const signUp = (user) => {
    firebaseAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((signup) => {
            const password = user.password;
            delete user.password;
            saveInfo({
                ...user,
                uid: signup.user.uid
            }).then((result) => {
                toast.success('Conta criada com sucesso.');
                authenticate(user.email, password);
            }, (error) => error);
        }, (error) => {toast.error(getErrorMessage(error.code))});
}

export const signOut = () => firebaseAuth.signOut();

export const authenticate = (email, password) => firebaseAuth.signInWithEmailAndPassword(email, password).then((success)=>{},(error)=>{
    toast.error(getErrorMessage(error.code));
});

export const saveInfo = (user) => firebaseRef
    .child(`users/${user.uid}`)
    .set({
        ...user,
        uid: null
    });