import { useEffect, useState } from "react";
import { getPromociones } from "../../services/administrador/PromocionService";

export const useGetPromociones = () => {
  const [promociones, setPromociones] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getPromociones()
      .then((res) => setPromociones(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { promociones, loading };
};