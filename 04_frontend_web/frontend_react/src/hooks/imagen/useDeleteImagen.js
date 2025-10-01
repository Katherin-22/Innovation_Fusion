import { useState } from "react";
import { deleteImagen } from "../../services/administrador/ImagenService";

export const useDeleteStock = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeleteImagen = async (idProducto, idImagen) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await deleteImagen(idProducto, idImagen); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleDeleteImagen, loading, success };
};
