
import { useState, useRef } from 'react';
import axios from 'axios';


function useFetch(url, config) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const fetch = useRef(performFetch);

  async function performFetch() {
    setLoading(true);
    setError(false);
    setData({});

    //Perform the fetch
    try {
      const result = await axios.get(url, config);
      setData(result.data);
      setLoading(false);
      setError(false);
    }
    catch(err) {
      setLoading(false);
      setError(err);
      setData({});
    }

  }

  return [{ loading, error, data }, fetch.current ];

}

export default useFetch;