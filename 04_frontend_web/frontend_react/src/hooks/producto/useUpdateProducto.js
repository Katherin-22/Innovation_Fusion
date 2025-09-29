import { useState } from "react";
import { updateProducto } from "../../services/administrador/ProductoService";

export const useUpdateProducto = () => {
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateProducto = async (id, data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await updateProducto(id, data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleUpdateProducto, load, success };
};
