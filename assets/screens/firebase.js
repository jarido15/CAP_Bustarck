/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configurations for each project
const firebaseConfig2 = {
  apiKey: 'AIzaSyDelVNG5nZOgM2ng770j-sPO9EhX-3Ap3A',
  authDomain: 'driverdata-d7c14.firebaseapp.com',
  projectId: 'driverdata-d7c14',
  storageBucket: 'driverdata-d7c14.appspot.com',
  messagingSenderId: '820514592160',
  appId: '1:820514592160:web:c47b1c2faad7d3863a00c5',
};

const firebaseConfig3 = {
  apiKey: "AIzaSyDelVNG5nZOgM2ng770j-sPO9EhX-3Ap3A",
  authDomain: "driverdata-d7c14.firebaseapp.com",
  projectId: "driverdata-d7c14",
  storageBucket: "driverdata-d7c14.appspot.com",
  messagingSenderId: "820514592160",
  appId: "1:820514592160:web:86c6d89e0cb0bd2d3a00c5"
};

// Initialize Firebase apps
const app2 = firebase.initializeApp(firebaseConfig2, 'project2');
const app3 = firebase.initializeApp(firebaseConfig3, 'project3');

// Access authentication and Firestore instances for each project
const auth3 = app3.auth();
const firestore3 = app3.firestore();

 const auth2 = app2.auth();
const firestore2 = app2.firestore();

export { auth2, firestore2, auth3, firestore3};
//export { firestore1, firestore2};