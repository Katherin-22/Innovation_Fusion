import { useEffect, useState } from "react";
import { getProductoId } from "../../services/administrador/ProductoService";

export const useIDGetProductoId = (idProducto) => {
  const [producto, setProducto] = useState(null); // un solo objeto
  const [load, setLoad] = useState(true);

useEffect(() => {
  if (!idProducto) return; 
  getProductoId(idProducto)
    .then((res) => {
        console.log("Respuesta API producto:", res);
        setProducto(res.data);
    })
    .catch((err) => console.error("Error cargando producto", err))
    .finally(() => setLoad(false));
}, [idProducto]);


  return { producto, load };
};
