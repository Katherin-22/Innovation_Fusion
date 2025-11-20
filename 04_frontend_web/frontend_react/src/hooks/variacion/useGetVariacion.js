import { useEffect, useState } from "react";
import { getVariacion } from "../../services/administrador/VariacionService";

export const useGetVariacion = () => {
  const [variacion, setVariacion] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getVariacion()
      .then((res) => setVariacion(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { variacion, loading };
};