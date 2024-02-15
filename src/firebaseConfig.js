import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv6UG9nB78kbtm0qWS05cn2m8jYiA9pqE",
  authDomain: "interviewblitz-2024.firebaseapp.com",
  projectId: "interviewblitz-2024",
  storageBucket: "interviewblitz-2024.appspot.com",
  messagingSenderId: "444334294135",
  appId: "1:444334294135:web:9ac3c928499bfc02893272",
  measurementId: "G-GQ86EBRFY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();