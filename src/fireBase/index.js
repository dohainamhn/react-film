import firebase from 'firebase/app'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyA6v1GUyiLSdBTRQXBs_m0ntT87-oj8bhg",
  authDomain: "react-upload-image-d14cb.firebaseapp.com",
  projectId: "react-upload-image-d14cb",
  storageBucket: "react-upload-image-d14cb.appspot.com",
  messagingSenderId: "301348350634",
  appId: "1:301348350634:web:994642e13ef98235defed3",
  measurementId: "G-WCDRLP88J0"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage,firebase}