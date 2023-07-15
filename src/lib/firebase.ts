import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf26DPb6rHqjgru6pmJAV2ftjsvoPa29Q",
  authDomain: "bookshop-auth.firebaseapp.com",
  projectId: "bookshop-auth",
  storageBucket: "bookshop-auth.appspot.com",
  messagingSenderId: "614641123032",
  appId: "1:614641123032:web:51970521d95e1f21d5e1ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
