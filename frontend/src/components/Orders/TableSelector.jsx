import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Cookies from "js-cookie";
import Skeleton from "@mui/material/Skeleton";

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
        `https://resticy-production.up.railway.app/tables/${user.restaurantID}`
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
      <ul className="mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 gap-5">
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            className="rounded-lg"
            width={100}
            height={100}
          />
        ) : tables?.length === 0 ? (
          <i className="text-[var(--yellow-color)] w-[250px]">
            No hay mesas para mostrar.
          </i>
        ) : (
          tables?.map((table) => (
            <li
              key={table.id}
              onClick={() => handleSelectTable(table)}
              className={`hover:shadow-lg duration-200 aspect-square md:min-w-[100px] md:min-h-[100px] cursor-pointer relative shadow-sm rounded-lg flex flex-col items-center justify-center p-4 
        ${table.hasOrders ? "blinking" : "bg-[#3e3e3e22]"}`}
            >
              <p className="text-4xl">{table.number}</p>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
