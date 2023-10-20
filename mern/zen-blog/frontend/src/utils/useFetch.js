import { useState, useEffect } from 'react';

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      try {
        const options = { signal: abortCont.signal };
        const response = await fetch(`/api/${endpoint}`, options);

        // Bad server response
        if (!response.ok) {
          const message = 'Error - Resource Not Found';
          setError(message);
          throw new Error(message);
        }

        // Update state upon success
        const data = await response.json();

        setData(data.data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        // Req aborted error
        if (error.name === 'AbortError') {
          return console.log('Error - Request aborted');
        }

        // Update state if not aborted, but fetch failed
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchData();

    // Abort fetch request if component unmounted
    return () => abortCont.abort();
  }, [endpoint]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
