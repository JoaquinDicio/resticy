import { useState } from "react";
import useAxios from "../hooks/useAxios";

export default function TableAdminModal({
  tables,
  setTables,
  showModal,
  setShowModal,
}) {
  const [newTable, setNewTable] = useState({ number: "" });
  const { axiosPost, isPosting, errors, axiosDelete } = useAxios();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axiosPost("http://localhost:8080/tables", newTable);
    //si esta todo ok agrega la mesa al array, evitando llamar de nuevo a la API
    if (response.ok) {
      setTables((prev) => [...prev, { ...response.data }]);
      setNewTable({ number: "" });
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
    showModal && (
      <div className="bg-black/60 w-full h-screen flex flex-col items-center justify-center fixed top-0">
        <div className="px-5 py-8 mb-2 bg-white w-fit h-fit rounded-lg">
          <p>Mesas actuales</p>
          <ul className="my-5 max-h-[60vh] overflow-y-scroll">
            {tables.length == 0 && (
              <i className="text-sm">No hay mesas para mostrar</i>
            )}
            {tables.map((table) => (
              <li
                key={table.id}
                className="flex justify-between text-sm w-full p-2"
              >
                <p>Mesa {table.number}</p>
                <button
                  onClick={() => handleDelete(table.id)}
                  className="bg-red-500 text-white px-1 rounded"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => handleSubmit(e)} className="flex items-center">
            <label htmlFor="tableNumber" className="text-sm">
              Nro. de la mesa:
            </label>
            <input
              name="tableNumber"
              id="tableNumber"
              type="number"
              onChange={(e) =>
                setNewTable({ ...newTable, number: e.target.value })
              }
              value={newTable.number}
              placeholder="22"
              className="p-2 w-[100px] text-center"
            />
            <input
              type="submit"
              disabled={isPosting}
              className="bg-green-500 disabled:bg-slate-200 text-white font-medium p-2 cursor-pointer"
              value={"Agregar mesa"}
            />
          </form>
          <i className="text-red-500 text-sm pt-5">{errors?.number}</i>
        </div>
        <input
          type="button"
          value={"Cerrar"}
          className="p-2 text-white font-medium text-sm cursor-pointer"
          onClick={() => setShowModal(false)}
        />
      </div>
    )
  );
}
