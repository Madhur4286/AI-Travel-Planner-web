// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA14cv9K19RLfHTGqNzU4wl_K5RnUGqXHU",
  authDomain: "ai-trip-planner-2b13b.firebaseapp.com",
  projectId: "ai-trip-planner-2b13b",
  storageBucket: "ai-trip-planner-2b13b.firebasestorage.app",
  messagingSenderId: "512637606686",
  appId: "1:512637606686:web:c0d8eeb9865013dc55c70f",
  measurementId: "G-RSY2BGC8FT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);