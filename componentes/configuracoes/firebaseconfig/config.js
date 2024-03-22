// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import {collection, getDocs} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*
  apiKey: "AIzaSyAPJmPDvsaFKOfsM718BrcvTwyL5HOYqcQ",
  authDomain: "teste-7de6b.firebaseapp.com",
  databaseURL: "https://teste-7de6b-default-rtdb.firebaseio.com",
  projectId: "teste-7de6b",
  storageBucket: "teste-7de6b.appspot.com",
  messagingSenderId: "956290569376",
  appId: "1:956290569376:web:8f4cff2a41956edb4de5c5",
  measurementId: "G-3Z1HFDZELX"
  */
  apiKey: "AIzaSyBT4yfcSC76YJ-edGcaopf73WMOZbrZcWw",
  authDomain: "shapemeappbdteste.firebaseapp.com",
  databaseURL: "https://shapemeappbdteste-default-rtdb.firebaseio.com",
  projectId: "shapemeappbdteste",
  storageBucket: "shapemeappbdteste.appspot.com",
  messagingSenderId: "907185536450",
  appId: "1:907185536450:web:607af8bcd488edcce0ea5b",
  measurementId: "G-S6T72TWE45"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Iniciando o Firestore
const firebaseBD = getFirestore(app)


firebase.initializeApp(firebaseConfig);



export {firebase, firebaseBD}