import { useEffect, useState } from "react";
import { getTipoProducto } from "../../services/administrador/TipoProductoService.js";

export const useGetTipoProducto = () => {
  const [TipoProducto, setStock] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getTipoProducto()
      .then((res) => setStock(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { TipoProducto, loading };
};