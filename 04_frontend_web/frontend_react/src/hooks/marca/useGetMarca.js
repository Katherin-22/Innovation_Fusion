import { useEffect, useState } from "react";
import { getMarca } from "../../services/administrador/MarcaService";

export const useGetMarca = () => {
  const [marca, setMarca] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getMarca()
      .then((res) => setMarca(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { marca, loading };
};