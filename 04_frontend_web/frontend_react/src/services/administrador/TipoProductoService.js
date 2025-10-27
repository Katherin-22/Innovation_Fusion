import api_url from "./api";

// Crear un nuevo TipoProducto
export const createTipoProducto = async (TipoProductoData) => {
    return await api_url.post("/tipo_producto",TipoProductoData);
};

// Obtener todos los TipoProducto
export const getProductos = async () => {
    return await api_url.get("/tipo_productos");
};

// Obtener un TipoProducto por ID
export const getProductoById  = async (idTipoProducto) => {
    return await api_url.get(`/tipo_producto/${idTipoProducto}`);
};

// Actualizar un TipoProducto
export const updateProducto = async (idTipoProducto, TipoProductoData) => {
    return await api_url.put(`/tipo_producto/${idTipoProducto}`,TipoProductoData);
};

// Eliminar un TipoProducto
export const deleteProducto = async (idTipoProducto) => {
    return await api_url.delete(`/tipo_producto/${idTipoProducto}`);
};
