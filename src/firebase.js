// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKLq6eBXEl1QkfVQqgBarTnUGwXT0adAU",
  authDomain: "friendlink-869d5.firebaseapp.com",
  projectId: "friendlink-869d5",
  storageBucket: "friendlink-869d5.appspot.com",
  messagingSenderId: "265074421943",
  appId: "1:265074421943:web:134acd4f6e43102a2f5d32",
  measurementId: "G-9214GLYKKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;