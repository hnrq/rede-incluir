import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAp9kJTse1S6yGKmg7Q9bf4alf0jQQy3oY",
    authDomain: "rede-incluir.firebaseapp.com",
    databaseURL: "https://rede-incluir.firebaseio.com",
    projectId: "rede-incluir",
    storageBucket: "rede-incluir.appspot.com",
    messagingSenderId: "340134517912"
};

firebase.initializeApp(config);

export const firebaseRef = firebase.database().ref();
export const firebaseAuth = firebase.auth();
export const storageKey = 'AUTH_TOKEN';
export const storageRef = firebase.storage().ref();

export default firebase;