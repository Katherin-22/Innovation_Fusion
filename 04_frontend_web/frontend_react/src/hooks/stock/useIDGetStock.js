import { useEffect, useState } from "react";
import { getColorById } from "../../services/administrador/ColorService";

export const usIDGetColor = (idColor) => {
  const [Color, setColor] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idColor) return; // si no hay id, no hago nada
    getColorById(idColor)
      .then((res) => setColor(res.data))
      .finally(() => setLoad(false));
  }, [idColor]); // se ejecuta cada vez que cambia el id

  return { Color, load };
};
