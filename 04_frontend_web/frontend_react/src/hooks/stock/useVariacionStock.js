import { useEffect, useState } from "react";
import { getVariationsByProductId } from "../../services/administrador/StockService";

export const useGetVariacionPorProducto = (idProducto) => {
  const [variacionStock, setVariacionStock] = useState([]); // un array de variaciones
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idProducto) return; // si no hay id, no hago nada
    getVariationsByProductId(idProducto)
      .then((res) => setVariacionStock(res.data))
      .finally(() => setLoad(false));
  }, [idProducto]); // se ejecuta cada vez que cambia el id

  return { variacionStock, load };
};
