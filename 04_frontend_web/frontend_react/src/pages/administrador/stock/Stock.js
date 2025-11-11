import React, { useState, useEffect } from 'react';
import {getStock, deleteStock  } from "../../../services/administrador/StockService";
import MenuAdmin from "../../../layouts/administrador/menuAdmin";

import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";
import { Link, useParams } from 'react-router-dom';

export default function Stock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);  

  // Traer los stocks al cargar la página
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await getStock();
        console.log("Stock desde API:", response.data); // <-- aquí revisa los nombres
        setStock(response.data);
      } catch (error) {
        console.error("Error al cargar stock", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

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
                <h1 className="mb-0">STOCK GENERAL</h1>
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <Link to="/ver_categoria" className="btn custom-btn btn-light">Categoria</Link>
                <Link to="/ver_producto" className="btn custom-btn btn-light">Producto</Link>
                <Link to="/ver_promocion" className="btn custom-btn btn-light">Promoción</Link>
            </div>
        </div>
    </div>      
        <div className="row">
            <div className="col">
                <table>
                    <thead>
                        <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Tipo Producto</th>
                        <th>Precio de Venta</th>
                        <th>Talla Disponible</th>
                        <th>Color Disponible</th>
                        <th>Stock Actual</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {stock.map((s) => (
                            <tr>
                            <td>{s.codigoReferencia}</td>
                            <td>{s.nombreProducto}</td>
                            <td>{s.nombreTipoProducto}</td>
                            <td>{s.precio}</td>
                            <td>{s.nombre}</td>
                            <td>{s.nombreColor}</td>
                            <td>{s.stockActual}</td>
                            <td>{s.estadoProducto}</td>
                            <td>
                            <Link to={`/stock/producto/${s.idProducto}`} id="boton_eliminar" className="btn btn-light">Agregar Stock</Link>
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
