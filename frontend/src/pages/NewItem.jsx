import React, { useState } from "react";
import useAxios from "../hooks/useAxios";

const NewItem = () => {
  const [formData, setFormData] = useState({
      name: "",
      price: "",
      restaurant_id: "1", 
  });
  
  const [isPosting, setIsPosting] = useState(false);
  const [errors, setErrors] = useState(null);
  const { axiosPost } = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/items";
  
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("price", formData.price);
    formDataObj.append("restaurant_id", formData.restaurant_id);

    if (formData.file) {
      formDataObj.append("img", formData.file);
    }
  
    try {
      setIsPosting(true);
      await axiosPost(url, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      setErrors(error.message);
    } finally {
      setFormData({
        item: {
          name: "",
          price: "",
          restaurant_id: "1",
        },
        file: null,
      });
      setIsPosting(false);
    }
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      file: file, 
    }));
  };
  
  return (
    <div>
      <h1>Añadir un nuevo producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="restaurant_id">Restaurant ID:</label>
          <input
            type="text"
            id="restaurant_id"
            name="restaurant_id" 
            value={formData.restaurant_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label htmlFor="img">Imagen:</label>
        <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
        />
        </div>
        <button type="submit" disabled={isPosting}>
          {isPosting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {errors && <p style={{ color: "red" }}>Error: {errors}</p>}
    </div>
    
  );
};

export default NewItem;
