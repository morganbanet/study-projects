import { useState, useEffect } from 'react';

import { projectStorage } from '../firebase/config';
import { projectFirestore } from '../firebase/config';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // References
    const storageRef = ref(projectStorage, file.name);

    const collectionRef = collection(projectFirestore, 'images');

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Upload file & listen for progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      // If success
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const body = { url: downloadURL, createdAt: serverTimestamp() };
          await addDoc(collectionRef, body); // Save URL to Firestore
          setUrl(downloadURL);
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
