// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDukfRkEWZtiR9X_hf4qUlenxPUmlZD-Y",
  authDomain: "cars-doctor-1051e.firebaseapp.com",
  projectId: "cars-doctor-1051e",
  storageBucket: "cars-doctor-1051e.appspot.com",
  messagingSenderId: "706681503235",
  appId: "1:706681503235:web:c15e37fb0749542aeb1836"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;