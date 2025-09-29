import { useEffect, useState } from "react";
import { getMarcaById } from "../../services/administrador/MarcaService";

export const useIDGetMarca = (idMarca) => {
  const [marca, setMarca] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idMarca) return; // si no hay id, no hago nada
    getMarcaById(idMarca)
      .then((res) => setMarca(res.data))
      .finally(() => setLoad(false));
  }, [idMarca]); // se ejecuta cada vez que cambia el id

  return { marca, load };
};
