/* eslint-disable prettier/prettier */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configurations for each project
const firebaseConfig1 = {
  apiKey: 'AIzaSyB8nbOcS4ff_F8U6aaikMROzmtX6tryVbs',
  authDomain: 'capstone-cafd8.firebaseapp.com',
  projectId: 'capstone-cafd8',
  storageBucket: 'capstone-cafd8.appspot.com',
  messagingSenderId: '1048972982069',
  appId: '1:1048972982069:web:14caa4ebb2b00006d27e7c',
};

const firebaseConfig2 = {
  apiKey: 'AIzaSyDelVNG5nZOgM2ng770j-sPO9EhX-3Ap3A',
  authDomain: 'driverdata-d7c14.firebaseapp.com',
  projectId: 'driverdata-d7c14',
  storageBucket: 'driverdata-d7c14.appspot.com',
  messagingSenderId: '820514592160',
  appId: '1:820514592160:web:c47b1c2faad7d3863a00c5',
};

// Initialize Firebase apps
const app1 = firebase.initializeApp(firebaseConfig1, 'project1');
const app2 = firebase.initializeApp(firebaseConfig2, 'project2');

// Access authentication and Firestore instances for each project
 const auth1 = app1.auth();
const firestore1 = app1.firestore();

 const auth2 = app2.auth();
const firestore2 = app2.firestore();

export {auth1, firestore1, auth2, firestore2};
//export { firestore1, firestore2};