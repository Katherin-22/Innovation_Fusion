import { useState } from "react";
import { deleteStock } from "../../services/admi/StockService";

export const useDeleteStock = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeleteStock = async (id) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await deleteStock(id); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al eliminar stock:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleDeleteStock, loading, success };
};
