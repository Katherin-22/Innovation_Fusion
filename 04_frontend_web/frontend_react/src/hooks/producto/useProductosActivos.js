import { useEffect, useState } from "react";
import { buscarPorCodigo } from "../../services/administrador/ProductoService";

export const useGetStock = () => {
  const [productos, setProductosActivos] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    buscarPorCodigo()
      .then((res) => setProductosActivos(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { productos, loading };
};