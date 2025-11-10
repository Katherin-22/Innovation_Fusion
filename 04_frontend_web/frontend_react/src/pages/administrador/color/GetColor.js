import React, { useState, useEffect } from 'react';
import { getColor, deleteColor } from "../../../services/administrador/ColorService";
import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";

import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";
import { Link } from "react-router-dom";


export default function GetColor() {
  // Usamos el hook
  const [colores, setColores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer los productos al cargar la página
  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await getColor(); // llama tu endpoint
        setColores(response.data); // guarda productos en el estado
      } catch (error) {
        console.error("Error al cargar el color", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColor();
  }, []);

  // Eliminar producto directamente desde el service
  const handleDeleteColor = async (idColor) => {
    try {
        await deleteColor(idColor);
        setColores(colores.filter(c => c.idColor !== idColor));
        alert("Color eliminado");
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data); // "No se puede eliminar el producto porque tiene stocks asociados"
        } else {
            alert("No se pudo eliminar el color");
        }
    }
  };

  if (loading) return <p>Cargando color...</p>;
  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">Colores</h1>
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <Link to={"/crear_color"}  className="btn custom-btn btn-light">Registrar Color</Link>
            </div>
        </div>
    </div>      
        <div className="row">
            <div className="col">
                <table>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {colores.map((colores) => (
                            <tr key={colores.idColor}>
                            <td>{colores.nombreColor}</td>
                            <td><Link to={`/color/${colores.idColor}`} id="boton_agregar" className="btn btn-light">Editar</Link>
                            
                            <button
                            className="btn btn-light"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de eliminar este color?")) {
                                handleDeleteColor(colores.idColor);
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

