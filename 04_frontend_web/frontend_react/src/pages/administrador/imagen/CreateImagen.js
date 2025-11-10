import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin.js";
import "../../../styles/administrador/gestion_producto.css";
import "../../../styles/administrador/inventario.css";
import {createImagen, getImagenById, deleteImagen} from "../../../services/administrador/ImagenService.js";

export default function CreateImagen() {

  const { idProducto } = useParams(); // id del producto

  const [imagenes, setImagenes] = useState([]);
  const [file, setFile] = useState(null); // archivo seleccionado
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 
  
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

  const handleCreateImagen  = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor selecciona una imagen antes de subir.");
      return;
    }

   setLoading(true);
    try {
      await createImagen(idProducto, file);
      setSuccess(true);

      // Recargar las imágenes del producto
      const actualizacion = await getImagenById(idProducto);
      setImagenes(actualizacion.data);

      setFile(null);  // limpio el estado
    } catch (error) {
    console.error("Error al crear la imagen:", error);

    // Verifica si el backend envió un mensaje
    if (error.response && error.response.data && error.response.data.errorMessage) {
    alert("⚠️ " + error.response.data.errorMessage);
    } else {
    alert("⚠️ Error desconocido al crear las imagenes");
    }
    setSuccess(false);      // si falla → marcar como no exitoso
    } finally {
    setLoading(false);         // paso 4: quitar "cargando"
    }
   };

  // Eliminar producto directamente desde el service
  const handleDeleteImagen = async (idImagen) => {
    try {
        await deleteImagen(idImagen);
        setImagenes(imagenes.filter(i => i.idImagen !== idImagen));
        alert("imagen eliminado");
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data); // "No se puede eliminar el producto porque tiene stocks asociados"
        } else {
            alert("No se pudo eliminar la imagen");
        }
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
                <h1 className="mb-0">Registrar Imagen del producto</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form
      onSubmit={handleCreateImagen}
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
      <Link className="btn btn-outline-danger mx-2" to={"/ver_producto"}>
          Cancel
      </Link>
    </form>
          <div className="mt-5">
            {loading ? (
              <p>Cargando imágenes...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                        <th>Imagenes</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {imagenes.map((imagen) => (
                            <tr key={imagen.idImagen}>
                            <td>
                              <img src={`http://localhost:8080${imagen.urlImagen}`} alt="Producto" width="350" height="350"/>
                            </td>
                            <td><Link to={`/producto/${imagen.producto.idProducto}/imagen/${imagen.idImagen}`} id="boton_agregar" className="btn btn-light">Editar</Link>
                            <button
                            className="btn btn-light"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de eliminar este color?")) {
                                handleDeleteImagen(imagen.idImagen);
                                }
                            }}
                            >
                            Eliminar
                            </button>                            
                            </td>                            
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    );
}