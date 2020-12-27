import firebase from "firebase/app";
import "firebase/auth";
require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyCD0FbKZp5hLPd_N1DayJdfvrHw8QxxKSA",
  authDomain: "remotetrialexam.firebaseapp.com",
  projectId: "remotetrialexam",
  storageBucket: "remotetrialexam.appspot.com",
  messagingSenderId: "1082222567330",
  appId: "1:1082222567330:web:ec964f7200848c57049cfb",
  measurementId: "G-9CDLZGRD4N",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
