// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqaCSZhTwfY4OKucQTEnLpRF7J2sIOox8",
  authDomain: "fbshopping-9d906.firebaseapp.com",
  projectId: "fbshopping-9d906",
  storageBucket: "fbshopping-9d906.appspot.com",
  messagingSenderId: "464247696087",
  appId: "1:464247696087:web:7feb4e125d694b62f69e92",
  measurementId: "G-KDPZL7T8ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app,auth};