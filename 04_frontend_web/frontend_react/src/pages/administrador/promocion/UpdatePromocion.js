import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getPromocionById, updatePromocion} from "../../../services/administrador/PromocionService";

import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function UpdatePromocion() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    let navigate=useNavigate();

    // este valor sale al final de usefect: }, [idProducto]); (useIDGetProductoId)
    // ademas lo que este en const {}, debe ir en : await handleUpdateProducto(idProducto, producto);
    const { idPromocion } = useParams(); // esto se usa cuando se va a editar

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const [promocion,setPromocion]=useState({ 
        nombrePromocion:"",
        codigoPromocion: "",
        descuento: "",
        descripcion: "",
        fechaFin: "",
        estadoPromocion: ""
    });

    const opcionesEstado = ['Activo', 'Inactivo'];
    const { nombrePromocion, codigoPromocion, descuento, descripcion, fechaFin, estadoPromocion} = promocion;

    // Traer los productos al cargar la página
    useEffect(() => {
    const fetchPromocionId = async () => {
        try {
        const response = await getPromocionById(idPromocion);
        const data = response.data;

        // Desanidar el tipoProducto, trae el idTipoProducto directamente
        setPromocion({
            nombrePromocion: data.nombrePromocion,
            codigoPromocion: data.codigoPromocion,
            descuento: data.descuento,
            descripcion: data.descripcion,
            fechaFin: data.fechaFin,
            estadoPromocion: data.estadoPromocion
        });
        } catch (error) {
        console.error("Error al cargar la promocion", error);
        } finally {
        setLoading(false);
        }
    };

    if (idPromocion) fetchPromocionId();
    }, [idPromocion]);

    

    const handleUpdatePromocion = async (idPromocion, data) => {
        setLoading(true); // paso 1: activar "cargando"
        try {
        await updatePromocion(idPromocion, data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        navigate("/ver_promocion")
        } catch (error) {
        console.error("Error al actualizar la promocion:", error);
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoading(false);         // paso 4: quitar "cargando"
        }
    };

    //aca se pone los return de los hooks, por ejemplo: 
    // return { tipoPublicos, loading };

    const onInputChange=(e)=>{
        setPromocion({...promocion, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleUpdatePromocion(idPromocion, promocion); // acá le pasas el id y los datos(como esta en el hook)
    }

  // Mostrar loading mientras trae el producto
  if (loading) return <p>Cargando categoria...</p>;

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Editar Promocion</h1>
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
            {loading  ? "Guardando..." : "Submit"}
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
