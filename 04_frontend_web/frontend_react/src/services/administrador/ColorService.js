import api_url from "./api";

// Crear un nuevo Color
export const createColor = async (ColorData) => {
    return await api_url.post("/color",ColorData);
};

// Obtener todos los Colors
export const getColor = async () => {
    return await api_url.get("/publico/colores");
};

// Obtener un Color por ID de producto
export const getColorById = async (idColor) => {
    return await api_url.get(`/publico/color/${idColor}`);
};

// Actualizar un Color
export const updateColor = async (idColor, ColorData) => {
    return await api_url.put(`/color/${idColor}`,ColorData);
};

// Eliminar un Color
export const deleteColor = async (idColor) => {
    return await api_url.delete(`/color/${idColor}`);
};



