import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

export default function useStats() {
    const [dailyTotal, setDailyTotal] = useState(0);

    const [ordersWeekQuantity, setOrdersWeekQuantity] = useState(0);

    const [ordersMonthQuantity, setOrdersMonthQuantity] = useState(0);

    const [monthPayments, setMonthPayments] = useState([]);

    const [weekPayments, setWeekPayments] = useState([])

    const [monthlyData, setMonthlyData] = useState([]);

    const [popularDishes, setPopularDishes] = useState([])

    const { user } = useContext(AuthContext);

    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        getRestaurantDaliy();
        getRestaurantMonthlyData();
        getOrdersWeekQuantity();
        getOrdersMonthQuantity();
        getMonthTotalPayments();
        getWeekTotalPayments();
        getPopularDishes()
    }, [user]);

    // gets the daily summary with withdrawed chash
    async function getRestaurantDaliy() {
        try {
            const response = await fetch(
                `${baseUrl}/payments/summary/${user?.restaurantID}`
            );

            const data = await response.json();

            setDailyTotal(data.dailyTotal);
        } catch (e) {
            console.log("Error obteniendo el resumen diario", e);
        }
    }

    // returns the total number of orders for each month, used for the chart
    async function getRestaurantMonthlyData() {
        try {

            const response = await axios.get(
                `${baseUrl}/payments/monthly-summary/${user?.restaurantID}`
            );

            if (response.status === 200) setMonthlyData(response.data);

        } catch (e) {

            console.log("Error obteniendo los datos mensuales:", e);

        }
    }

    //returns the total number of orders in the current week
    async function getOrdersWeekQuantity() {
        try {
            const response = await axios.get(
                `${baseUrl}/restaurant/${user?.restaurantID}/weekly`
            );

            if (response.status == 200) setOrdersWeekQuantity(response.data.length);
        } catch (e) {
            console.log("Error obteniendo la cantidad semanal:", e);
        }
    }

    //returns the total number of orders in the current month
    async function getOrdersMonthQuantity() {
        try {
            const response = await axios.get(
                `${baseUrl}/restaurant/${user?.restaurantID}/monthly`
            );

            setOrdersMonthQuantity(response.data);
        } catch (e) {
            console.log("Error obteniendo la cantidad de ordenes mensuales:", e);
        }
    }

    // returns the total cash of the current month
    async function getMonthTotalPayments() {
        try {
            const response = await axios.get(
                `${baseUrl}/payments/monthly/${user?.restaurantID}`
            );

            if (response.status === 200) setMonthPayments(response.data);
        } catch (e) {
            console.error("Error obteniendo pagos mensuales:", e);
        }
    }

    async function getWeekTotalPayments() {
        try {
            const response = await axios.get(
                `${baseUrl}/payments/weekly/${user?.restaurantID}`
            );

            if (response.status === 200) setWeekPayments(response.data)
        } catch (e) {
            console.error("Error obteniendo los pagos semanales:", e)
        }
    }

    async function getPopularDishes() {
        try {

            const response = await axios.get(`${baseUrl}/restaurant/${user?.restaurantID}/popular-dishes`)

            if (response.status === 200) setPopularDishes(response.data)

        } catch (e) {

            console.error("Error obteniendo los platos populares:", e)

        }
    }

    return {
        dailyTotal,
        ordersWeekQuantity,
        monthlyData,
        ordersMonthQuantity,
        monthPayments,
        weekPayments,
        popularDishes
    };
}
