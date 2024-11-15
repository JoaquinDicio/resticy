import { useState } from "react";
import axios from "axios";

export default function useAxios() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isPosting, setIsPosting] = useState(null);

  const axiosGet = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const axiosPost = async (url, data) => {
    setIsPosting(true);
    try {
      const response = await axios.post(url, data);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsPosting(false);
    }
  };

  return { axiosGet, axiosPost, isLoading, isPosting, errors };
}
