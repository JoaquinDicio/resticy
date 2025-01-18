import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Cookies from "js-cookie";

export default function TableSelector({
  tables,
  setSelectedTable,
  setTables,
  setModal,
}) {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const { axiosGet, isLoading } = useAxios();

  useEffect(() => {
    async function getTables() {
      const response = await axiosGet(
        `http://localhost:8080/tables/${user.restaurantID}`
      );
      setTables(response.data);
    }

    getTables();
  }, []);

  async function handleSelectTable(table) {
    setSelectedTable(table);
    setModal(true);
  }

  return (
    <>
      <ul className="mt-5 flex flex-wrap flex-wrap gap-5">
        {isLoading && <p>Cargando mesas...</p>}
        {tables?.length == 0 && (
          <i className="text-[var(--yellow-color)]">
            No hay mesas para mostrar
          </i>
        )}
        {tables?.map((table) => (
          <li
            key={table.id}
            onClick={() => handleSelectTable(table)}
            className="hover:shadow-lg duration-200 min-w-[80px] cursor-pointer relative shadow-sm bg-white rounded-sm flex flex-col items-center p-4 w-fit"
          >
            <p className="font-medium text-4xl">{table.number}</p>
            {table.hasOrders && (
              <span className="absolute right-[-15px] top-[-15px] mt-2 text-center rounded-full font-medium text-sm py-1 px-2 bg-green-500 text-white">
                🔔
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
