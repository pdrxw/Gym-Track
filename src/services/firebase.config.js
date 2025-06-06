import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- IMPORTANTE

const firebaseConfig = {
  apiKey: "AIzaSyBUb0O2_MNvSv0UbKJliRzv5AK-_6ZGk_0",
  authDomain: "gym-track-22fc4.firebaseapp.com",
  projectId: "gym-track-22fc4",
  storageBucket: "gym-track-22fc4.firebasestorage.app",
  messagingSenderId: "39679996452",
  appId: "1:39679996452:web:b7cb351e09b6f63acf9eb1",
  measurementId: "G-NH74JC1FF4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // <-- AGORA EXPORTANDO db
