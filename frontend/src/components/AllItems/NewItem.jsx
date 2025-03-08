import { useState, useRef } from "react";
import useAxios from "../../hooks/useAxios";
import InputField from "../InputField";
import ClearIcon from "@mui/icons-material/Clear";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import Button from "@mui/material/Button";

export default function NewItem({
  isOpen,
  onClose,
  onItemAdded,
  handleShowToast,
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const { axiosPost, errors, isPosting } = useAxios();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }

    setFormData((prevState) => ({
      ...prevState,
      file: file,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://resticy-production.up.railway.app/items";

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("price", formData.price);

    if (formData.file) {
      formDataObj.append("img", formData.file);
    }

    try {
      await axiosPost(url, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      handleShowToast("Producto agregado correctamente", "success");
      if (onItemAdded) {
        onItemAdded();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        name: "",
        price: "",
        file: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    }
  };
  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-[var(--marfil-color)] w-[95vw] lg:w-[40vw] p-10 rounded-lg relative"
        data-aos="fade-up"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-start text-2xl lg:text-4xl font-bold">
              Agregar producto
            </h2>
            <div className="hidden md:block">
              <AddReactionOutlinedIcon
                className="ml-3 hidden"
                sx={{ fontSize: 40 }}
              />
            </div>
          </div>
          <button type="button" onClick={onClose}>
            <ClearIcon sx={{ fontSize: 40 }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputField
              label="Nombre del producto"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Hamburguesa"
              required
            />
            {errors && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <InputField
              label="Precio ( hasta $100.000 )"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ej: 12000"
              max="100000"
              required
            />
            {errors && <p className="text-red-500">{errors.price}</p>}
          </div>

          <div className="flex flex-col items-center w-full md:flex-row">
            <div className="flex items-center w-full">
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className=" w-full text-sm hidden"
                required
              />

              <Button variant="outlined" onClick={handleFileClick}>
                Subir una foto
              </Button>

              {fileName && (
                <span className="text-gray-700 text-sm ml-3 max-w-[130px] truncate ">
                  {fileName}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="px-10 py-2 rounded-lg bg-[#d4af37] mt-5 text-white"
              disabled={isPosting}
            >
              {isPosting ? "Enviando..." : "Subir"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
