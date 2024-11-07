import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrw2VSyrZqfSUgCzW87wNI-DBii0LLdD0",
    authDomain: "fitplan-81617.firebaseapp.com",
    projectId: "fitplan-81617",
    storageBucket: "fitplan-81617.firebasestorage.app",
    messagingSenderId: "1085486006935",
    appId: "1:1085486006935:web:dfbfdb4ab61909ebce1fd2",
    measurementId: "G-Z94Q12FFB1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app;
