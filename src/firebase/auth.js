import {firebaseAuth,firebaseRef} from './index';
import {saveInfo} from './queries';
import {toast} from 'react-toastify';
import {getErrorMessage} from '../utils/Messages';

export const signUp = (account,isCompany) => {
    if(isCompany)
        firebaseRef.child('users').orderByChild('cnpj').equalTo(account.cnpj).once('value').then((snapshot) => {
            if(snapshot.exists()) return toast.error("CNPJ já cadastrado.");
        })
    firebaseAuth
        .createUserWithEmailAndPassword(account.email, account.password)
        .then((result) => {
            const password = account.password;
            delete account.password;
            saveInfo(account,result.user.uid,isCompany).then(() => {
                toast.success('Conta criada com sucesso.');
                authenticate(account.email, password);
            }, (error) => error);
        }, (error) => {toast.error(getErrorMessage(error.code))});
}

export const signOut = () => firebaseAuth.signOut();

export const authenticate = (email, password) => firebaseAuth.signInWithEmailAndPassword(email, password).then((success)=>{},(error)=>{
    toast.error(getErrorMessage(error.code));
});