import { useEffect, useState } from "react";
import { getImagen } from "../../services/administrador/ImagenService";

export const useGetImagen = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getImagen()
      .then((res) => setImagenes(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { imagenes, loading };
};