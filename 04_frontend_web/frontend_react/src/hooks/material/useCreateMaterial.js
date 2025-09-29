import { useState } from "react";
import { createCategoria } from "../../services/administrador/CategoriaService";

export const useCreateCategoria = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateCategoria = async (data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await createCategoria(data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al crear categoria:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleCreateCategoria, loading, success };
};
