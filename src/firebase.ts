// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8ZZb5TXEo6Qscj4ki8E5MKgS9MOXZSuo",
  authDomain: "shindiri-test.firebaseapp.com",
  projectId: "shindiri-test",
  storageBucket: "shindiri-test.appspot.com",
  messagingSenderId: "52617965392",
  appId: "1:52617965392:web:fc3ff399c4d2e6db6e4655",
  measurementId: "G-CBB903KCR9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
export {auth};