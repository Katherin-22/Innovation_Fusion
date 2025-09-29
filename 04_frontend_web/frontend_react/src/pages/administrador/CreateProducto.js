import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useCreateProducto} from "../../hooks/producto/useCreateProducto";
import {useGetCategorias} from "../../hooks/categoria/useGetCategoria";
import {useGetMarca} from "../../hooks/marca/useGetMarca";
import {useGetMaterial} from "../../hooks/material/useGetMaterial";
import {useGetTipoPublicos} from "../../hooks/tipoPublico/useGetTipoPublico";
import {useGetPromociones} from "../../hooks/promocion/useGetPromocion";
import MenuAdmin from '../../layouts/administrador/MenuAdmi';
import "../../styles/administrador/inventario.css";
import "../../styles/administrador/gestion_producto.css"

export default function CreateProducto() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    let navigate=useNavigate();

        const [producto,setproducto]=useState({ 
        nombreProducto:"",
        codigoReferencia:"",
        descripcion:"",
        precio: "",
        estadoProducto:"",
        idCategoria: "",
        idMarca: "",
        idMaterial: "",
        idPublico: "",
        idPromocion: ""
    });

    const { nombreProducto, codigoReferencia, descripcion, precio, estadoProducto } = producto;

    // Hooks personalizados para cargar selects
    const { categorias } = useGetCategorias();
    const { marcas } = useGetMarca();
    const { materiales } = useGetMaterial();
    const { publicos } = useGetTipoPublicos();
    const { promociones } = useGetPromociones();

    // Hook personalizado para crear producto
    const { handleCreateProducto, loading, success } = useCreateProducto();
  
{/*...user: copia lo que ya tenga el objeto user (username: "ana23" // agrega un campo nuevo)*/}   
{/*e.target.name: se vincula con name=email */}    
{/*e.target.value → el valor que escribió el usuario. */}
{/*onInputChange(e)= Lo guarda en el estado user.
Cuando escribes algo, React captura ese valor (e.target.value)
Y lo guarda en user con setUsers.*/}
    const onInputChange=(e)=>{
        setproducto({...producto, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
{/*evita que se recargue la página */}
        e.preventDefault();
{/*manda los datos (user) al backend.*/}
        await handleCreateProducto(producto); // manda datos al backend
{/*después de guardar, te lleva a la página principal */}
        navigate("/Administrador/stock")
    }
};
  return (
    
<div class="main-content">
    <div class="header">    
        <div class="row custom-header">
            <div class="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 class="mb-0">Registro producto</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" class="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form class="container py-4" onSubmit={(e)=> onSubmit(e)}> 
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            <div class="col">
                <label class="form-label">Categoria</label>
                <select name="idCategoria" value={producto.idCategoria} onChange={(e)=>onInputChange(e)} class="form-select">
                {categorias.map((categoria) => (
                <option key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.nombre}
                </option>
                ))}
                </select>
            </div>

            <div class="col">
                <label class="form-label">Código de referencia</label>
                <input type="text" 
                name="codigoReferencia" 
                placeholder="Ingresa nombre del producto"
                class="form-control" 
                value={codigoReferencia} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div class="col">
                <label class="form-label">Nombre del producto</label>
                <input type="text" 
                name="nombreProducto" 
                placeholder="Ingresa nombre del producto"
                class="form-control" 
                value={nombreProducto} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div class="col">
                <label class="form-label">Marca</label>
                <select name="idMarca" value={producto.idMarca} onChange={(e)=>onInputChange(e)} class="form-select">
                {marcas.map((marca) => (
                <option key={marca.idMarca} value={marca.idMarca}>
                    {marca.nombre}
                </option>
                ))}
                </select>
            </div>

            <div class="col">
                <label class="form-label">Descripción</label>
                <textarea class="form-control" 
                name="descripcion"
                placeholder="Ingresa una descripción del producto"
                class="form-control" 
                value={descripcion} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>
 
            <div class="col">
                <label class="form-label">Precio de venta</label>
                <input type="text" 
                name="precio" 
                placeholder="Ingresa el precio del producto"
                class="form-control" 
                value={precio} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div class="col">
                <label class="form-label">Material</label>
                <select name="material" id="material" class="form-select">
                    <option value="">Selecciona material</option>
                    <option value="cuero">Cuero</option>
                    <option value="sintetico">Cuero sintético</option>
                    <option value="tela">Tela</option>
                </select>
            </div>

            <div class="col">
                <label class="form-label">Género</label>
                <select name="genero" id="gen" class="form-select">
                    <option value="">Selecciona género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                </select>
            </div>

            <div class="col">
                <label class="form-label">Estado del Producto</label>
                <select name="estado" id="estado" class="form-select">
                    <option value="elegir">Elegir</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Descontinuado">Descontinuado</option>
                </select>
            </div>

            <div class="col">
                <label class="form-label">Imagen del producto</label>
                <input type="file" name="imagen" class="form-control">
            </div>

            <div class="col">
                <label class="form-label">Fecha de ingreso</label>
                <input type="date" name="fechaIngreso" class="form-control">
            </div>

            <div class="col">
                <label class="form-label">Fecha de modificacion</label>
                <input type="date" name="fechaIngreso" class="form-control">
            </div>

            <div class="col">
                <label class="form-label">Promocion del producto</label>
                <select name="estado" id="estado" class="form-select">
                    <option value="elegir">Elegir</option>
                    <option value="Activo">a</option>
                    <option value="Inactivo">b</option>
                    <option value="Descontinuado">c</option>
                </select>
            </div>

            </div>

<div class="row row-cols-1">
            <div class="col-12 text-center">
                <button type="submit" class="btn mt-3 custom-btn">Guardar producto</button>
                {loading ? "Guardando..." : "Guardar"}
                <button type="submit" class="btn mt-3 custom-btn-1">Vaciar Campos</button>
            </div>
        </div>
    </form>
</div>

  )
}
