import { generateAISummary } from "./gemini.js";

// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 PASTE YOUR firebaseConfig HERE
const firebaseConfig = {
  apiKey: "AIzaSyA0QIzijruSuZJ7NIct60oNn9UWlRuC8ks",
  authDomain: "campus-knowledge-vault.firebaseapp.com",
  projectId: "campus-knowledge-vault",
  storageBucket: "campus-knowledge-vault.firebasestorage.app",
  messagingSenderId: "586519109130",
  appId: "1:586519109130:web:d7b81c158a7ac1e1aec9f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.searchKnowledge = async function () {
  window.searchKnowledge = async function () {
    const subject = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "Loading... Please wait";

    const q = query(
      collection(db, "knowledge"),
      where("subject", "==", subject)
    );

    const querySnapshot = await getDocs(q);
    resultsDiv.innerHTML = "";

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      // 🔥 GEMINI AI CALL
      const aiSummary = await generateAISummary(data.content);

      resultsDiv.innerHTML += `
      <div class="card">
        <h3>${data.subject}</h3>
        <p><b>Topic:</b> ${data.topic}</p>
        <p><b>Type:</b> ${data.type}</p>
        <p><b>Content:</b> ${data.content}</p>
        <p><b>AI Summary:</b> ${aiSummary}</p>
      </div>
    `;
    }
  };
};
