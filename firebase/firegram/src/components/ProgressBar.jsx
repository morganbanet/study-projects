import { useEffect } from 'react';
import { motion } from 'framer-motion';

import useStorage from '../hooks/useStorage';

function ProgressBar({ file, setFile }) {
  const { url, progress } = useStorage(file);

  // Remove progress bar once we get the url (upload finished)
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
}
export default ProgressBar;
