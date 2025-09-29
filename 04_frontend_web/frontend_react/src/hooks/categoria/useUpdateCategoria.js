import { useState } from "react";
import { updateCategoria } from "../../services/administrador/CategoriaService";

export const useUpdateCategoria= () => {
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateCategoria= async (id, data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await updateCategoria(id, data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al actualizar categoria:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleUpdateCategoria, load, success };
};
