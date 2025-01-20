export default function ConfirmDelete({ isOpen, item, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[30vw] h-[30vh] p-8 rounded-lg shadow-lg w-100 relative">
        <h2 className="text-2xl font-bold mb-4">Eliminar producto</h2>
        <p className="mb-4 text-lg text-gray-700">
          ¿Seguro que deseas eliminar <strong>{item?.name}</strong>?
        </p>
        <p>Este producto se <b>eliminará permanentemente</b> sin poder recuperarse en un futuro.</p>
        <div className="flex w-[90%] justify-end gap-4 absolute bottom-7">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
