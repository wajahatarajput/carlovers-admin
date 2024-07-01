// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCU0ayI72zovQGx8ZbfTYS-K2FtO_WuEUQ",
    authDomain: "carlovers2024-d1da4.firebaseapp.com",
    projectId: "carlovers2024-d1da4",
    storageBucket: "carlovers2024-d1da4.appspot.com",
    messagingSenderId: "1018243231620",
    appId: "1:1018243231620:web:554ccd3632c2231946f7d1",
    measurementId: "G-FSZNW1TTE8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);