import api_url from "./api";

// Crear un nuevo Marca
export const createMarca = async (marcaData) => {
    return await api_url.post("/marca",marcaData);
};

// Obtener todos los Marca
export const getMarca = async () => {
    return await api_url.get("/publico/marcas");
};

// Obtener un Marca por ID
export const getMarcaById  = async (idMarca) => {
    return await api_url.get(`/publico/marca/${idMarca}`);
};

// Actualizar un Marca
export const updateMarca = async (idMarca, marcaData) => {
    return await api_url.put(`/marca/${idMarca}`,marcaData);
};

// Eliminar un Marca
export const deleteMarca= async (idMarca) => {
    return await api_url.delete(`/marca/${idMarca}`);
};



