import { useState, useEffect, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { isEqual } from 'lodash-es';

axios.defaults.baseURL = 'http://localhost:8080';

const useAxios = ({ url, method, data }: AxiosRequestConfig): [any, boolean] => {

  const [response, setResponse] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const prevObj = useRef();

  useEffect(() => {

    if(data && isEqual(data, prevObj.current) === true) {
      console.log('여기 계속 들어가나봐...',data, prevObj.current);
      return;
    }
    prevObj.current = data;

    const fetchData = async () => {
      try {
        await axios.request({
          url,
          method,
          data
        });
        setResponse(1);
      } catch (err) {
      } finally {
        setLoading(true);
      }
    }

    fetchData();
  }, [url, method, data]);

  return [response, loading];
}

export default useAxios;