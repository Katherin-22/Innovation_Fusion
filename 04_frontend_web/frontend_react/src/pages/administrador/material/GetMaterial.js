import React, { useState, useEffect } from 'react';
import { deleteMaterial, getMateriales } from "../../../services/administrador/MaterialService";
import MenuAdmin from "../../../layouts/administrador/menuAdmin";

import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";
import { Link } from "react-router-dom";


export default function GetMaterial() {
  // Usamos el hook
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer los productos al cargar la página
  useEffect(() => {
    const fetchcMateriales = async () => {
      try {
        const response = await getMateriales(); // llama tu endpoint
        setMateriales(response.data); // guarda productos en el estado
      } catch (error) {
        console.error("Error al cargar el material", error);
      } finally {
        setLoading(false);
      }
    };

    fetchcMateriales();
  }, []);

  // Eliminar producto directamente desde el service
  const handleDeleteMaterial = async (idMaterial) => {
    try {
        await deleteMaterial(idMaterial);
        setMateriales(materiales.filter(m => m.idMaterial !== idMaterial));
        alert("Categoria eliminada");
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data); // "No se puede eliminar el producto porque tiene stocks asociados"
        } else {
            alert("No se pudo eliminar el material");
        }
    }
  };

  if (loading) return <p>Cargando material...</p>;
  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">Materiales</h1>
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <Link to="/crear_material" className="btn custom-btn btn-light">Registrar material</Link>
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
                        {materiales.map((material) => (
                            <tr key={material.idMaterial}>
                            <td>{material.nombreMaterial}</td>
                            <td><Link to={`/material/${material.idMaterial}`} id="boton_agregar" className="btn btn-light">Editar</Link>
                            <button
                            className="btn btn-light"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de eliminar esta categoria?")) {
                                handleDeleteMaterial(material.idMaterial);
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

