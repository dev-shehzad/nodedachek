//firebaseConfig
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { OAuthProvider ,getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8NqZLklKmSzVQzMFtqDfuUoGTySM6aSA",
  authDomain: "nodeda-id.firebaseapp.com",
  projectId: "nodeda-id",
  storageBucket: "nodeda-id.appspot.com",
  messagingSenderId: "728349667613",
  appId: "1:728349667613:web:b22f4f71a95af11bf9b1f4",
  measurementId: "G-QM18E56P98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics

const auth = getAuth(app);


// Initialize Google Auth Provider
const googleAuthProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // You can handle redirection or user info updates here
    console.log(user);
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error("Error during Google sign-in", errorCode, errorMessage);
  }
};




const appleAuthProvider = new OAuthProvider('apple.com');

// Function to handle Apple Sign-In
const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleAuthProvider);
    // Handle the result of the sign-in here (similar to Google)
    const user = result.user;
    console.log(user);
  } catch (error) {
    // Handle Errors here.
    console.error("Error during Apple sign-in", error.code, error.message);
  }
};

// Export the Firebase app, analytics, and configuration for use elsewhere
export { app, firebaseConfig, auth, signInWithGoogle, signInWithPopup, googleAuthProvider, createUserWithEmailAndPassword, signInWithApple };