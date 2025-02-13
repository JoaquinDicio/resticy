export default function OrderItemsList({ displayOrder }) {
  return (
    <>
      <div className="px-5 pb-5 h-full">
        {displayOrder?.notes && (
          <i className="text-sm">Nota: {displayOrder.notes}</i>
        )}
        <p className="text-xl w-full text-left pt-6">Orden:</p>
        <ul>
          {displayOrder?.OrderItems.map((row, i) => (
            <li key={i} className="py-3">
              <p className="flex justify-between">
                {row.Item.name}{" "}
                <span className="font-bold">$ {row.subtotal}</span>
              </p>
              <i className="text-sm text-[var(--yellow-color)]">
                Cantidad: {row.quantity}
              </i>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={` ${
          displayOrder?.is_payed ? "bg-green-500" : "bg-red-800"
        } items-center flex justify-between p-5 font-medium`}
      >
        <p>{displayOrder?.is_payed ? "Orden pagada" : "Pago pendiente"}</p>{" "}
        <p className="font-medium text-2xl">$ {displayOrder?.total_amount}</p>
      </div>
    </>
  );
}
