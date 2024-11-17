import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useAxios() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const token = Cookies.get("authToken"); //token de autenticacion de usuario

  const axiosConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  const axiosGet = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, axiosConfig);
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
      const response = await axios.post(url, data, axiosConfig);
      return response.data;
    } catch (error) {
      const { response } = error;
      setErrors(response.data.error);
    } finally {
      setIsPosting(false);
    }
  };

  return { axiosGet, axiosPost, isLoading, isPosting, errors };
}
