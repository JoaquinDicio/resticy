import axios from "axios";
import { useEffect, useState } from "react";

export default function NewOrder() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ items: [] });
    const [selectedTable, setSelectedTable] = useState(1);
    const restaurantId = 1;

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await axios.get(`http://localhost:8080/items/${restaurantId}`);
                setItems(response.data.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        }
        fetchItems();
    }, []); 

    const addItem = (itemId) => {
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId 
                ? { ...item, quantity: (item.quantity || 0) + 1 } 
                : item
            )
        );

        setFormData(prevFormData => {
            const existingItem = prevFormData.items.find(item => item.id === itemId);

            if (existingItem) {
                return {
                    ...prevFormData,
                    items: prevFormData.items.map(item => 
                        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
            } else {
                const itemToAdd = items.find(item => item.id === itemId);
                return {
                    ...prevFormData,
                    items: [
                        ...prevFormData.items,
                        { id: itemToAdd.id, name: itemToAdd.name, price: itemToAdd.price, quantity: 1 }
                    ]
                };
            }
        });
    };

    const removeItem = (itemId) => {
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId && (item.quantity || 0) > 0 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );

        setFormData(prevFormData => {
            const existingItem = prevFormData.items.find(item => item.id === itemId);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    return {
                        ...prevFormData,
                        items: prevFormData.items.map(item => 
                            item.id === itemId 
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                        )
                    };
                } else {
                    return {
                        ...prevFormData,
                        items: prevFormData.items.filter(item => item.id !== itemId)
                    };
                }
            }

            return prevFormData;
        });
    };

    const placeOrder = async (formData) => {
        const orderDate = new Date().toISOString().split('T')[0]; 
        
        const items = formData.items.map(item => ({
            item_id: item.id, 
            quantity: item.quantity, 
            subtotal: (parseFloat(item.price) * item.quantity).toFixed(2)
        }));
    
        const total_amount = items.reduce((total, item) => total + parseFloat(item.subtotal), 0).toFixed(2);
    
        const order = {
            restaurant_id: restaurantId, 
            order_date: orderDate,
            total_amount: parseFloat(total_amount), 
            table_id: selectedTable,
            items: items 
        };
    
        await axios.post('http://localhost:8080/orders', { order });
    };
    
    return (
        <>
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Platos</h1>
                
                <div className="mb-4">
                    <label htmlFor="table-select" className="block text-sm font-medium text-gray-700 mb-1">Selecciona una mesa:</label>
                    <select
                        id="table-select"
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(parseInt(e.target.value))}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value={1}>Mesa 1</option>
                        <option value={2}>Mesa 2</option>
                        <option value={3}>Mesa 3</option>
                    </select>
                </div>

                {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                        <div>
                            <p className="text-lg font-semibold">{item.name}</p> 
                            <p className="text-gray-700">${item.price}</p>
                            <p className="text-gray-500">Cantidad: {item.quantity || 0}</p> 
                        </div>
                        <div className="flex items-center">
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200" 
                                onClick={() => addItem(item.id)}
                            >
                                Agregar
                            </button>
                            {item.quantity > 0 && (
                                <button 
                                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200" 
                                    onClick={() => removeItem(item.id)}
                                >
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button 
                    className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200" 
                    onClick={() => placeOrder(formData)}
                >
                    Hacer pedido
                </button>
            </div>
        </>
    );
}
