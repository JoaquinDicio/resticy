import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../hooks/useAxios";
import axios from "axios";

export default function AllItems() {
  //se trae el dato de restaurantID mediante la cookie guardada
  const [user, setUser] = useState(JSON.parse(Cookies.get("user")));
  const [items, setItems] = useState([]);
  const { axiosGet } = useAxios();

  //sidebar
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  function handleEdit(item) {
    setSelectedItem(item);
    setIsSidebarOpen(true);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
    setSelectedItem(null);
  }

  function handleDelete(item) {
    setItemToDelete(item);
    setIsModalOpen(true);
  }

  async function confirmDelete(id) {
    await axios.delete(`http://localhost:8080/itemDelete/${id}}`);
    setIsModalOpen(false);
    setItemToDelete(null);
    await fetchItems();
  }

  function closeModal() {
    setIsModalOpen(false);
    setItemToDelete(null);
  }

  // se cargan los productos mediante axios utilizando el id de la cookie

  async function fetchItems(id) {
    try {
      const response = await axiosGet(
        `http://localhost:8080/items/${user.restaurantID}`
      );
      setItems(response.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--wine-color)]">
      <h1 className="text-white text-xl text-center">Productos</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-6 p-4">
        {items && items.length > 0 ? (
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
            No existen productos cargados.
          </p>
        )}
      </div>

      {/* modal de confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Estás seguro?</h2>
            <p className="mb-4 text-gray-700">
              ¿Seguro que deseas eliminar <strong>{itemToDelete?.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => confirmDelete(itemToDelete?.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  defaultValue={selectedItem?.name}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Precio</label>
                <input
                  type="number"
                  defaultValue={selectedItem?.price}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeSidebar}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[var(--yellow-color)] text-white px-4 py-2 rounded-lg"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
