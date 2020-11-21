import * as firebase from "firebase/app"
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcwwXljdMFwLnGuLyvLGWt3gMSrSL6KBo",
  authDomain: "podcast-10506.firebaseapp.com",
  databaseURL: "https://podcast-10506.firebaseio.com",
  projectId: "podcast-10506",
  storageBucket: "podcast-10506.appspot.com",
  messagingSenderId: "62241664008",
  appId: "1:62241664008:web:0384e1f03907974693f5bd"
};

export const project = firebase.initializeApp(firebaseConfig);
