import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyALFfK6KPdy3C7v758evZWXxU_xth1quDE",
    authDomain: "goat-marketplace-25421.firebaseapp.com",
    projectId: "goat-marketplace-25421",
    storageBucket: "goat-marketplace-25421.appspot.com",
    messagingSenderId: "583053193199",
    appId: "1:583053193199:web:239384af6c6dad231dd01a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
