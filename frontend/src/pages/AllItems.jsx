import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../hooks/useAxios";
import Sidebar from "../components/Sidebar";
import ConfirmDelete from "../components/ConfirmDelete";
import NewItem from "../components/NewItem";
import EditItemModal from "../components/EditItemModal";

export default function AllItems() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const [items, setItems] = useState([]);

  const { axiosGet, axiosDelete, isLoading } = useAxios();
  const [selectedItem, setSelectedItem] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);

  function handleEdit(item) {
    setSelectedItem(item);
    setIsEditOpen(true);
  }

  function handleDelete(item) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  async function confirmDelete(id) {
    if (selectedItem) {
      await axiosDelete(`http://localhost:8080/itemDelete/${selectedItem.id}`);
      setIsModalOpen(false);
      setSelectedItem(null);
      await fetchItems();
    }
  }

  async function fetchItems() {
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
    <div className="min-h-screen bg-[var(--wine-color)] pt-20 px-10 lg:px-20">
      <h1 className="text-white text-4xl pb-8 text-start">Productos</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
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
                  className="h-[4rem] w-[50%] text-white bg-[var(--yellow-color)]"
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

      <ConfirmDelete
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => confirmDelete(selectedItem?.id)}
      />

      <NewItem
        isOpen={isNewItemOpen}
        onClose={() => setIsNewItemOpen(false)}
        onItemAdded={fetchItems}
      />

      {isEditOpen && (
        <EditItemModal
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          onEdit={fetchItems}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setIsNewItemOpen(true)}
          className="rounded-lg bg-[var(--yellow-color)] text-white font-medium px-9 py-3"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
