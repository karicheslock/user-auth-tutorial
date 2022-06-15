import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBK6FxL9oX-DVQak6PLHIho-Ra7LNRbp_k",
    authDomain: "user-auth-tutorial-5fcff.firebaseapp.com",
    projectId: "user-auth-tutorial-5fcff",
    storageBucket: "user-auth-tutorial-5fcff.appspot.com",
    messagingSenderId: "423581368628",
    appId: "1:423581368628:web:3b59b1f661f031589ea561"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  });
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();