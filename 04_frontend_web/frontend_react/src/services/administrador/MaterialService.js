import api_url from "./api";

// Crear un nuevo Material
export const createMaterial = async (materialData) => {
    return await api_url.post("/material",materialData);
};

// Obtener todos los Material
export const getMateriales = async () => {
    return await api_url.get("/publico/materiales");
};

// Obtener un Material por ID
export const getMaterialById  = async (idMaterial) => {
    return await api_url.get(`/publico/material/${idMaterial}`);
};

// Actualizar un Material
export const updateMaterial = async (idMaterial, materialData) => {
    return await api_url.put(`/material/${idMaterial}`,materialData);
};

// Eliminar un Material
export const deleteMaterial = async (idMaterial) => {
    return await api_url.delete(`/material/${idMaterial}`);
};



