import { useState } from "react";
import { createImagen } from "../../services/administrador/ImagenService";

export const useCreateStock = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateImagen = async (idProducto, file) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await createImagen(idProducto, file); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al crear imagen:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleCreateImagen, loading, success };
};
