import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategoriaById, updateCategoria } from "../../../services/administrador/CategoriaService";
import {useGetTipoProducto} from "../../../hooks/tipoProducto/useGetTipoProducto";
import MenuAdmin from "../../../layouts/administrador/menuAdmin";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function UpdateCategoria() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    let navigate=useNavigate();

    // este valor sale al final de usefect: }, [idProducto]); (useIDGetProductoId)
    // ademas lo que este en const {}, debe ir en : await handleUpdateProducto(idProducto, producto);
    const { idCategoria } = useParams(); // esto se usa cuando se va a editar

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const [categorias,setCategorias]=useState({ 
        nombreCategoria: "",
        idTipoProducto: ""
    });

    const { nombreCategoria } = categorias;
    const { TipoProducto } = useGetTipoProducto();

    // Traer los productos al cargar la página
    useEffect(() => {
    const fetchCategoriaId = async () => {
        try {
        const response = await getCategoriaById(idCategoria);
        const data = response.data;

        // Desanidar el tipoProducto, trae el idTipoProducto directamente
        setCategorias({
            nombreCategoria: data.nombreCategoria,
            idTipoProducto: data.tipoProducto?.idTipoProducto || ""
        });
        } catch (error) {
        console.error("Error al cargar la Categoria", error);
        } finally {
        setLoading(false);
        }
    };

    if (idCategoria) fetchCategoriaId();
    }, [idCategoria]);

    

    const handleUpdateCategoria = async (idCategoria, data) => {
        setLoading(true); // paso 1: activar "cargando"
        try {
        await updateCategoria(idCategoria, data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        navigate("/ver_categoria")
        } catch (error) {
        console.error("Error al actualizar la categoria:", error);
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoading(false);         // paso 4: quitar "cargando"
        }
    };

    //aca se pone los return de los hooks, por ejemplo: 
    // return { tipoPublicos, loading };

    const onInputChange=(e)=>{
        setCategorias({...categorias, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleUpdateCategoria(idCategoria, categorias); // acá le pasas el id y los datos(como esta en el hook)
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
                <h1 className="mb-0">Editar Categoria</h1>
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
                <select 
                name="idTipoProducto" 
                value={categorias.idTipoProducto}
                onChange={(e)=>onInputChange(e)} 
                className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {TipoProducto.map((Tp) => (
                <option key={Tp.idTipoProducto} value={Tp.idTipoProducto}>
                    {Tp.nombreTipoProducto}
                </option>
                ))}
                </select>
            </div>

            <div className="col">
                <label className="form-label">Nombre de la categoria</label>
                <input 
                type="text" 
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
            {loading  ? "Guardando..." : "Submit"}
            </button>


            {/* esto es para cancelar el formulario*/} 
            <Link to="/ver_categoria" className="btn btn-outline-danger mx-2">
                Cancel
            </Link>
        </div>
    </form>
</div>

  )
}
