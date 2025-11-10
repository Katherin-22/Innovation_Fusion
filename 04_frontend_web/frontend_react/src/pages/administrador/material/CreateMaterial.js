import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createMaterial } from "../../../services/administrador/MaterialService";

import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function CreateMaterial() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    let navigate=useNavigate();

    const [loading, setLoad] = useState(false);
    const [success, setSuccess] = useState(false);

    const [materiales, setMateriales]=useState({ 
        nombreMaterial:"",
    });
    
    const { nombreMaterial } = materiales;

    const handleCreateMaterial = async (data) => {
        setLoad(true); // paso 1: activar "cargando"
        try {
        await createMaterial(data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        navigate("/ver_material")
        } catch (error) {
        console.error("Error al crear el material:", error);

        // Verifica si el backend envió un mensaje
        if (error.response && error.response.data && error.response.data.errorMessage) {
        alert("⚠️ " + error.response.data.errorMessage);
        } else {
        alert("⚠️ Error desconocido al crear el material");
        }
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoad(false);         // paso 4: quitar "cargando"
        }
    };

    const onInputChange=(e)=>{
        setMateriales({...materiales, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleCreateMaterial(materiales); // manda datos al backend
    }

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Registrar Material</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form className="container py-4" onSubmit={(e)=> onSubmit(e)}> 
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            <div className="col">
                <label className="form-label">Nombre de material</label>
                <input type="text" 
                name="nombreMaterial" 
                placeholder="Ingresa nombre del material"
                className="form-control" 
                value={nombreMaterial} 
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
            <Link to="/ver_material" className="btn btn-outline-danger mx-2">
                Cancel
            </Link>
        </div>
    </form>
</div>

  )
}
