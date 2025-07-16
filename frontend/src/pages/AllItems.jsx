import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../hooks/useAxios";
import ConfirmDelete from "../components/AllItems/ConfirmDelete.jsx";
import NewItem from "../components/AllItems/NewItem.jsx";
import EditItemModal from "../components/AllItems/EditItemModal.jsx";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";
import { showToast } from "../utils/toastConfig";
import { ToastContainer } from "react-toastify";

export default function AllItems() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const [items, setItems] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

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
      await axiosDelete(`${baseUrl}/itemDelete/${selectedItem.id}`);
      setIsModalOpen(false);
      setSelectedItem(null);
      await fetchItems();
      handleShowToast("Producto eliminado correctamente", "info");
    }
  }

  async function fetchItems() {
    try {
      const response = await axiosGet(`${baseUrl}/items/${user.restaurantID}`);
      setItems(response.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  const handleShowToast = (message, type) => {
    showToast(message, type);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--wine-color)] pt-20 px-10 lg:px-20">
      <h1 className="text-white text-4xl pb-8 text-start">Productos</h1>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        data-aos="fade-in"
      >
        {!isLoading && items?.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="bg-white overflow-hidden rounded-lg">
              <img
                src={`${baseUrl}/uploads/${item.img}`}
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
            {isLoading ? (
              <Skeleton variant="rectangular" width={210} height={118} />
            ) : (
              "No existen productos"
            )}
          </p>
        )}
      </div>

      {isModalOpen && (
        <ConfirmDelete
          isOpen={isModalOpen}
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => confirmDelete(selectedItem?.id)}
        />
      )}

      {isNewItemOpen && (
        <NewItem
          isOpen={isNewItemOpen}
          onClose={() => setIsNewItemOpen(false)}
          onItemAdded={fetchItems}
          handleShowToast={handleShowToast}
        />
      )}

      {isEditOpen && (
        <EditItemModal
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          onEdit={fetchItems}
          onClose={() => setIsEditOpen(false)}
          handleShowToast={handleShowToast}
        />
      )}

      <div className="fixed bottom-10 right-10">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setIsNewItemOpen(true)}
          style={{ background: "#d4af37" }}
          className="hover:transition duration-300 hover:rotate-90 ease-in-out "
        >
          <AddIcon />
        </Fab>
      </div>
      <ToastContainer className="custom-toast-container" />
    </div>
  );
}
