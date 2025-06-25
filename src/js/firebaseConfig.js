// src/js/firebaseConfig.js

// Import only the Firebase core SDK needed to initialize the app
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEiOw2ZopEO50jUdXw5c2_Anijgooo1ng",
  authDomain: "salaryteawebapp.firebaseapp.com",
  projectId: "salaryteawebapp",
  storageBucket: "salaryteawebapp.appspot.com",
  messagingSenderId: "673162806668",
  appId: "1:673162806668:web:d2fa24ab4450fa92d402a9",
  measurementId: "G-K2FMT2QM4H"
};

// Initialize and export the app instance
export const app = initializeApp(firebaseConfig);
