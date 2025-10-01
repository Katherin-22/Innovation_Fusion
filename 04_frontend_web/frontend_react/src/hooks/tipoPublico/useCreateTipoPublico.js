import { useState } from "react";
import { createTipoPublico } from "../../services/administrador/TipoPublicoService";

export const useCreateTipoPublico = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateTipoPublico = async (data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await createTipoPublico(data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al crear Tipo Producto:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleCreateTipoPublico, loading, success };
};
