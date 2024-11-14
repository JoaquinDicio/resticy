import { useState } from "react";
import axios from "axios";

export default function useAxios() {
  const [isLoading, setLoading] = useState(false);

  const axiosGet = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      return response.data; 
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const axiosPost = async (url, data) => {
    setLoading(true);
    try {
      const response = await axios.post(url, data);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
    }
    setLoading(false);
  };

  return { axiosGet, axiosPost, isLoading }; 
}
