import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-9lySMXMP5CZSwvHm_xNJDKpSxUIk76g",
  authDomain: "final-project-nathanuel0322.firebaseapp.com",
  projectId: "final-project-nathanuel0322",
  storageBucket: "final-project-nathanuel0322.appspot.com",
  messagingSenderId: "788624036885",
  appId: "1:788624036885:web:460c39876e732e8ebc6a1c"
};

export const Firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(Firebase);

