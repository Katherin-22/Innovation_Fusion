import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin.js";
import "../../../styles/Administrador/gestion_producto.css";
import "../../../styles/Administrador/inventario.css";
import {getImagenById} from "../../../services/administrador/ImagenService.js";

import ImagenForm from "../../../layouts/Administrador/Menu/imagenForm.js";

export default function CreateImagen() {
  const { idProducto } = useParams(); // saca el id de la URL 
  console.log("idProducto desde params:", idProducto); // debería mostrar 1

  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (newImagen) => {
    setImagenes((prev) => [...prev, newImagen]);
  };

  // Traer los productos al cargar la página
  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const response = await getImagenById(idProducto); // llama tu endpoint
        setImagenes(response.data); // guarda productos en el estado
      } catch (error) {
        console.error("Error al cargar imagenes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagenes();
  }, [idProducto]);

  return (
<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">Imagenes</h1>
            </div>
        </div>
    </div>      
      <div className="main-content">
        <div className="container py-4">
          <h2 className="text-center mb-4">Gestión de Imagenes</h2>

          <ImagenForm idProducto={idProducto} onUpload={handleSubmit} />

          <div className="mt-5">
            {loading ? (
              <p>Cargando imágenes...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                        <th>Imagenes</th>
                        </tr>
                    </thead>
                        <tbody>
                        {imagenes.map((imagen) => (
                            <tr key={imagen.idImagen}>
                            <td>
                              <img src={`http://localhost:8080${imagen.urlImagen}`} alt="Producto" width="500" />
                            </td>
  
                            </tr>
                        ))}
                        </tbody>
                </table>
            )}
            </div>
        </div>
      </div>
    </div>
  )
}

