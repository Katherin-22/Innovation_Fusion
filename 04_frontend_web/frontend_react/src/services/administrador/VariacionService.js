import api_url from "./api";

// Crear un nuevo Variacion
export const createVariacion = async (variacionData) => {
    return await api_url.post("/variacion",variacionData);
};

// Obtener todos los Variaciones
export const getVariacion = async () => {
    return await api_url.get("/publico/variaciones");
};

// Obtener un Variacion por ID de producto
export const getVariacionById = async (idVariacion) => {
    return await api_url.get(`/publico/variacion/${idVariacion}`);
};

// Actualizar un Variacion
export const updateVariacion = async (idVariacion, variacionData) => {
    return await api_url.put(`/variacion/${idVariacion}`,variacionData);
};

// Eliminar un Variacion
export const deleteVariacion = async (idVariacion) => {
    return await api_url.delete(`/variacion/${idVariacion}`);
};
