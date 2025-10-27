import { useState } from "react";
import SideTableInfo from "../components/Orders/SideTableInfo.jsx";
import TableSelector from "../components/Orders/TableSelector.jsx";
import TablesAdminModal from "../components/Orders/TablesAdminModal.jsx";
import CustomButton from "../components/CustomButton.jsx";
import { ToastContainer } from "react-toastify";
import UseTables from "../hooks/useTables.jsx";
import useModal from "../hooks/useModal.jsx";
import useOrders from "../hooks/useOrders.jsx";

export default function Orders() {
  const { tables, setTables, createTable, isPosting, error, deleteTable } =
    UseTables();

  const { orders } = useOrders(setTables);

  const [selectedTable, setSelectedTable] = useState(null);

  const [showSide, setShowSide] = useState(false);

  const { modal, openModal, closeModal } = useModal();

  return (
    <section className="bg-gray-100 min-h-screen flex ">
      {showSide && (
        <SideTableInfo
          orders={orders}
          selectedTable={selectedTable}
          setModal={setShowSide}
        />
      )}
      <div className="p-10 pt-24">
        <h1 className="font-bold text-2xl mb-2">Mesas</h1>
        <p>
          Aqui podrás ver las órdenes que recibe tu restaurante en tiempo real.
        </p>
        <TableSelector
          setModal={setShowSide}
          setSelectedTable={setSelectedTable}
          tables={tables}
          setTables={setTables}
        />
      </div>
      <div className="flex gap-3 fixed bottom-0 right-0 p-10">
        <CustomButton
          text="Administrar mesas"
          onClick={() => openModal("AdminTables")}
        />
      </div>

      {modal?.type === "AdminTables" && (
        <TablesAdminModal
          closeModal={closeModal}
          tables={tables}
          createTable={createTable}
          isPosting={isPosting}
          deleteTable={deleteTable}
          error={error}
        />
      )}
      <ToastContainer className="custom-toast-container" />
    </section>
  );
}
