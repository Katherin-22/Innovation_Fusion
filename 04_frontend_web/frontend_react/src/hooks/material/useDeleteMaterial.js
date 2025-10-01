import { useState } from "react";
import { deleteMaterial } from "../../services/administrador/MaterialService";

export const useDeleteMaterial = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeleteMaterial = async (id) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await deleteMaterial(id); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al eliminar material:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleDeleteMaterial, loading, success };
};
