import './assets/styles.css';
import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBLJxwT_gXKDp4LiT81yPFYeI7XLz-Kjx8',
  authDomain: 'fir-9-dojo-673e3.firebaseapp.com',
  projectId: 'fir-9-dojo-673e3',
  storageBucket: 'fir-9-dojo-673e3.appspot.com',
  messagingSenderId: '127021169213',
  appId: '1:127021169213:web:f85b1c7c9c93a08ff24854',
};
// Initialize & connect to Firebase
initializeApp(firebaseConfig);

// Initialize & connect to Firestore
const database = getFirestore();

// Create a reference to books collection
const booksCollection = collection(database, 'books');

// Get books collection documents
const getBooks = async () => {
  try {
    const querySnapshot = await getDocs(booksCollection);
    let books = [];

    querySnapshot.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });

    console.log(books);
  } catch (err) {
    console.log(err.message);
  }
};
getBooks();

// Add new documents to books collection
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    // Get data form the form
    const body = {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
    };

    // Add doc using form data
    await addDoc(booksCollection, body);

    // Clear input fields in form
    addBookForm.reset();
  } catch (err) {
    console.log(err);
  }
});

// Delete documents from books collection
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    // Create book deletion reference from books collection
    const id = deleteBookForm.id.value;

    // Delete book using reference
    await deleteDoc(doc(booksCollection, id));

    // Clear input fields in form
    deleteBookForm.reset();
  } catch (err) {
    console.log(err);
  }
});
