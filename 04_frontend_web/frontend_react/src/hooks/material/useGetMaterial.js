import { useEffect, useState } from "react";
import { getMateriales } from "../../services/administrador/MaterialService";

export const useGetMaterial = () => {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getMateriales()
      .then((res) => setMateriales(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { materiales, loading };
};