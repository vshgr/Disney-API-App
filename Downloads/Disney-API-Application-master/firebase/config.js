import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyDmmHJhoK9Mh1OnRfdOc62_FXXhdcW7czE",
    authDomain: "disneytestproject-a7d60.firebaseapp.com",
    projectId: "disneytestproject-a7d60",
    storageBucket: "disneytestproject-a7d60.appspot.com",
    messagingSenderId: "112824467696",
    appId: "1:112824467696:web:3108e56ffcfb7351884235"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth();
const db = getFirestore(app);

export {auth, app, db, getFirestore, doc, setDoc, getDoc};