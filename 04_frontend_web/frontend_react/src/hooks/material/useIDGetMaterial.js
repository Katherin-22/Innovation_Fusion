import { useEffect, useState } from "react";
import { getMaterialById } from "../../services/administrador/MaterialService";

export const useIDGetMaterialById = (idMaterial) => {
  const [material, setMaterial] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idMaterial) return; // si no hay id, no hago nada
    getMaterialById(idMaterial)
      .then((res) => setMaterial(res.data))
      .finally(() => setLoad(false));
  }, [idMaterial]); // se ejecuta cada vez que cambia el id

  return { material, load };
};
