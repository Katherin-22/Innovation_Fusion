import api_url from "./api";

// Crear un nuevo Promocion
export const createPromocion = async (promocionData) => {
    return await api_url.post("/promocion",promocionData);
};

// Obtener todos los Promociones
export const getPromociones = async () => {
    return await api_url.get("/publico/promociones");
};

// Obtener un Promocion por ID
export const getPromocionById  = async (idPromocion) => {
    return await api_url.get(`/publico/promocion/${idPromocion}`);
};

// Actualizar un Promocion
export const updatePromocion = async (idPromocion, promocionData) => {
    return await api_url.put(`/promocion/${idPromocion}`,promocionData);
};

// Eliminar un Promocion
export const deletePromocion = async (idPromocion) => {
    return await api_url.delete(`/promocion/${idPromocion}`);
};


