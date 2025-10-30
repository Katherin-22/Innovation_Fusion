import { useEffect, useState } from "react";
import { getCategoriaById } from "../../services/administrador/CategoriaService";

export const useIDGetCategoria = (idCategoria) => {
  const [categoriaById, setCategoriaById] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!idCategoria) return; // si no hay id, no hago nada
    getCategoriaById(idCategoria)
      .then((res) => setCategoriaById(res.data))
      .finally(() => setLoad(false));
  }, [idCategoria]); // se ejecuta cada vez que cambia el id

  return { categoriaById, load };
};
