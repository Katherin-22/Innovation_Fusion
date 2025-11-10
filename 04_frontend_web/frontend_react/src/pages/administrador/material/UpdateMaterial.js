import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMaterialById, updateMaterial } from "../../../services/administrador/MaterialService";
import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function UpdateMaterial() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    let navigate=useNavigate();

    // este valor sale al final de usefect: }, [idProducto]); (useIDGetProductoId)
    // ademas lo que este en const {}, debe ir en : await handleUpdateProducto(idProducto, producto);
    const { idMaterial } = useParams(); // esto se usa cuando se va a editar

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const [materiales, setMateriales]=useState({ 
        nombreMaterial:"",
    });
    
    const { nombreMaterial } = materiales;

    // Traer los productos al cargar la página
    useEffect(() => {
    const fetchMaterialId = async () => {
        try {
        const response = await getMaterialById(idMaterial);
        const data = response.data;

        // Desanidar el tipoProducto, trae el idTipoProducto directamente
        setMateriales({
            nombreMaterial: data.nombreMaterial
        });
        } catch (error) {
        console.error("Error al cargar el material", error);
        } finally {
        setLoading(false);
        }
    };

    if (idMaterial) fetchMaterialId();
    }, [idMaterial]);

    

    const handleUpdateMaterial = async (idMaterial, data) => {
        setLoading(true); // paso 1: activar "cargando"
        try {
        await updateMaterial(idMaterial, data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        navigate("/ver_material")
        } catch (error) {
        console.error("Error al actualizar el material:", error);
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoading(false);         // paso 4: quitar "cargando"
        }
    };

    //aca se pone los return de los hooks, por ejemplo: 
    // return { tipoPublicos, loading };

    const onInputChange=(e)=>{
        setMateriales({...materiales, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleUpdateMaterial(idMaterial, materiales); // acá le pasas el id y los datos(como esta en el hook)
    }

  // Mostrar loading mientras trae el producto
  if (loading) return <p>Cargando material...</p>;

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Editar Material</h1>
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
            {loading  ? "Guardando..." : "Submit"}
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
