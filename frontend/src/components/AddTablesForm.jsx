import { useState } from "react";

export default function AddTablesForm({ isPosting, handleSubmit }) {
  const [newTable, setNewTable] = useState({ number: "" });

  function sendForm(e) {
    e.preventDefault();

    if (newTable.number) {
      handleSubmit(newTable);
    }
  }

  return (
    <form
      onSubmit={(e) => sendForm(e)}
      className="flex items-center flex-col lg:flex-row justify-between"
    >
      <label htmlFor="tableNumber" className="text-sm">
        Nro. de la mesa:
      </label>
      <input
        name="tableNumber"
        id="tableNumber"
        type="number"
        required
        onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
        value={newTable.number}
        placeholder="Ej: 1"
        className="p-2 w-full lg:w-[100px] text-center bg-gray-200 rounded"
      />
      <input
        type="submit"
        disabled={isPosting || !newTable.number}
        className="bg-green-500 w-full mt-2 lg:w-fit rounded disabled:bg-slate-300 text-white font-medium p-2 cursor-pointer"
        value={"Agregar mesa"}
      />
    </form>
  );
}
