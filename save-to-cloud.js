// --- Firebase Imports ---
import {
  getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { db } from './app.js'; // Your initialized Firestore db

// --- Elements ---
const saveToCloudBtn = document.getElementById("saveToCloudBtn");
const cloudPopup = document.getElementById("cloudPopup");
const generateCodeBtn = document.getElementById("generateCodeBtn");
const generatedCodeText = document.getElementById("generatedCode");
const reuseSection = document.getElementById("reuseCodeSection");
const reuseCodeInput = document.getElementById("reuseCodeInput");
const confirmReuseBtn = document.getElementById("confirmReuseBtn");
const closePopupBtn = document.getElementById("closeCloudPopupBtn");

// Open popup
saveToCloudBtn.addEventListener("click", () => {
  cloudPopup.classList.remove("hidden");
  generatedCodeText.textContent = "";
  reuseCodeInput.value = "";
});

// Close popup
closePopupBtn.addEventListener("click", () => {
  cloudPopup.classList.add("hidden");
});

// Generate a random 6-character alphanumeric code
function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Show floating toast (optional helper)
function showToast(message, isError = false) {
  const toast = document.getElementById("cloudToast");
  toast.textContent = message;
  toast.className = `floating-message ${isError ? "red" : "green"}`;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// 🔹 Generate Code and Save
generateCodeBtn.addEventListener("click", async () => {
  const code = generateCode();
  const message = document.getElementById("outputText").value.trim();
  if (!message) {
    showToast("⚠️ Nothing to save!", true);
    return;
  }

  try {
    const docRef = doc(db, "messages", code);
    await setDoc(docRef, {
      created: serverTimestamp(),
      texts: [{ text: message, time: serverTimestamp() }]
    });

    generatedCodeText.textContent = `Your code: ${code}`;
  } catch (err) {
    console.error(err);
    showToast("❌ Failed to save to cloud.", true);
  }
});

// 🔹 Reuse Code
confirmReuseBtn.addEventListener("click", async () => {
  const code = reuseCodeInput.value.trim().toUpperCase();
  if (!code) {
    showToast("⚠️ Please enter a code.", true);
    return;
  }

  const message = document.getElementById("outputText").value.trim();
  if (!message) {
    showToast("⚠️ Nothing to save!", true);
    return;
  }

  try {
    const docRef = doc(db, "messages", code);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      showToast("❌ Code not found.", true);
      return;
    }

    const data = docSnap.data();
    if (data.texts.length >= 50) {
      showToast("⚠️ Limit reached: 50 messages max.", true);
      return;
    }

    await updateDoc(docRef, {
      texts: arrayUnion({ text: message, time: serverTimestamp() })
    });

    // Redirect
    window.location.href = `view.html?code=${code}`;
  } catch (err) {
    console.error(err);
    showToast("❌ Failed to reuse code.", true);
  }
});
