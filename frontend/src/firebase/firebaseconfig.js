import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTHDOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.SENDER_ID,
//   appId: process.env.APP_ID,
// };


const firebaseConfig = {
  apiKey: "AIzaSyA14kuPQ0_XxQFCm0LgbsRgror5jbOstxQ",
  authDomain: "arpplx.firebaseapp.com",
  projectId: "arpplx",
  storageBucket: "arpplx.appspot.com",
  messagingSenderId: "226615162243",
  appId: "1:226615162243:web:e01533309e6e225d69b2b6",
  measurementId: "G-713Z7CPX9X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const storage = getStorage();
