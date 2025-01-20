import useAxios from "../hooks/useAxios";
import { useEffect } from "react";

export default function TableManager() {
  const { axiosGet } = useAxios();

  useEffect(() => {
    async function getTables() {
      const response = await axiosGet("http://localhost:8080/tables");
      console.log(response);
    }

    getTables();
  }, []);

  return (
    <section>
      <h1>Adminsitrador de mesas</h1>
      <p>Desde esta pestaña podrás visualizar, agergar y eliminar tus mesas.</p>
    </section>
  );
}
