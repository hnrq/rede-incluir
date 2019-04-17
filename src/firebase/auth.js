import { firebaseRef, firebaseAuth} from './index';
import { toast } from 'react-toastify';

export const signUp = (firstName, lastName, email, password) => {
    firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then((signup) => {
        saveInfo({email,firstName,lastName,uid:signup.user.uid}).then((result) => {
            toast.success('Conta criada com sucesso.');
            authenticate(email, password);
        }, (error) => error);
    }, (error) => error);
}

export const signOut = () =>   
    firebaseAuth.signOut();

export const authenticate = (email, password) => 
    firebaseAuth.signInWithEmailAndPassword(email,password);

export const saveInfo = (user) => firebaseRef.child(`users/${user.uid}`).set({...user,uid:null,});