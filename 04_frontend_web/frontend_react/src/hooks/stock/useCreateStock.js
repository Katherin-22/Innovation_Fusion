import { useState } from "react";
import { createStock } from "../../services/admi/StockService";

export const useCreateStock = () => {
  const [loading, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateStock = async (data) => {
    setLoad(true); // paso 1: activar "cargando"
    try {
      await createStock(data); // paso 2: enviar datos al backend
      setSuccess(true);        // paso 3: si todo ok → marcar éxito
    } catch (error) {
      console.error("Error al crear stock:", error);
      setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
      setLoad(false);         // paso 4: quitar "cargando"
    }
  };

  return { handleCreateStock, loading, success };
};
