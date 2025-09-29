import api_url from "./api";

// Crear un nuevo stock
export const createStock = async (stockData) => {
    return await api_url.post("/stock",stockData);
};

// Obtener todos los stocks
export const getStock = async () => {
    return await api_url.get("/stocks");
};

// Obtener un stock por ID
export const getStockById  = async (idStock) => {
    return await api_url.get(`/stock/${idStock}`);
};

// Actualizar un stock
export const updateStock = async (idStock, stockData) => {
    return await api_url.put(`/stock/${idStock}`,stockData);
};

// Eliminar un stock
export const deleteStock = async (idStock) => {
    return await api_url.delete(`/stock/${idStock}`);
};

// Obtener variaciones de un producto
export const getVariationsByProductId = async (idProducto) => {
    return await api_url.get(`/stock/variaciones/${idProducto}`);
};



