// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: XXXXXXXXXXXXXXXXXXXX,
  authDomain:XXXXXXXXXXXXXXXXXX,
  databaseURL: XXXXXXXXXXXXXXXXXX,
  projectId: XXXXXXXXXXXXXX,
  storageBucket: XXXXXXXXXXXXXXX,
  messagingSenderId: XXXXXXXXXXXXXXX,
  appId: XXXXXXXXXXX
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
