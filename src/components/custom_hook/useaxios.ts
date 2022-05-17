import { useState, useEffect, useRef } from "react";
import axios from "axios";
import axiosInstance from "../../utils/default_axios";

axios.defaults.baseURL = "http://localhost:8080";

type ParameterType<T> = T | T[];

export default <T>(url: string): [ParameterType<T>, boolean] => {
  const [response, setResponse] = useState<ParameterType<T>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const request = async () => {
      try {
        const { data, status } = await axiosInstance.get(url);
        if (status === 200) {
          setResponse(data);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    request();
  }, [url])

  return [response, loading];
}