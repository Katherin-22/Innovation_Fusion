import api_url from "./api";

// Crear un nuevo TipoPublico
export const createTipoPublico = async (TipoPublicoData) => {
    return await api_url.post("/tipo_publico",TipoPublicoData);
};

// Obtener todos los TipoPublico
export const getTipoPublicos = async () => {
    return await api_url.get("/publico/tipo_publicos");
};

// Obtener un TipoPublico por ID
export const getTipoPublicoById  = async (idPublico) => {
    return await api_url.get(`/publico/tipo_publico/${idPublico}`);
};

// Actualizar un TipoPublico
export const updateTipoPublico = async (idPublico, TipoPublicoData) => {
    return await api_url.put(`/tipo_publico/${idPublico}`,TipoPublicoData);
};

// Eliminar un TipoPublico
export const deleteTipoPublico = async (idPublico) => {
    return await api_url.delete(`/tipo_publico/${idPublico}`);
};




