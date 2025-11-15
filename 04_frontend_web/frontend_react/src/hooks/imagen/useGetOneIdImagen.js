import { useEffect, useState } from "react";
import { OneGetImagenById } from "../../services/administrador/ImagenService";

export const useGetOneIdImagen = (idProducto, idImagen) => {
  const [Imagen, setImagen] = useState(null); // un solo objeto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idProducto || !idImagen) return; // si no hay id, no hago nada
    OneGetImagenById(idProducto, idImagen)
      .then((res) => setImagen(res.data))
      .finally(() => setLoading(false));
  }, [idProducto, idImagen]); // se ejecuta cada vez que cambia el id

  return { Imagen, loading };
};