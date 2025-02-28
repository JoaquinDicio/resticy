import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import updatePayment from "../utils/updatePayment";

export default function Success() {
  const [searchParams] = useSearchParams();
  //obtengo los datos del pago
  const externalReference = searchParams.get("external_reference");
  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    // si estan los dos elementos quiere decir que se pago por mercado pago
    if (paymentId && externalReference) {
      updatePayment(externalReference);
    }
  }, []);

  return (
    <section className="flex items-center justify-center w-[95%] mx-auto min-h-screen">
      <div
        data-aos="fade-up"
        className="text-center rounded bg-white p-10 max-w-[420px]"
      >
        <h1 className="text-2xl font-bold mb-4">¡Gracias por tu pedido!</h1>
        <h2>Hemos recibido tu orden con éxito y ya la estamos preparando</h2>
      </div>
    </section>
  );
}
