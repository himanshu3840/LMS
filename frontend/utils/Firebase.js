import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC8f30RQ9_cnB0GAoCtV5joRgpFt9ZRGPU",
  authDomain: "skillgrid-40f16.firebaseapp.com",
  projectId: "skillgrid-40f16",
  storageBucket: "skillgrid-40f16.firebasestorage.app",
  messagingSenderId: "204489714677",
  appId: "1:204489714677:web:bd7134ab38e5d3681a8ebc",
  measurementId: "G-JDPZ7Q7TS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}
