import { useEffect, useState } from "react";
import { getProductoId } from "../../services/administrador/ProductoService";

export const useIDGetProductoId = (idStock) => {
  const [producto, setProducto] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idStock) return; // si no hay id, no hago nada
    getProductoId(idStock)
      .then((res) => setProducto(res.data))
      .finally(() => setLoad(false));
  }, [idStock]); // se ejecuta cada vez que cambia el id

  return { producto, load };
};
