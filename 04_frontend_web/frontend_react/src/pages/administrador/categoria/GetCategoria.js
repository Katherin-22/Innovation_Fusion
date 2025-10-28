import React, { useState, useEffect } from 'react';
import { deleteCategoria, getCategorias } from "../../../services/administrador/CategoriaService";
import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";

import "../../../styles/Administrador/inventario.css";
import "../../../styles/Administrador/gestion_producto.css";
import { Link } from "react-router-dom";


export default function GetCategoria() {
  // Usamos el hook
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer los productos al cargar la página
  useEffect(() => {
    const fetchcategorias = async () => {
      try {
        const response = await getCategorias(); // llama tu endpoint
        setCategorias(response.data); // guarda productos en el estado
      } catch (error) {
        console.error("Error al cargar la Categoria", error);
      } finally {
        setLoading(false);
      }
    };

    fetchcategorias();
  }, []);

  // Eliminar producto directamente desde el service
  const handleDeleteCategoria = async (idCategoria) => {
    try {
        await deleteCategoria(idCategoria);
        setCategorias(categorias.filter(p => p.idCategoria !== idCategoria));
        alert("Categoria eliminada");
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data); // "No se puede eliminar el producto porque tiene stocks asociados"
        } else {
            alert("No se pudo eliminar la categoria");
        }
    }
  };

  if (loading) return <p>Cargando categorias...</p>;
  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">CATEGORIAS</h1>
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <Link to="/categoria" className="btn custom-btn btn-light">Registrar Categoria</Link>
            </div>
        </div>
    </div>      
        <div className="row">
            <div className="col">
                <table>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Tipo de Producto</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.idCategoria}>
                            <td>{categoria.nombreCategoria}</td>
                            <td>{categoria.nombreTipoProducto}</td>
                            <td><Link to={`/producto/${categoria.idCategoria}`} id="boton_agregar" className="btn btn-light">Editar</Link>
                            
                            <button
                            className="btn btn-light"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de eliminar este producto?")) {
                                handleDeleteCategoria(categoria.idProducto);
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
            </div>
        </div>
</div>
  )
}

