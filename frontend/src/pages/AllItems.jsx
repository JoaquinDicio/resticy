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
import ItemCard from "../components/ItemCard.jsx";

export default function AllItems() {
  const { deleteItem, error, isPosting, items, getItems, isLoading, addItem } =
    useItems();
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
    const response = await deleteItem(selectedItem.id);

    if (response.status === 200) {
      setIsModalOpen(false);

      setSelectedItem(null);

      handleShowToast("Producto eliminado correctamente", "info");

      return;
    }

    handleShowToast("Error intentando eliminar el producto", "error");
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
        {!isLoading && items.length > 0 ? (
          items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
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
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => confirmDelete(selectedItem?.id)}
        />
      )}

      {isNewItemOpen && (
        <NewItem
          onClose={() => setIsNewItemOpen(false)}
          addItem={addItem}
          isPosting={isPosting}
          error={error}
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
