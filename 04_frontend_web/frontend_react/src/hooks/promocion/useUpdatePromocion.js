import { useState } from "react";
import { updatePromocion } from "../../services/administrador/PromocionService";

export const useUpdatePromocion = () => {
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdatePromocion = async (id, data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await updatePromocion(id, data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al actualizar promocion:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleUpdatePromocion, load, success };
};
