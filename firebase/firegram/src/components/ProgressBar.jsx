import { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

function ProgressBar({ file, setFile }) {
  const { url, progress } = useStorage(file);

  // Remove progress bar once we get the url (upload finished)
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div className="progress-bar" style={{ width: progress + '%' }}></div>;
}
export default ProgressBar;
