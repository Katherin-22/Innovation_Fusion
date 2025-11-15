import { useEffect, useState } from "react";
import { getImagenById } from "../../services/administrador/ImagenService";

export const useGetIdImagen = () => {
  const [Imagen, setImagen] = useState([]);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    getImagenById()
      .then((res) => setImagen(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { Imagen, loading };
};