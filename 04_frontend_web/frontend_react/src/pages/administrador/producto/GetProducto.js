import React, { useState, useEffect } from 'react';
import { deleteProducto, getProductos } from "../../../services/administrador/ProductoService";
import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";

import "../../../styles/Administrador/inventario.css";
import "../../../styles/Administrador/gestion_producto.css";
import { Link } from "react-router-dom";


export default function GetProducto() {
  // Usamos el hook
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer los productos al cargar la página
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProductos(); // llama tu endpoint
        setProductos(response.data); // guarda productos en el estado
      } catch (error) {
        console.error("Error al cargar productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Eliminar producto directamente desde el service
  const handleDeleteProducto = async (idProducto) => {
    try {
        await deleteProducto(idProducto);
        setProductos(productos.filter(p => p.idProducto !== idProducto));
        alert("Producto eliminado");
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data); // "No se puede eliminar el producto porque tiene stocks asociados"
        } else {
            alert("No se pudo eliminar el producto");
        }
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">PRODUCTO</h1>
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <Link to="/crear_producto" className="btn custom-btn btn-light">Registrar Producto</Link>
            </div>
        </div>
    </div>      
        <div className="row">
            <div className="col">
                <table>
                    <thead>
                        <tr>
                        <th>Código</th>
                        <th>nombre</th>
                        <th>Tipo</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Precio de Venta</th>
                        <th>Marca</th>
                        <th>Material</th>
                        <th>Género</th>
                        <th>Estado</th>
                        <th>fechaCreacion</th>
                        <th>fechaModificacion</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.idProducto}>
                            <td>{producto.codigoReferencia}</td>
                            <td>{producto.nombreProducto}</td>
                            <td>{producto.nombreTipoProducto}</td>
                            <td>{producto.nombreCategoria}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.nombreMarca}</td>
                            <td>{producto.nombreMaterial}</td>
                            <td>{producto.nombrePublico}</td>
                            <td>{producto.estadoProducto}</td>
                            <td>{producto.fechaCreacion}</td>
                            <td>{producto.fechaModificacion}</td>
                            <td><Link to={`/producto/${producto.idProducto}`} id="boton_agregar" className="btn btn-light">Editar</Link>
                             
                            <button
                            className="btn btn-light"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de eliminar este producto?")) {
                                handleDeleteProducto(producto.idProducto);
                                }
                            }}
                            >
                            Eliminar
                            </button>
                            <Link to={`/producto/${producto.idProducto}/imagenes`} id="boton_agregar" className="btn btn-light">Crear imagenes</Link>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                </table>
            </div>
        </div>
</div>
  )
}
