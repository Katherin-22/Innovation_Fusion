import api_url from "./api";

// Crear un nuevo stock
export const createStock = async (idProducto, stockData) => {
    return await api_url.post(`/stock/${idProducto}`,stockData);
};

// Obtener todos los stocks
export const getStock = async () => {
    return await api_url.get("/publico/stocks");
};

// Obtener un stock por ID de producto
export const getStockByProducto = async (idProducto) => {
    return await api_url.get(`/publico/stock/producto/${idProducto}`);
};

// Obtener un stock por ID 
export const getStockById = async (idStock) => {
    return await api_url.get(`/publico/stock/${idStock}`);
};


// Actualizar un stock
export const updateStock = async (idProducto, idStock, stockData) => {
    return await api_url.put(`/producto/${idProducto}/stock/${idStock}`,stockData);
};

// Eliminar un stock
export const deleteStock = async (idStock) => {
    return await api_url.delete(`/stock/${idStock}`);
};

// Obtener variaciones de un producto
export const getVariationsByProductId = async (idProducto) => {
    return await api_url.get(`/publico/stock/variaciones/${idProducto}`);
};



