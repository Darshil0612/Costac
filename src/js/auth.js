// src/js/auth.js

// Import Firebase Auth modules
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Import the initialized Firebase app from config
import { app } from "./firebaseConfig.js";

// Initialize Firebase Authentication
const auth = getAuth(app);

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Sign-Up Form Handler
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
          window.location.href = "sign-in.html";
        })
        .catch((error) => {
          console.error("Error signing up:", error.message);
          alert(error.message);
        });
    });
  }

  // Sign-In Button Handler
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
          window.location.href = "profile.html";
        })
        .catch((error) => {
          console.error("Error signing in:", error.message);
          alert(error.message);
        });
    });
  }
});

