import { useState } from "react";
import useAxios from "../hooks/useAxios";
import AddTablesForm from "./AddTablesForm";

export default function TablesAdminModal({ tables, setTables, setShowModal }) {
  const { axiosPost, isPosting, errors, axiosDelete } = useAxios();

  async function handleSubmit(newTable) {
    const response = await axiosPost("http://localhost:8080/tables", newTable);
    //si esta todo ok agrega la mesa al array, evitando llamar de nuevo a la API
    if (response.ok) {
      setTables((prev) => [...prev, { ...response.data }]);
      setShowModal(false);
    }
  }

  async function handleDelete(tableID) {
    const response = await axiosDelete(
      `http://localhost:8080/tables/${tableID}`
    );

    if (response.ok) {
      setTables(tables.filter((table) => table.id !== tableID));
    }
  }

  return (
    <div className="bg-black/60 w-full h-screen flex flex-col px-10 lg:px-0 items-center justify-center fixed top-0">
      <div className="flex flex-col justify-center mb-2 bg-white w-full lg:w-[30%] h-fit p-5 rounded-lg">
        <p className="text-3xl">Mesas actuales</p>
        <ul className="my-5 max-h-[60vh] overflow-y-scroll">
          {tables.length == 0 && (
            <i className="text-sm">No hay mesas para mostrar</i>
          )}
          {tables.map((table) => (
            <li
              key={table.id}
              className="flex justify-between text-sm w-full p-2"
            >
              <p className="text-xl">Mesa {table.number}</p>
              <button
                onClick={() => handleDelete(table.id)}
                className="bg-red-500 text-white px-5 py-2 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <AddTablesForm handleSubmit={handleSubmit} isPosting={isPosting} />
        <i className="text-red-500 text-sm pt-5">{errors?.number}</i>
      </div>
      <input
        type="button"
        value={"Cerrar"}
        className="p-2 text-white font-medium text-sm cursor-pointer bg-blue-500 px-5 rounded"
        onClick={() => setShowModal(false)}
      />
    </div>
  );
}
