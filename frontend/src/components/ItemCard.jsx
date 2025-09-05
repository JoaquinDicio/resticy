export default function ItemCard({ item, handleEdit, handleDelete }) {
  const baseUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="bg-white overflow-hidden rounded-lg">
      <img
        src={`${baseUrl}/uploads/${item.img}`}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
        <p className="text-gray-700 text-sm">${item.price}</p>
      </div>
      <div>
        <button
          onClick={() => handleEdit(item)}
          className="h-[4rem] w-[50%] text-white bg-[var(--yellow-color)]"
        >
          Editar
        </button>
        <button
          onClick={() => handleDelete(item)}
          className="h-[4rem] w-[50%] bg-red-500 text-white"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
