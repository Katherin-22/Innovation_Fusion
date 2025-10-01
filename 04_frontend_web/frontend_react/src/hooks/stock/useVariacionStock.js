import { useEffect, useState } from "react";
import { getVariationsByProductId } from "../../services/administrador/StockService";

export const useVariacionStock = (idProducto) => {
  const [stock, setStock] = useState([]); // un array de variaciones
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idProducto) return; // si no hay id, no hago nada
    getVariationsByProductId(idProducto)
      .then((res) => setStock(res.data))
      .finally(() => setLoad(false));
  }, [idProducto]); // se ejecuta cada vez que cambia el id

  return { stock, load };
};
