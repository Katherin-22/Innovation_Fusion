import { useEffect, useState } from "react";
import { getTipoPublicos } from "../../services/administrador/TipoPublicoService";

export const useGetTipoPublicos = () => {
  const [tipoPublicos, setTipoPublicos] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getTipoPublicos()
      .then((res) => setTipoPublicos(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { tipoPublicos, loading };
};