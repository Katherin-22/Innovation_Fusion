import { useState } from "react";
import { createPromocion } from "../../services/administrador/PromocionService";

export const useCreatePromocion = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreatePromocion = async (data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await createPromocion(data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al crear promocion:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleCreatePromocion, loading, success };
};
