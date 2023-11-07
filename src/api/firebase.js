// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzurTpfVbQnN-wPK2ik1mpm0RUJbovnkw",
  authDomain: "socialmedia-de82e.firebaseapp.com",
  projectId: "socialmedia-de82e",
  storageBucket: "socialmedia-de82e.appspot.com",
  messagingSenderId: "231029064918",
  appId: "1:231029064918:web:51f147f6d4b74012e4b577"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)