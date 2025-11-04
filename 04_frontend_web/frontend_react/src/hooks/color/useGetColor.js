import { useEffect, useState } from "react";
import { getColor } from "../../services/administrador/ColorService";

export const useGetColor = () => {
  const [color, setColor] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getColor()
      .then((res) => setColor(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { color, loading };
};