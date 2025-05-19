// Helper function for showing floating messages
let floatingMessageTimeout;

function showFloatingMessage(message, duration = 3000) {
  const floatingMessage = document.getElementById("floatingMessage");
  if (!floatingMessage) return;

  floatingMessage.textContent = message;
  floatingMessage.classList.add("show");

  if (floatingMessageTimeout) clearTimeout(floatingMessageTimeout);
  floatingMessageTimeout = setTimeout(() => {
    floatingMessage.classList.remove("show");
  }, duration);
}

// Live preview of the input and key
function livePreview() {
  const inputText = document.getElementById("inputText").value;
  const key = document.getElementById("key").value;
  const algorithm = document.getElementById("algorithm").value;

  if (inputText && key) {
    let result;
    switch (algorithm) {
      case "caesar":
        result = caesarCipher(inputText, parseInt(key));
        break;
      case "vigenere":
        result = vigenereCipher(inputText, key);
        break;
      case "substitution":
        result = substitutionCipher(inputText, key);
        break;
      default:
        result = "Select an algorithm";
    }
    document.getElementById("outputText").value = result;
  }
}

// Update tooltip for key input based on selected cipher
function updateKeyTooltip() {
  const algorithm = document.getElementById("algorithm").value;
  const keyHelp = document.getElementById("keyHelp");

  if (algorithm === "caesar") {
    keyHelp.textContent = "Enter a number (e.g., 3) for the Caesar cipher.";
  } else if (algorithm === "vigenere") {
    keyHelp.textContent = "Enter a keyword (e.g., 'KEY') for the Vigenère cipher.";
  } else if (algorithm === "substitution") {
    keyHelp.textContent = "Enter a 26-letter string for the Substitution cipher (eg.QWERTYUIOPASDFGHJKLZXCVNMJ).";
  }
}

/// Caesar cipher encryption
function caesarCipher(text, shift) {
  if (isNaN(shift) || !Number.isInteger(shift)) {
    showFloatingMessage("Must be a valid integer for Caesar cipher(1-25 ONLY).");
    return "";
  }

  return text.split("").map(char => {
    if (/[a-zA-Z]/.test(char)) {
      const start = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26 + 26) % 26 + start);
    }
    return char;
  }).join("");
}


// Vigenère cipher encryption
function vigenereCipher(text, key) {
  if (!key || !/^[a-zA-Z]+$/.test(key)) {
    showFloatingMessage("Key must be a non-empty alphabetic string for Vigenère cipher.");
    return "";
  }

  let keyIndex = 0;
  return text.split("").map(char => {
    if (/[a-zA-Z]/.test(char)) {
      const start = char === char.toUpperCase() ? 65 : 97;
      const keyShift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
      keyIndex++;
      return String.fromCharCode(((char.charCodeAt(0) - start + keyShift) % 26 + 26) % 26 + start);
    }
    return char;
  }).join("");
}


// Substitution cipher encryption
function substitutionCipher(text, key) {
  if (key.length !== 26) {
    showFloatingMessage("Substitution cipher key must be exactly 26 letters long.");
    return "";
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const keyMap = key.toUpperCase().split("");
  const cipherMap = {};

  for (let i = 0; i < alphabet.length; i++) {
    cipherMap[alphabet[i]] = keyMap[i];
  }

  return text.split("").map(char => {
    const upperChar = char.toUpperCase();
    if (alphabet.includes(upperChar)) {
      return char === upperChar ? cipherMap[char] : cipherMap[upperChar].toLowerCase();
    }
    return char;
  }).join("");
}

// Encrypt the text using the selected cipher
function encryptText() {
  const inputText = document.getElementById("inputText").value;
  const key = document.getElementById("key").value;
  const algorithm = document.getElementById("algorithm").value;

  if (!inputText || !key) {
    showFloatingMessage("Please fill in both text and key.");
    return;
  }

  let result;
  switch (algorithm) {
    case "caesar":
      result = caesarCipher(inputText, parseInt(key));
      break;
    case "vigenere":
      result = vigenereCipher(inputText, key);
      break;
    case "substitution":
      result = substitutionCipher(inputText, key);
      break;
    default:
      result = "Select an algorithm";
  }

  document.getElementById("outputText").value = result;
  showFloatingMessage("Text encrypted successfully!", 2000);
}

// Decrypt the text using the selected cipher
function decryptText() {
  const inputText = document.getElementById("inputText").value;
  const key = document.getElementById("key").value;
  const algorithm = document.getElementById("algorithm").value;

  if (!inputText || !key) {
    showFloatingMessage("Please fill in both text and key.");
    return;
  }

  let result;
  switch (algorithm) {
    case "caesar":
      result = caesarCipher(inputText, -parseInt(key));
      break;
    case "vigenere":
      result = vigenereCipher(inputText, key.split("").reverse().join("")); // Simple decryption method for Vigenère
      break;
    case "substitution":
      result = substitutionCipher(inputText, key); // Substitution cipher is symmetric
      break;
    default:
      result = "Select an algorithm";
  }

  document.getElementById("outputText").value = result;
  showFloatingMessage("Text decrypted successfully!", 2000);
}


// Initialize the tooltip for the key field on page load
updateKeyTooltip();
