import React from 'react'
import {getStock} from "../../hooks/stock/useGetStock"
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
                        <th>Categoría</th>
                        <th>Subcategoría</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio de Venta</th>
                        <th>Precio Interno</th>
                        <th>Imagen</th>
                        <th>Proveedor</th>
                        <th>Marca</th>
                        <th>Fecha de Ingreso</th>
                        <th>Color Disponible</th>
                        <th>Material</th>
                        <th>Género</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                        {stock.map((stock) => (
                            <tr>
                            <td>stock.</td>
                            <td>Zapato deportivos</td>
                            <td>Zapatos</td>
                            <td>Deportivo</td>
                            <td>Zapato ideal para correr</td>
                            <td>100</td>
                            <td>$50.000</td>
                            <td>$30.000</td>
                            <td><img src="./img/zapatos.jpg" alt="Zapato Deportivo X" width="50"></td>
                            <td>Proveedor A</td>
                            <td>Marca X</td>
                            <td>2025-04-06</td>
                            <td>Rojo, Azul</td>
                            <td>Cuero</td>
                            <td>Unisex</td>
                            <td><a href="./REGISTRO_PRODUCTO.HTML" id="boton_agregar" className="btn btn-light">Editar</a>
                                <a href="#" id="boton_eliminar" className="btn btn-light">Eliminar</a>
                                <a href="#" id="boton_eliminar" className="btn btn-light">Agregar Tallas/colores</a></td>
        
                            </tr>
                        ))}
                            <tr>
                            <td>67890</td>
                            <td>Bolso de Mano Elegante</td>
                            <td>Bolsos</td>
                            <td>De Mano</td>
                            <td>Bolso elegante para uso diario</td>
                            <td>50</td>
                            <td>$80.000</td>
                            <td>$60.000</td>
                            <td><img src="./img/bolso.jpg" alt="Bolso Elegante" width="50"></td>
                            <td>Proveedor B</td>
                            <td>Marca Y</td>
                            <td>2025-04-05</td>
                            <td>Negro, Beige</td>
                            <td>Tela</td>
                            <td>Femenino</td>
                            <td><a href="./REGISTRO_PRODUCTO.HTML" id="boton_agregar" className="btn btn-light">Editar</a><a href="#" id="boton_eliminar" className="btn btn-light">Eliminar</a></td>
                            </tr>
                            
                            <!-- Más productos -->
                        </tbody>
                </table>
            </div>
        </div>
</div>

<script src="/ModuloAdministrador/js/script.js"></script>

  )
}
