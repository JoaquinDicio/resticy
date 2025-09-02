import { useState } from "react";
import useAxios from "../hooks/useAxios";
import ConfirmDelete from "../components/AllItems/ConfirmDelete.jsx";
import NewItem from "../components/AllItems/NewItem.jsx";
import EditItemModal from "../components/AllItems/EditItemModal.jsx";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";
import { showToast } from "../utils/toastConfig";
import { ToastContainer } from "react-toastify";
import useItems from "../hooks/useItems.jsx";

export default function AllItems() {

  // TODO -> Hay que utilizar las funciones de delete y edit desde el customHook de items
  // ademas actualmente se hace un fetch cada que se agrega elimina o edita algo, lo cual esta mal

  const baseUrl = import.meta.env.VITE_API_URL;

  const { deleteItem, setItems, items, getItems, isLoading } = useItems()

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

  async function confirmDelete() {
    const response = await deleteItem(selectedItem.id)

    setIsModalOpen(false);

    setSelectedItem(null);

    handleShowToast("Producto eliminado correctamente", "info");
  }


  const handleShowToast = (message, type) => {
    showToast(message, type);
  };


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
          onItemAdded={getItems}
          handleShowToast={handleShowToast}
        />
      )}

      {isEditOpen && (
        <EditItemModal
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          onEdit={getItems}
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
