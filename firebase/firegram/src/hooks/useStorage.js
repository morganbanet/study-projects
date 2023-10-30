import { useState, useEffect } from 'react';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { projectStorage } from '../firebase/config';

export const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // // Reference for file to upload (2nd arg defines file name)
    // const storageRef = ref(projectStorage, file.name);

    // // Track upload task
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // // 1. Upload the file, listen "state_changed" to monitor progress
    // // 2. Handle unsuccessful upload
    // // 3. Handle successful upload on complete (get the download URL)
    // uploadTask(storageRef, file).on(
    //   'state_changed',
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    //     setProgress(progress);
    //   },
    //   (error) => {
    //     setError(error.message);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       setUrl(downloadURL);
    //     });
    //   }
    // );

    const upload = async () => {
      try {
        const storageRef = ref(projectStorage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for progress & update state
        uploadTask.on('state_changed', (snap) => {
          const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(progress);
        });

        // Wait for upload to complete
        await uploadTask;

        // Get download url
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadURL);
      } catch (error) {
        console.log(error);
      }
    };

    upload();
  }, [file]);

  return { progress, url, error };
};
