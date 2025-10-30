import api_url from "./api";

// Crear una nueva imagen
export const createImagen = async (idProducto, file) => {
  const formData = new FormData();
  formData.append("urlImagen", file); // el nombre debe coincidir con @RequestParam("urlImagen")

  return await api_url.post(`/producto/${idProducto}/imagenes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Obtener todos los Imagen
export const getImagen = async () => {
    return await api_url.get("/publico/producto/imagenes");
};

// Obtener un Imagen por ID
export const getImagenById  = async (idProducto) => {
    return await api_url.get(`/publico/producto/${idProducto}/imagenes`);
};

// Actualizar una imagen existente
export const updateImagen = async (idProducto, idImagen, file) => {
  const formData = new FormData();
  formData.append("urlImagen", file); // mismo nombre que espera el backend

  return await api_url.put(
    `/producto/${idProducto}/imagen/${idImagen}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// Eliminar un Imagen
export const deleteImagen = async (idProducto,idImagen) => {
    return await api_url.delete(`/producto/${idProducto}/imagen/${idImagen}`);
};



