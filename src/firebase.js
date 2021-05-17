import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBOT_yBcp-mRCR4bCKvvAPCm-LvbhDsAyQ",
  authDomain: "react-firebase-chap-app.firebaseapp.com",
  projectId: "react-firebase-chap-app",
  storageBucket: "react-firebase-chap-app.appspot.com",
  messagingSenderId: "814104618452",
  appId: "1:814104618452:web:d7460376b4dc527c402241",
  measurementId: "G-T57XZ6DM2L",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//  firebase.analytics();

export default firebase;
