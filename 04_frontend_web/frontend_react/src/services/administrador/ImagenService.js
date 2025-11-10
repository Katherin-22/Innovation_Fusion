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

//para mostrar TODAS las imagenes de un producto en especifico
export const getImagenById  = async (idProducto) => {
    return await api_url.get(`/publico/producto/${idProducto}/imagenes`);
};

    //para mostrar UNA imagen en especifico de un producto
export const OneGetImagenById  = async (idProducto, idImagen) => {
    return await api_url.get(`/publico/producto/${idProducto}/imagen/${idImagen}`);
};

// Actualizar una imagen existente
export const updateImagen = async (idProducto, idImagen, file) => {
  const formData = new FormData();
  formData.append("urlImagen", file); // mismo nombre que espera el backend

  return await api_url.put(
    `/producto/${idProducto}/imagen/${idImagen}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// Eliminar un Imagen
export const deleteImagen = async (idImagen) => {
    return await api_url.delete(`/imagen/${idImagen}`);
};



