import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// REPLACE WITH YOUR REAL KEYS FROM FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyC0RY71sniYWQLFp46vKEOObAYnWVO2Xpo",
  authDomain: "gearguard-9dc8d.firebaseapp.com",
  projectId: "gearguard-9dc8d",
  storageBucket: "gearguard-9dc8d.firebasestorage.app",
  messagingSenderId: "910922181106",
  appId: "1:910922181106:web:d62f342ef82650edee636b",
  measurementId: "G-RT7EFZ2W14"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);