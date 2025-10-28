import { useEffect, useState } from "react";
import { getTipoProductos } from "../../services/administrador/TipoProductoService.js";

export const useGetTipoProducto = () => {
  const [TipoProducto, setStock] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getTipoProductos()
      .then((res) => setStock(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { TipoProducto, loading };
};