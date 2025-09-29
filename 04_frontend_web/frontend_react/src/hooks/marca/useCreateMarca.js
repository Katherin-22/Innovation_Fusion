import { useState } from "react";
import { createMarca } from "../../services/administrador/MarcaService";

export const useCreateMarca = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateMarca = async (data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await createMarca(data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al crear marca:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleCreateMarca, loading, success };
};
