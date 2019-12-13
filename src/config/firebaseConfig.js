import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCZGHIPLJamNhf1Je1gohyXs7OFUSF-d6I",
    authDomain: "pmilewski-wireframer-316.firebaseapp.com",
    databaseURL: "https://pmilewski-wireframer-316.firebaseio.com",
    projectId: "pmilewski-wireframer-316",
    storageBucket: "pmilewski-wireframer-316.appspot.com",
    messagingSenderId: "774515334386",
    appId: "1:774515334386:web:4f3a470dcb5e137632446b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;