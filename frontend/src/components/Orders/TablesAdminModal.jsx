import useAxios from "../../hooks/useAxios";
import AddTablesForm from "./AddTablesForm";
import ClearIcon from "@mui/icons-material/Clear";
import QRCodeGenerator from "../QR code/QrCode";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function TablesAdminModal({
  tables,
  setTables,
  setShowModal,
  handleShowToast,
}) {
  const { axiosPost, isPosting, errors, axiosDelete } = useAxios();
  const { user, isAuth } = useContext(AuthContext);

  async function handleSubmit(newTable) {
    const response = await axiosPost(
      "https://resticy-production.up.railway.app/tables",
      newTable
    );
    //si esta todo ok agrega la mesa al array, evitando llamar de nuevo a la API
    if (response.ok) {
      setTables((prev) => [...prev, { ...response.data }]);
      setShowModal(false);
      handleShowToast("Mesa agregada correctamente", "success");
    }
  }

  async function handleDelete(tableID) {
    const response = await axiosDelete(
      `https://resticy-production.up.railway.app/tables/${tableID}`
    );

    if (response.ok) {
      setTables(tables.filter((table) => table.id !== tableID));
      handleShowToast("Mesa eliminada correctamente", "info");
    }
  }

  return (
    <div className="bg-black/60 w-full h-screen flex flex-col px-10 lg:px-0 items-center justify-center fixed top-0 z-20">
      <div
        className="flex flex-col bg-white w-[95vw] p-10 max-h-[70vh] z-100 lg:w-[40vw] rounded-lg"
        data-aos="fade-up"
      >
        <div className="w-full  flex justify-between">
          <p className="text-3xl">Mesas actuales</p>
          <ClearIcon
            sx={{ fontSize: 40 }}
            onClick={() => setShowModal(false)}
            className="cursor-pointer"
          />
        </div>
        <ul className="my-5 max-h-[50vh] overflow-y-scroll">
          {tables.length == 0 && (
            <i className="text-sm">No hay mesas para mostrar</i>
          )}
          {tables.map((table) => (
            <li
              key={table.id}
              className="flex justify-between text-sm w-full py-2"
            >
              <p className="text-xl">Mesa {table.number}</p>
              <div>
                <DeleteIcon
                  onClick={() => handleDelete(table.id)}
                  className="cursor-pointer hover:text-red-500"
                  sx={{ fontSize: 40 }}
                />
                <QRCodeGenerator
                  restaurantID={user?.restaurantID}
                  tableID={table.id}
                  tableNumber={table.number}
                />
              </div>
            </li>
          ))}
        </ul>
        <AddTablesForm handleSubmit={handleSubmit} isPosting={isPosting} />
        <i className="text-red-500 text-sm pt-5">{errors?.number}</i>
      </div>
    </div>
  );
}
