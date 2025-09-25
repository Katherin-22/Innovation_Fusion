import React from 'react'
import {useGetStock } from "../../hooks/stock/useGetStock"

export default function Stock() {
  // Usamos el hook
  const { stock, loading } = useGetStock();

  if (loading) return <p>Cargando stock...</p>;

  return (

<div className="main-content">
    
    <div className="header">    
        <div className="row custom-header">
            <div className="col-3 d-flex align-items-center justify-content-between">
                <h1 className="mb-0">STOCK</h1>
            </div>
            <div className="col-9 d-flex align-items-end px-1 gap-2 w-50">
                <a href="./REGISTRO_CATEGORIA.HTML" className="btn custom-btn btn-light">Registrar Categoria</a>
                <a href="./REGISTRO_PRODUCTO.HTML" className="btn custom-btn btn-light">Registrar producto</a>
                <a href="./REGISTRO_DESCUENTO.HTML" className="btn custom-btn btn-light">Registrar Descuento</a>
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
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Stock Actual</th>
                        <th>Precio de Venta</th>
                        <th>Imagen</th>
                        <th>Marca</th>
                        <th>Talla Disponible</th>
                        <th>Color Disponible</th>
                        <th>Material</th>
                        <th>Género</th>
                        <th>Fecha de Ingreso</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {stock.map((stock) => (
                            <tr>
                            <td>{stock.codigoReferencia}</td>
                            <td>{stock.nombreProducto}</td>
                            <td>{stock.nombreTipoProducto}</td>
                            <td>{stock.nombreCategoria}</td>
                            <td>{stock.descripcion}</td>
                            <td>{stock.stockActual}</td>
                            <td>imagen</td>
                            <td>{stock.nombreMarca}</td>
                            <td>{stock.nombre}</td>
                            <td>{stock.nombreColor}</td>
                            <td>{stock.nombreMaterial}</td>
                            <td>{stock.nombrePublico}</td>
                            <td>{stock.fechaCreacion}</td>
                            <td><a href="./REGISTRO_PRODUCTO.HTML" id="boton_agregar" className="btn btn-light">Editar</a>
                                <a href="#" id="boton_eliminar" className="btn btn-light">Eliminar</a>
                                <a href="#" id="boton_eliminar" className="btn btn-light">Agregar Tallas/colores</a></td>

                            </tr>
                        ))}
                        </tbody>
                </table>
            </div>
        </div>
</div>
  )
}
