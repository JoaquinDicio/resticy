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

  async function axiosGet(url) {
    setLoading(true);
    setErrors(null);
    try {
      const response = await axios.get(url, axiosConfig);
      return response.data;
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }

  async function axiosPost(url, data) {
    setIsPosting(true);
    setErrors(null);
    try {
      const response = await axios.post(url, data, axiosConfig);
      return response.data;
    } catch (error) {
      const { response } = error;
      setErrors(response.data.error);
      return response.data;
    } finally {
      setIsPosting(false);
    }
  }

  async function axiosPut(url, data) {
    setLoading(true);
    try {
      const response = await axios.put(url, data, axiosConfig);
      return response.data;
    } catch (error) {
      const { response } = error;
      setErrors(response.data.error);
    } finally {
      setLoading(false);
    }
  }

  async function axiosDelete(url) {
    setLoading(true);
    try {
      const response = await axios.delete(url, axiosConfig);
      return response.data;
    } catch (error) {
      const { response } = error;
      setErrors(response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return {
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
    isLoading,
    isPosting,
    errors,
  };
}
