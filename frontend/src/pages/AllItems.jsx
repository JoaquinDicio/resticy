import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ConfirmDelete from "../components/ConfirmDelete";

export default function AllItems() {
  const [user, setUser] = useState(() =>
    JSON.parse(Cookies.get("user") || "{}")
  );
  const [items, setItems] = useState([]);
  const { axiosGet, axiosPut, axiosDelete, isLoading } = useAxios();
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "" });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      price: item.price,
    });
    setIsSidebarOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      await axiosDelete(`http://localhost:8080/itemDelete/${selectedItem.id}`);
      setIsModalOpen(false);
      setSelectedItem(null);
      await fetchItems();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = { ...formData, id: selectedItem?.id };

    await axiosPut("http://localhost:8080/items", updateData);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updateData.id
          ? { ...item, name: updateData.name, price: updateData.price }
          : item
      )
    );

    setIsSidebarOpen(false);
    setSelectedItem(null);
  };

  const fetchItems = async () => {
    try {
      const response = await axiosGet(
        `http://localhost:8080/items/${user.restaurantID}`
      );
      setItems(response.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--wine-color)]">
      <h1 className="text-white text-xl text-center">Productos</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-6 p-4">
        {!isLoading && items?.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="bg-white overflow-hidden rounded-lg">
              <img
                src={`http://localhost:8080/uploads/${item.img}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-700 text-sm">${item.price}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(item)}
                  className="h-[4rem] w-[50%] bg-[var(--yellow-color)]"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="h-[4rem] w-[50%] bg-red-500 text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center text-lg col-span-full">
            {isLoading ? "Cargando..." : "No existen productos"}
          </p>
        )}
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        selectedItem={selectedItem}
        formData={formData}
        onClose={() => setIsSidebarOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <ConfirmDelete
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => confirmDelete(selectedItem?.id)}
      />
    </div>
  );
}
