import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVTEghs_66_uN4fDGloF-tITIyxZz1TQ0",
  authDomain: "tastyexchange-52369.firebaseapp.com",
  projectId: "tastyexchange-52369",
  storageBucket: "tastyexchange-52369.appspot.com",
  messagingSenderId: "466612584349",
  appId: "1:466612584349:web:d8dd5c8673b6484c4bb974",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
