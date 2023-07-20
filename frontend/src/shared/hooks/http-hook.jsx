import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

    const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortctrl = new AbortController();
      activeHttpRequests.current.push(httpAbortctrl)
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortctrl.signal
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortctrl)

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message || "something went wrong");
        setIsLoading(false);
        throw err
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(()=>{
    return()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  },[])


  return { isLoading, error, sendRequest, clearError };
};
