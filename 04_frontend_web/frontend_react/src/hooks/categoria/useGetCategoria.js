import { useEffect, useState } from "react";
import { getCategorias } from "../../services/administrador/CategoriaService";

export const useGetCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getCategorias()
      .then((res) => setCategorias(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { categorias, loading };
};