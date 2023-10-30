import './assets/styles.css';
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
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

// Initialize authentication
const auth = getAuth();

// Create a reference to books collection
const booksCollection = collection(database, 'books');

// Create a reference to books collection via query
const booksQuery = query(
  booksCollection,
  orderBy('createdAt', 'desc')
  // where('author', '==', 'Ada Lovelace'),
);

// Get books collection documents (via real time collection data)
const unsubBooksCol = onSnapshot(booksQuery, (querySnapshot) => {
  let books = [];

  querySnapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log(books);
});

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
// getBooks() disabled ^

// Add new documents to books collection
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    // Get data form the form
    const body = {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
      createdAt: Date.now(),
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
    const id = deleteBookForm.id.value;

    // Delete book using a doc reference
    await deleteDoc(doc(booksCollection, id));

    // Clear input fields in form
    deleteBookForm.reset();
  } catch (err) {
    console.log(err);
  }
});

// Create reference to book using doc method
const bookReference = doc(booksCollection, 'LVlIaPRlqJgT3pJ7dB7h');

// Get single book from books collection
const getSingleBook = async () => {
  try {
    // Get the book document
    const book = await getDoc(bookReference);

    console.log(book.data(), book.id);
  } catch (err) {
    console.log(err);
  }
};
getSingleBook();

// Subscribe to a single document
const unsubBooksDoc = onSnapshot(bookReference, (querySnapshot) => {
  console.log(querySnapshot.data(), querySnapshot.id);
});

// Update a document
const updateBookForm = document.querySelector('.update');
updateBookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    // Get ID from form
    const id = updateBookForm.id.value;

    // Hardcoded update
    const body = {
      title: 'Sending Updates',
    };

    // Update document
    await updateDoc(doc(booksCollection, id), body);

    updateBookForm.reset();
  } catch (error) {
    console.log(error);
  }
});

const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    const snapshot = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(snapshot.user);

    signupForm.reset();
  } catch (error) {
    console.log(error);
  }
});

// Login user
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const snapshot = await signInWithEmailAndPassword(auth, email, password);

    console.log(snapshot.user);

    loginForm.reset();
  } catch (error) {
    console.log(error.message);
  }
});

// Logout user
const logout = document.querySelector('.logout');
logout.addEventListener('click', async (e) => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.log(error.message);
  }
});

// Auth subscription
const unsubAuth = onAuthStateChanged(auth, (snapshot) => {
  console.log('User status changed:');
  console.log(snapshot);
});

// Unsubscribe from auth/db changes/subscriptions
const unsubButton = document.querySelector('.unsub');
unsubButton.addEventListener('click', () => {
  console.log('Unsubscribing...');

  unsubBooksCol();
  unsubBooksDoc();
  unsubAuth();

  console.log('Unsubsubbed');
});
