import { useEffect, useState } from "react";
import { getPromocionById } from "../../services/administrador/PromocionService";

export const useIDGetPromocionById = (idPromocion) => {
  const [promocion, setPromocion] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idPromocion) return; // si no hay id, no hago nada
    getPromocionById(idPromocion)
      .then((res) => setPromocion(res.data))
      .finally(() => setLoad(false));
  }, [idPromocion]); // se ejecuta cada vez que cambia el id

  return { promocion, load };
};
