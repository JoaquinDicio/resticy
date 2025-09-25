import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export default function useStats() {
    const [dailyTotal, setDailyTotal] = useState(0)

    const [ordersWeekQuantity, setOrdersWeekQuantity] = useState(0)

    const [ordersMonthlyQuantity, setOrdersMonthlyQuantity] = useState(0)

    const { user } = useContext(AuthContext)

    async function getRestaurantDaliy() {
        try {

            const response = await fetch(
                `${baseUrl}/payments/summary/${user?.restaurantID}`
            );

            setDailyTotal(await response.json())

        } catch (e) {

            console.log("Error obteniendo el resumen diario", e)

        }
    }

    return { dailyTotal, ordersWeekQuantity, ordersMonthlyQuantity }
}