import api_url from "./api";

// Crear un nuevo stock
export const createCategoria = async (categoriaData) => {
    return await api_url.post("/categoria",categoriaData);
};

// Obtener todos los stocks
export const getCategorias = async () => {
    return await api_url.get("/categorias");
};

// Obtener un stock por ID
export const getCategoriaById  = async (idCategoria) => {
    return await api_url.get(`/categoria/${idCategoria}`);
};

// Actualizar un stock
export const updateCategoria = async (idCategoria, categoriaData) => {
    return await api_url.put(`/categoria/${idCategoria}`,categoriaData);
};

// Eliminar un stock
export const deleteCategoria = async (idCategoria) => {
    return await api_url.delete(`/categoria/${idCategoria}`);
};




