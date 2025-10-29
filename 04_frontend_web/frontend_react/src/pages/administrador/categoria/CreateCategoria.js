import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {createCategoria} from "../../../services/administrador/CategoriaService";

import {useGetTipoProducto} from "../../../hooks/tipoProducto/useGetTipoProducto";

import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";
import "../../../styles/Administrador/inventario.css";
import "../../../styles/Administrador/gestion_producto.css";

export default function CreateCategoria() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    let navigate=useNavigate();

        const [categoria,setcategoria]=useState({ 
        nombreCategoria:"",
        idTipoProducto: ""
    });

    const [loading, setLoad] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const estadoProductos = ['Activo', 'Inactivo', 'Descontinuado'];
    const { nombreCategoria } = categoria;

    const handleCreateCategoria = async (data) => {
        setLoad(true); // paso 1: activar "cargando"
        try {
        await createCategoria(data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        alert("✅ Categoria creada correctamente");
        } catch (error) {
        console.error("Error al crear la categoria:", error);

        // Verifica si el backend envió un mensaje
        if (error.response && error.response.data && error.response.data.errorMessage) {
        alert("⚠️ " + error.response.data.errorMessage);
        } else if (error.response && error.response.data && error.response.data.message) {
        alert("⚠️ " + error.response.data.message);
        } else {
        alert("⚠️ Error desconocido al crear la categoria");
        }
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoad(false);         // paso 4: quitar "cargando"
        }
    };

    const { TipoProducto } = useGetTipoProducto();

    const onInputChange=(e)=>{
        setcategoria({...categoria, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleCreateCategoria(categoria); // manda datos al backend
        navigate("/ver_categoria")
    }

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Registrar Categoria</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form className="container py-4" onSubmit={(e)=> onSubmit(e)}> 
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            <div className="col">
                <label className="form-label">Tipo de Producto</label>
                <select name="idTipoProducto" value={categoria.idTipoProducto} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {TipoProducto.map((Tp) => (
                <option key={Tp.idTipoProducto} value={Tp.idTipoProducto}>
                    {Tp.nombreTipoProducto}
                </option>
                ))}
                </select>
            </div>

            <div className="col">
                <label className="form-label">Nombre de Categoria</label>
                <input type="text" 
                name="nombreCategoria" 
                placeholder="Ingresa nombre de la categoria"
                className="form-control" 
                value={nombreCategoria} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

        </div>

<div className="row row-cols-1">
{/* esto es para enviar el formulario*/} 
            <button type="submit" className="btn btn-outline-primary" disabled={loading}>
            {loading ? "Guardando..." : "Submit"}
            </button>


            {/* esto es para cancelar el formulario*/} 
            <Link className="btn btn-outline-danger mx-2" to="/ver_categoria">
                Cancel
            </Link>
        </div>
    </form>
</div>

  )
}
