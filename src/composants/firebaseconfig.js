// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsiA28cFI6jp5gfplbWOzWDMNjIUXcAMU",
  authDomain: "e-market-2f7c0.firebaseapp.com",
  databaseURL: "https://e-market-2f7c0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-market-2f7c0",
  storageBucket: "e-market-2f7c0.appspot.com",
  messagingSenderId: "44839976855",
  appId: "1:44839976855:web:1380227bfbb89305800ed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;