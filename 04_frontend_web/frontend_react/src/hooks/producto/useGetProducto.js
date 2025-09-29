import { useEffect, useState } from "react";
import { getProductos } from "../../services/administrador/ProductoService";

export const useGetStock = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getProductos()
      .then((res) => setProductos(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { productos, loading };
};