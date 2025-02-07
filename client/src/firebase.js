// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "habitat-hub-572ad.firebaseapp.com",
  projectId: "habitat-hub-572ad",
  storageBucket: "habitat-hub-572ad.firebasestorage.app",
  messagingSenderId: "197646393946",
  appId: "1:197646393946:web:3fbfee98e2f0b998c12e63"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);