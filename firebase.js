import firebase from 'firebase/app'
// import * as firebase from "firebase"
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRbtVjlG0vPeKpGg9tNlGdoMDmNCmemz8",
  authDomain: "chat-app-93674.firebaseapp.com",
  projectId: "chat-app-93674",
  storageBucket: "chat-app-93674.appspot.com",
  messagingSenderId: "878381095838",
  appId: "1:878381095838:web:e12d15aa10e5933933948f"
};
  
let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}


const db = app.firestore();
const auth = firebase.auth();

export {db, auth};