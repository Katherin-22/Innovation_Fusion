import { useState } from "react";
import { deleteTipoPublico } from "../../services/administrador/TipoPublicoService";

export const useDeleteTipoPublico = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeleteTipoPublico = async (id) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await deleteTipoPublico(id); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al eliminar tipo publico:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleDeleteTipoPublico, loading, success };
};
