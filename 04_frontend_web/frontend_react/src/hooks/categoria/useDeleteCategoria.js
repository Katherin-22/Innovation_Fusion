import { useState } from "react";
import { deleteCategoria } from "../../services/administrador/CategoriaService";

export const useDeleteCategoria = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeleteCategoria = async (id) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await deleteCategoria(id); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al eliminar categoria:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleDeleteCategoria, loading, success };
};
