import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Cookies from "js-cookie";
import Skeleton from '@mui/material/Skeleton';

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
      <ul className="mt-5 flex flex-wrap gap-5">
        {tables?.length == 0 && (
          <i className="text-[var(--yellow-color)]">
            No hay mesas para mostrar
          </i>
        )}
        {isLoading && <Skeleton variant="rectangular" width={210} height={118} />}
        {tables?.map((table) => (
          <li
            key={table.id}
            onClick={() => handleSelectTable(table)}
            className={`hover:shadow-lg duration-200 min-w-[80px] cursor-pointer relative shadow-sm rounded-lg flex flex-col items-center p-4 w-fit 
              ${table.hasOrders
                ? "blinking"
                : "bg-[#3e3e3e22]"
              }`}
          >
            <p className="text-4xl">{table.number}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
