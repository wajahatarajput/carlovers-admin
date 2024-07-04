// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZcYI5IeQtcPKwgjxMm3Zlao0PqIClRTg",
    authDomain: "carlovers-7907f.firebaseapp.com",
    databaseURL: "https://carlovers-7907f-default-rtdb.firebaseio.com/",
    projectId: "carlovers-7907f",
    storageBucket: "carlovers-7907f.appspot.com",
    messagingSenderId: "102433571983",
    appId: "1:102433571983:web:775e1f3c76b1d2a233dcfa",
    measurementId: "G-QG34JL1214"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage: any = getStorage();

export {
    doc, getDoc, setDoc, ref, uploadBytes, getDownloadURL, app, auth, db, storage
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);