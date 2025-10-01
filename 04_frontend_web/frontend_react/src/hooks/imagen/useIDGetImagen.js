import { useEffect, useState } from "react";
import { getImagenById } from "../../services/administrador/ImagenService";

export const useIDGetImagen = (idProducto) => {
  const [imagen, setImagen] = useState(null);  // guardará la imagen obtenida
  const [load, setLoad] = useState(true);      // indicador de carga
  const [error, setError] = useState(null);    // manejo de error

  useEffect(() => {
    if (!idProducto) {
      setImagen(null);
      setLoad(false);
      return;
    }

    setLoad(true);
    setError(null);

    getImagenById(idProducto)
      .then((res) => setImagen(res.data))
      .catch((err) => {
        console.error("Error al obtener imagen:", err);
        setError(err);
      })
      .finally(() => setLoad(false));
  }, [idProducto]);

  return { imagen, load, error };
};
