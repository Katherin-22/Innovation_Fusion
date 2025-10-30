import { useState } from "react";
import { updateStock } from "../../services/administrador/StockService";

export const useUpdateStock = () => {
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateStock = async (id, data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await updateStock(id, data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al actualizar stock:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleUpdateStock, load, success };
};
