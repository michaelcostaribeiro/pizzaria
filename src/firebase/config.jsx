// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK28_PFr9f605uhfECbQASX-SIdOmUz18",
  authDomain: "pizzaria-db-80a8a.firebaseapp.com",
  projectId: "pizzaria-db-80a8a",
  storageBucket: "pizzaria-db-80a8a.firebasestorage.app",
  messagingSenderId: "346991830456",
  appId: "1:346991830456:web:3c24d8cb81c34f43235b4d",
  measurementId: "G-ZRYZGJDTM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app)
export const db = getFirestore(app);


