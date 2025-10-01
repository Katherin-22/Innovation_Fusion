import { useState } from "react";
import { createProducto } from "../../services/administrador/ProductoService";

export const useCreateProducto = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateProducto = async (data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await createProducto(data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al crear producto:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleCreateProducto, loading, success };
};
