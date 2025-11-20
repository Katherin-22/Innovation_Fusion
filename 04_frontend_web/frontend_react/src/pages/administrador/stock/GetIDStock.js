import React, { useState, useEffect } from 'react';
import {getStockByProducto , deleteStock  } from "../../../services/administrador/StockService";
import MenuAdmin from "../../../layouts/administrador/menuAdmin";

import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";
import { Link, useParams } from 'react-router-dom';

export default function GetIDStock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const { idProducto } = useParams();

  const [nombreProducto, setNombreProducto] = useState("");


console.log("idProducto desde URL:", idProducto);


  // Traer los stocks al cargar la página
  useEffect(() => {
    const fetchStockId = async (idProducto) => {
      try {
        const response = await getStockByProducto (idProducto);
        setStock(response.data);
      if (response.data.length > 0) {
        setNombreProducto(response.data[0].nombreProducto);
      }
      } catch (error) {
        console.error("Error al cargar stock", error);
      } finally {
        setLoading(false);
      }
    };

    if (idProducto) {
        fetchStockId(idProducto); //  solo se ejecuta si hay id en la URL
    }
  }, [idProducto]);

  // Función para eliminar un stock directamente desde el service
  const handleDeleteStock = async (idStock) => {
    console.log("Intentando eliminar idStock:", idStock); // <--- revisa esto
    if (!window.confirm("¿Estás seguro de eliminar este stock?")) return;

    try {
      await deleteStock(idStock);
      setStock(stock.filter(s => s.idStock !== idStock)); // actualizamos la lista
      alert("Stock eliminado");
    } catch (error) {
      console.error("Error al eliminar stock", error);
      alert("No se pudo eliminar el stock. Revisa si tiene relaciones activas.");
    }
  };

  if (loading) return <p>Cargando stock...</p>;

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">Stock </h1>
                {/*{nombreProducto}*/}
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <Link to={`/stock/${idProducto}`}className="btn custom-btn btn-light">Registrar Stock</Link>
                <Link to="/ver_color" className="btn custom-btn btn-light">Color</Link>
            </div>
        </div>
    </div>      
        <div className="row">
            <div className="col">
                <table>
                    <thead>
                        <tr>
                        <th>Talla Disponible</th>
                        <th>Color Disponible</th>
                        <th>Stock Actual</th>
                        <th>Stock Minimo</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {stock.map((s) => (
                            <tr>
                            <td>{s.nombre}</td>
                            <td>{s.nombreColor}</td>
                            <td>{s.stockActual}</td>
                            <td>{s.stockMinimo}</td>
                            <td><Link to={`/producto/${s.idProducto}/stock/${s.idStock}`} id="boton_agregar" className="btn btn-light">Editar</Link>
                            <button
                            className="btn btn-light"
                            onClick={() => handleDeleteStock(s.idStock)}
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
