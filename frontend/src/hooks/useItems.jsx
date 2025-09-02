import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useItems() {

    const [items, setItems] = useState([])

    const [isLoading, setLoading] = useState(false)

    const { user } = useContext(AuthContext)

    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {

        getItems()

    }, [])

    async function getItems() {
        try {
            setLoading(true)

            const response = await axios.get(`${baseUrl}/items/${user?.restaurantID}`)

            if (response.status === 200) {
                setItems(response.data)
            }

        } catch (error) {

            console.log("ERROR obteniendo los items:", error)

        } finally {

            setLoading(false)

        }
    }

    async function deleteItem(id) {

        try {

            return await axios.delete(`${baseUrl}/itemDelete/${id}`)

        } catch (error) {

            console.log('ERROR eliminado el articulo:', error)

        }

    }

    return { deleteItem, items, setItems, getItems, isLoading }
}