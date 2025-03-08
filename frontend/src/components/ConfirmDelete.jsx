import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ConfirmDelete({ isOpen, item, onClose, onConfirm}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[95vw] lg:w-[30vw] lg:h-[auto] p-8 rounded-lg shadow-lg  relative bg-[var(--marfil-color)]" data-aos="fade-up">
        <div className='flex items-center mb-4'>
        <DeleteForeverIcon sx={{ fontSize: 40 }}/>
        <h2 className="text-2xl font-bold">Eliminar producto</h2>
        </div>
        <p className="mb-4 text-md text-lg text-gray-700">
          ¿Seguro que deseas eliminar <strong>{item?.name}</strong>?
        </p>
        <p className='text-[14px]'>Este producto se <b>eliminará permanentemente</b> sin poder recuperarse en un futuro.</p>
        <div className="flex items-end w-full mt-8 justify-end gap-4">
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
