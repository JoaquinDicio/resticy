import ConfirmDelete from "../components/AllItems/ConfirmDelete.jsx";
import NewItem from "../components/AllItems/NewItem.jsx";
import EditItemModal from "../components/AllItems/EditItemModal.jsx";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";
import { ToastContainer } from "react-toastify";
import useItems from "../hooks/useItems.jsx";
import ItemCard from "../components/ItemCard.jsx";
import useModal from "../hooks/useModal.jsx";

export default function AllItems() {

  const { deleteItem, error, isPosting, items, editItem, isLoading, addItem } =
    useItems();

  const { modal, closeModal, openModal, payload } = useModal();


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
              handleDelete={() => openModal("delete", item)}
              handleEdit={() => openModal("edit", item)}
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

      {modal?.type === "delete" && (
        <ConfirmDelete
          item={payload}
          onClose={() => closeModal()}
          deleteFn={deleteItem}
        />
      )}

      {modal?.type === "newItem" && (
        <NewItem
          onClose={() => closeModal()}
          addItem={addItem}
          isPosting={isPosting}
          error={error}
        />
      )}

      {modal?.type === "edit" && (
        <EditItemModal
          selectedItem={payload}
          editItem={editItem}
          error={error}
          onClose={() => closeModal()}
        />
      )}

      <div className="fixed bottom-10 right-10">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => openModal("newItem")}
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
