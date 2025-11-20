import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {createPromocion} from "../../../services/administrador/PromocionService";

import MenuAdmin from "../../../layouts/administrador/menuAdmin";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function CreatePromocion() {
    
    let navigate=useNavigate();

    const [promocion,setPromocion]=useState({ 
        nombrePromocion:"",
        codigoPromocion: "",
        descuento: "",
        descripcion: "",
        fechaFin: "",
        estadoPromocion: ""
    });

    const opcionesEstado = ['Activo', 'Inactivo'];
    const { nombrePromocion, codigoPromocion, descuento, descripcion, fechaFin, estadoPromocion } = promocion;


    const [loading, setLoad] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const handleCreatePromocion = async (data) => {
        setLoad(true); // paso 1: activar "cargando"
        try {
        await createPromocion(data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        navigate("/ver_promocion")
        } catch (error) {
        console.error("Error al crear la promción:", error);

        // Verifica si el backend envió un mensaje
        if (error.response && error.response.data && error.response.data.errorMessage) {
        alert("⚠️ " + error.response.data.errorMessage);
        } else {
        alert("⚠️ Error desconocido al crear la promoción");
        }
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoad(false);         // paso 4: quitar "cargando"
        }
    };

    const onInputChange=(e)=>{
        setPromocion({...promocion, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleCreatePromocion(promocion); // manda datos al backend
    }

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Registrar Promoción</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form className="container py-4" onSubmit={(e)=> onSubmit(e)}> 
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            <div className="col">
                <label className="form-label">Nombre de promoción</label>
                <input type="text" 
                name="nombrePromocion" 
                placeholder="Ingresa nombre de la promoción"
                className="form-control" 
                value={nombrePromocion} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Código</label>
                <input type="text" 
                name="codigoPromocion" 
                placeholder="Ingresa el codigo de la promoción"
                className="form-control" 
                value={codigoPromocion} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Porcentaje</label>
                <input type="number" 
                name="descuento" 
                placeholder="Ingresa el procentaje del descuento "
                className="form-control" 
                value={descuento} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Descripción</label>
                <input type="text" 
                name="descripcion" 
                placeholder="Ingresa la descripción de la promoción"
                className="form-control" 
                value={descripcion} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Fecha de fin</label>
                <input type="date" 
                name="fechaFin" 
                placeholder="Ingresa la fecha de finalización"
                className="form-control" 
                value={fechaFin} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Estado de la Promoción</label>
                <select name="estadoPromocion" value={estadoPromocion} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {opcionesEstado.map((estado) => (
                <option key={estado} value={estado}>
                    {estado}
                </option>
                ))}
                </select>
            </div>

        </div>

<div className="row row-cols-1">
{/* esto es para enviar el formulario*/} 
            <button type="submit" className="btn btn-outline-primary" disabled={loading}>
            {loading ? "Guardando..." : "Submit"}
            </button>

            {/* esto es para cancelar el formulario*/} 
            <Link to="/ver_promocion" className="btn btn-outline-danger mx-2">
                Cancel
            </Link>
        </div>
    </form>
</div>

  )
}
