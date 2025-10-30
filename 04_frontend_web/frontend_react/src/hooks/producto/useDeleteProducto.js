import { useState } from "react";
import { deleteProducto } from "../../services/administrador/ProductoService";

export const useDeleteProducto = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeleteProducto = async (id) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await deleteProducto(id); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleDeleteProducto, loading, success };
};
