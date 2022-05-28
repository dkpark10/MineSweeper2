import { useState, useEffect, useRef } from "react";
import axios from "axios";
import axiosInstance from "../../utils/default_axios";

axios.defaults.baseURL = "http://localhost:8080";

export default <T>(url: string, init? : T): [T, boolean] => {
  const [response, setResponse] = useState<T | undefined>(init);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const request = async () => {
      try {
        const { data, status } = await axiosInstance.get(url);
        if (status === 200) {
          setResponse(data);
        }
        setLoading(false);
      } catch (e) {
      } finally {
      }
    }
    request();
  }, [url])

  return [response, loading];
}