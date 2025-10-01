import { useState } from "react";
import { updateTipoPublico } from "../../services/administrador/TipoPublicoService";

export const useUpdateTipoPublico = () => {
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateTipoPublico = async (id, data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await updateTipoPublico(id, data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al actualizar tipo publico:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleUpdateTipoPublico, load, success };
};
