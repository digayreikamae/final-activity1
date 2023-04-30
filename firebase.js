//import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
//import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBpwEuq4SHLVGTj8EB6MZC7kSUMx6aH3VM",
    authDomain: "react-con-8eb33.firebaseapp.com",
    projectId: "react-con-8eb33",
    storageBucket: "react-con-8eb33.appspot.com",
    messagingSenderId: "785421892031",
    appId: "1:785421892031:web:723c84d350f8f2891b490a"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();