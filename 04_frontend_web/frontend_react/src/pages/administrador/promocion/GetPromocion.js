import React, { useState, useEffect } from 'react';
import {getPromociones, deletePromocion } from "../../../services/administrador/PromocionService";
import MenuAdmin from "../../../layouts/administrador/menuAdmin";

import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";
import { Link, useParams } from 'react-router-dom';

export default function GetPromocion() {
  const [promocion, setPromocion] = useState([]);
  const [loading, setLoading] = useState(true);  

  // Traer los stocks al cargar la página
  useEffect(() => {
    const fetchPromocion = async () => {
      try {
        const response = await getPromociones();
        console.log("promocion desde API:", response.data); // <-- aquí revisa los nombres
        setPromocion(response.data);
      } catch (error) {
        console.error("Error al cargar la promocion", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromocion();
  }, []);


  // Eliminar producto directamente desde el service
  const handleDeletePromocion = async (idPromocion) => {
    try {
        await deletePromocion(idPromocion);
        setPromocion(promocion.filter(p => p.idPromocion !== idPromocion));
        alert("Promoción eliminada");
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data); // "No se puede eliminar el producto porque tiene stocks asociados"
        } else {
        alert("No se pudo eliminar la promocion. Revisa si tiene relaciones activas.");
        }
    }
  };


  if (loading) return <p>Cargando promocion...</p>;

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">Promoción</h1>
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <Link to="/crear_promocion" className="btn custom-btn btn-light">Registrar promoción</Link>
            </div>
        </div>
    </div>      
        <div className="row">
            <div className="col">
                <table>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Código promoción</th>
                        <th>Descuento</th>
                        <th>Descripción</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {promocion.map((p) => (
                            <tr>
                            <td>{p.nombrePromocion}</td>
                            <td>{p.codigoPromocion}</td>
                            <td>{p.descuento}</td>
                            <td>{p.descripcion}</td>
                            <td>{p.fechaInicio}</td>
                            <td>{p.fechaFin}</td>
                            <td>{p.estadoPromocion}</td>
                            <td>
                            <button
                            className="btn btn-light"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de eliminar esta promoción?")) {
                                handleDeletePromocion(p.idPromocion);
                                }
                            }}
                            >
                            Eliminar
                            </button>
                            <Link to={`/promocion/${p.idPromocion}`} id="boton_eliminar" className="btn btn-light">Editar</Link>
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
