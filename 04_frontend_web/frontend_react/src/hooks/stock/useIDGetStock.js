import { useEffect, useState } from "react";
import { getStockById } from "../../services/administrador/StockService";

export const usIDGetStock = (idStock) => {
  const [stock, setStock] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idStock) return; // si no hay id, no hago nada
    getStockById(idStock)
      .then((res) => setStock(res.data))
      .finally(() => setLoad(false));
  }, [idStock]); // se ejecuta cada vez que cambia el id

  return { stock, load };
};
