// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import{getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyACdsQTBT_iHnCnNVMnx_JG5k-9k_3BSpE",
  authDomain: "quick-note-18f09.firebaseapp.com",
  projectId: "quick-note-18f09",
  storageBucket: "quick-note-18f09.firebasestorage.app",
  messagingSenderId: "351421419066",
  appId: "1:351421419066:web:6ec5660e2c3ed187ee6f03",
  measurementId: "G-RZJJ2PLZLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
