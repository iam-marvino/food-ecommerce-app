import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCQhggiGEehfng2Nu6okW0cqddgwT-QIfQ",
  authDomain: "food-ecommerce-app-5f3a1.firebaseapp.com",
  databaseURL: "https://food-ecommerce-app-5f3a1-default-rtdb.firebaseio.com",
  projectId: "food-ecommerce-app-5f3a1",
  storageBucket: "food-ecommerce-app-5f3a1.appspot.com",
  messagingSenderId: "748638160422",
  appId: "1:748638160422:web:265fb14a394a7247f808e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let fireStore = getFirestore(app)
let Auth = getAuth(app)
let GoogleProvider = new GoogleAuthProvider()
let storage = getStorage(app)



export {app,fireStore,Auth,GoogleProvider,storage}