// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from 'firebase/storage';
import { FieldValue, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4-Ykwd-eMJF7zIrfVOVO9ChC20-8UAcU',
  authDomain: 'firegram-a68d8.firebaseapp.com',
  projectId: 'firegram-a68d8',
  storageBucket: 'firegram-a68d8.appspot.com',
  messagingSenderId: '1054040060280',
  appId: '1:1054040060280:web:8522043cdebef77d3c188d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage & Firestore
const projectStorage = getStorage();
const projectFirestore = getFirestore();

export { projectStorage, projectFirestore };
