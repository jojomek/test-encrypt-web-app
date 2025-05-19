// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaly9TKmLCAdkNFw7Mqlharbihj05p4X8",
  authDomain: "encrypt-decrypt-web-app-system.firebaseapp.com",
  projectId: "encrypt-decrypt-web-app-system",
  storageBucket: "encrypt-decrypt-web-app-system.appspot.com", // 🔄 Fixed typo here
  messagingSenderId: "883845653609",
  appId: "1:883845653609:web:13d34858a03bfffd246ef8",
  measurementId: "G-7TB6CDV8M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // ✅ Firestore instance

// Export Firestore to use in save-to-cloud.js
export { db };
