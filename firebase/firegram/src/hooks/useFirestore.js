import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';

// col is the Firestore collection to listen to
const useFirestore = (col) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(projectFirestore, col),
      orderBy('createdAt', 'desc')
    );

    // Listen for Firestore changes (real time data)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let documents = [];

      // Get data properties and it's id
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });

      setDocs(documents);
    });

    // Unsubscribe from the listener when imageGrid component unmounts
    return () => unsubscribe();
  }, [col]);

  return { docs };
};

export default useFirestore;
