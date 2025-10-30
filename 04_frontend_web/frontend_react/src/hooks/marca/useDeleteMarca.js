import { useState } from "react";
import { deleteMarca } from "../../services/administrador/MarcaService";

export const useDeleteMarca = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeleteMarca = async (id) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await deleteMarca(id); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al eliminar marca:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleDeleteMarca, loading, success };
};
