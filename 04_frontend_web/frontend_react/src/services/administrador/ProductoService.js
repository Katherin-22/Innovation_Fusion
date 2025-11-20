import api_url from "./api";

// Crear un nuevo producto
export const createProducto = async (productoData) => {
    return await api_url.post("/producto",productoData);
};

// Obtener todos los productos
export const getProductos = async () => {
    return await api_url.get("/productos");
};

// Obtener los productos activos
export const getProductosActivos = async () => {
    return await api_url.get("/publico/productos_activos");
};

// Obtener un stock por ID
export const getProductoId  = async (idProducto) => {
    return await api_url.get(`/publico/producto/${idProducto}`);
};

// Obtener el producto por codigo de referencia
export const buscarPorCodigo  = async (codigoReferencia) => {
    return await api_url.get(`/buscar_producto/${codigoReferencia}`);
};

// Actualizar un producto
export const updateProducto = async (idProducto, stockData) => {
    return await api_url.put(`/producto/${idProducto}`,stockData);
};

// Eliminar un producto
export const deleteProducto = async (idProducto) => {
    return await api_url.delete(`/producto/${idProducto}`);
};

