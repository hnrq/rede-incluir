import { firebaseRef, firebaseAuth} from './index';

export const signUp = (email, password) => 
    firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(saveInfo);

export const signOut = () =>   
    firebaseAuth.signOut();

export const authenticate = (email, password) => 
    firebaseAuth.signInWithEmailAndPassword(email,password);

export const saveInfo = (user) =>
    firebaseRef.child(`users/${user.uid}/info`)
        .set({
            email: user.email
        }).then(() => user);