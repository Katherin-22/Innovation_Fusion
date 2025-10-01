import { useState } from "react";
import { updateMarca } from "../../services/administrador/MarcaService";

export const useUpdateMarca = () => {
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateMarca = async (id, data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await updateMarca(id, data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al actualizar marca:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleUpdateMarca, load, success };
};
