import { firebaseRef, firebaseAuth} from './index';
import { toast } from 'react-toastify';

export const signUp = (firstName, lastName, email, password) => {
    firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then((signup) => {
        authenticate(email, password).then((result) => {
            saveInfo({email,firstName,lastName,uid:signup.user.uid})
            return result;
        }, (error) => {
            return error;
        });   
    }, (error) => {
        debugger;
    });
}

export const signOut = () =>   
    firebaseAuth.signOut();

export const authenticate = (email, password) => 
    firebaseAuth.signInWithEmailAndPassword(email,password);

export const saveInfo = (user) =>
    firebaseRef.child(`users/${user.uid}`)
        .set({
            ...user,
            uid:null,
        }).then(() => {toast.success('Conta criada com sucesso.')});