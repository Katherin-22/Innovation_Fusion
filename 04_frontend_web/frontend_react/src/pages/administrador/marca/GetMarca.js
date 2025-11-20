import React, { useState, useEffect } from 'react';
import { deleteMarca, getMarca } from "../../../services/administrador/MarcaService";
import MenuAdmin from "../../../layouts/administrador/menuAdmin";

import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";
import { Link } from "react-router-dom";


export default function GetMarca() {
  // Usamos el hook
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer los productos al cargar la página
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await getMarca(); // llama tu endpoint
        setMarcas(response.data); // guarda productos en el estado
      } catch (error) {
        console.error("Error al cargar la marca", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarcas();
  }, []);

  // Eliminar producto directamente desde el service
  const handleDeleteMarca = async (idMarca) => {
    try {
        await deleteMarca(idMarca);
        setMarcas(marcas.filter(m => m.idMarca !== idMarca));
        alert("Categoria eliminada");
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data); // "No se puede eliminar el producto porque tiene stocks asociados"
        } else {
            alert("No se pudo eliminar la marca");
        }
    }
  };

  if (loading) return <p>Cargando marcas...</p>;
  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">Marcas</h1>
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <Link to="/crear_marca" className="btn custom-btn btn-light">Registrar Marca</Link>
            </div>
        </div>
    </div>      
        <div className="row">
            <div className="col">
                <table>
                    <thead>
                        <tr>
                        <th>Nombre marca</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {marcas.map((marca) => (
                            <tr key={marca.idCategoria}>
                            <td>{marca.nombreMarca}</td>

                            <td><Link to={`/marca/${marca.idMarca}`} id="boton_agregar" className="btn btn-light">Editar</Link>
                            
                            <button
                            className="btn btn-light"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de eliminar esta categoria?")) {
                                handleDeleteMarca(marca.idMarca);
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

