// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwFyO8w61Kx_SUR9QU-nt53NNv4R8ud2Y",
  authDomain: "av2-fmds-joao.firebaseapp.com",
  projectId: "av2-fmds-joao",
  storageBucket: "av2-fmds-joao.appspot.com",
  messagingSenderId: "987063088555",
  appId: "1:987063088555:web:c2a8f552bfe5a21f0f4eee"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export default db;