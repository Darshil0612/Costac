// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEiOw2ZopEO50jUdXw5c2_Anijgooo1ng",
  authDomain: "salaryteawebapp.firebaseapp.com",
  projectId: "salaryteawebapp",
  storageBucket: "salaryteawebapp.appspot.com",
  messagingSenderId: "673162806668",
  appId: "1:673162806668:web:d2fa24ab4450fa92d402a9",
  measurementId: "G-K2FMT2QM4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle User Sign-Up
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match! Please try again.");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed up:", userCredential.user);
          alert("Account created successfully! Redirecting to Sign In...");
          window.location.href = "index.html"; // Redirect to sign-in page
        })
        .catch((error) => {
          console.error("Error signing up:", error.message);
          alert(error.message);
        });
    });
  }

  // Handle User Sign-In
  const signInButton = document.querySelector(".sign-in-btn");
  if (signInButton) {
    signInButton.addEventListener("click", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
          alert("Signed in successfully!");
          window.location.href = "profile.html"; // Redirect to profile page
        })
        .catch((error) => {
          console.error("Error signing in:", error.message);
          alert(error.message);
        });
    });
  }
});
