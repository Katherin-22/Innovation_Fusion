import { useEffect, useState } from "react";
import { getTipoPublicoById } from "../../services/administrador/TipoPublicoService";

export const useIDGetStock = (idPublico) => {
  const [tipoPublico, setTipoPublico] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idPublico) return; // si no hay id, no hago nada
    getTipoPublicoById(idPublico)
      .then((res) => setTipoPublico(res.data))
      .finally(() => setLoad(false));
  }, [idPublico]); // se ejecuta cada vez que cambia el id

  return { tipoPublico, load };
};
