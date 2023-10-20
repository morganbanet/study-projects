import { useState, useEffect } from 'react';

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prepare to abort if component unmounted
    const abortCont = new AbortController();

    const fetchBlogs = async () => {
      try {
        // Make fetch req
        const baseUrl = 'http://localhost:5000';
        const options = { signal: abortCont.signal };
        const response = await fetch(`${baseUrl}/${endpoint}`, options);

        // Server response error
        if (!response.ok) {
          const message = 'Error: Resource not found';
          setError(message);
          throw new Error(message);
        }

        // Update state upon success
        const data = await response.json();

        setData(data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        // Req aborted error
        if (error.name === 'AbortError') {
          return console.log('Error: Request aborted');
        }

        // Update state if not aborted but fetch failed
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchBlogs();

    // Abort fetch request if component is unmounted
    return () => abortCont.abort();
  }, [endpoint]);

  // Return the data & state to mounted component
  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
