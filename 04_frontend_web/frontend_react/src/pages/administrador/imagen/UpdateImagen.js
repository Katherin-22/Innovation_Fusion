import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MenuAdmin from "../../../layouts/administrador/menuAdmin";
import "../../../styles/administrador/gestion_producto.css";
import "../../../styles/administrador/inventario.css";
import {updateImagen, OneGetImagenById} from "../../../services/administrador/ImagenService.js";

export default function UpdateImagen() {

  const { idProducto, idImagen } = useParams(); // id del producto
    let navigate=useNavigate();

  const [imagen, setImagen] = useState(null);
  const [file, setFile] = useState(null); // archivo seleccionado
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 

  // Traer los productos al cargar la página
  useEffect(() => {
    const fetchImagen = async () => {
      try {
        const response = await OneGetImagenById(idProducto, idImagen); // llama tu endpoint
        setImagen(response.data); // guarda productos en el estado
      } catch (error) {
        console.error("Error al cargar imagenes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImagen();
  }, [idProducto, idImagen]);

  const handleUpdateImagen  = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor selecciona una imagen antes de subir.");
      return;
    }

   setLoading(true);
    try {
      await updateImagen(idProducto, idImagen, file);
      setSuccess(true);
      navigate(`/producto/${idProducto}/imagenes`)


      setFile(null);  // limpio el estado
    } catch (error) {
    console.error("Error al actualizar la imagen:", error);

    // Verifica si el backend envió un mensaje
    if (error.response && error.response.data && error.response.data.errorMessage) {
    alert("⚠️ " + error.response.data.errorMessage);
    } else {
    alert("⚠️ Error desconocido al actualizar las imagenes");
    }
    setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
    setLoading(false);         // paso 4: quitar "cargando"
    }
   };

  if (loading) return <p>Cargando imagenes...</p>;

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Editar Imagen</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

          <div className="mt-5">
            {loading ? (
              <p>Cargando imágenes...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                        <th>Imagen</th>
                        </tr>
                    </thead>
                        <tbody>
                            {imagen && (
                            <tr key={imagen.idImagen}>
                                <td>
                                <img src={`http://localhost:8080${imagen.urlImagen}`} alt="Producto" width="250" height="350" />
                                </td>
                            </tr>
                            )}
                        </tbody>
                </table>
                )}

                <form
                onSubmit={handleUpdateImagen}
                className="d-flex flex-column align-items-center p-3"
                >
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control mb-3"
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-3 shadow"
                >
                    Subir Imagen
                </button>
                {/* esto es para cancelar el formulario*/} 
                <Link className="btn btn-outline-danger mx-2" to={`/producto/${idProducto}/imagenes`}>
                    Cancel
                </Link>
                </form>

            </div>
        </div>
    );
}