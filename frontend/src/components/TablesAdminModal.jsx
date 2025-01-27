import useAxios from "../hooks/useAxios";
import AddTablesForm from "./AddTablesForm";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "./CustomButton";

export default function TablesAdminModal({
  tables,
  setTables,
  setShowModal,
  handleShowToast,
}) {
  const { axiosPost, isPosting, errors, axiosDelete } = useAxios();

  async function handleSubmit(newTable) {
    const response = await axiosPost("http://localhost:8080/tables", newTable);
    //si esta todo ok agrega la mesa al array, evitando llamar de nuevo a la API
    if (response.ok) {
      setTables((prev) => [...prev, { ...response.data }]);
      setShowModal(false);
      handleShowToast("Mesa agregada correctamente", "success");
    }
  }

  async function handleDelete(tableID) {
    const response = await axiosDelete(
      `http://localhost:8080/tables/${tableID}`
    );

    if (response.ok) {
      setTables(tables.filter((table) => table.id !== tableID));
      handleShowToast("Mesa eliminada correctamente", "info");
    }
  }

  return (
    <div className="bg-black/60 w-full h-screen flex flex-col px-10 lg:px-0 items-center justify-center fixed top-0">
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
              <CustomButton
                text="Eliminar"
                onClick={() => handleDelete(table.id)}
                className="bg-red-600 text-white px-5 mr-2 py-2 rounded hover:bg-red-500"
              />
            </li>
          ))}
        </ul>
        <AddTablesForm handleSubmit={handleSubmit} isPosting={isPosting} />
        <i className="text-red-500 text-sm pt-5">{errors?.number}</i>
      </div>
    </div>
  );
}
