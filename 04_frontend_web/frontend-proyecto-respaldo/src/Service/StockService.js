import axios from "axios";

export const increaseStock = async (itemId, quantity, reason, userName) => {
    return await axios.post(`http://localhost:9090/api/v1.0/stock/increase/${itemId}`,
        null,
        {
            params: { quantity, reason, userName },
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
};

export const adjustStock = async (itemId, newStock, reason, userName) => {
    return await axios.post(`http://localhost:9090/api/v1.0/stock/adjust/${itemId}`,
        null,
        {
            params: { newStock, reason, userName },
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
};

export const getStockMovements = async (itemId) => {
    return await axios.get(`http://localhost:9090/api/v1.0/stock/movements/${itemId}`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
};

export const getStockDashboard = async () => {
    return await axios.get("http://localhost:9090/api/v1.0/stock/dashboard",
        {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
};