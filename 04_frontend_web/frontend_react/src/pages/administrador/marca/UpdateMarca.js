import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMarcaById, updateMarca } from "../../../services/administrador/MarcaService";
import MenuAdmin from "../../../layouts/administrador/menuAdmin";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function UpdateMarca() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    let navigate=useNavigate();

    const { idMarca } = useParams(); // esto se usa cuando se va a editar

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const [marcas, setMarcas]=useState({ 
        nombreMarca:""
    });

    const { nombreMarca } = marcas;

    // Traer los productos al cargar la página
    useEffect(() => {
    const fetchMarcaId = async () => {
        try {
        const response = await getMarcaById(idMarca);
        const data = response.data;

        // Desanidar el tipoProducto, trae el idTipoProducto directamente
        setMarcas({
            nombreMarca: data.nombreMarca,
        });
        } catch (error) {
        console.error("Error al cargar la marca", error);
        } finally {
        setLoading(false);
        }
    };

    if (idMarca) fetchMarcaId();
    }, [idMarca]);

    

    const handleUpdateMarca = async (idMarca, data) => {
        setLoading(true); // paso 1: activar "cargando"
        try {
        await updateMarca(idMarca, data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        navigate("/ver_marca")
        } catch (error) {
        console.error("Error al actualizar la marca:", error);
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoading(false);         // paso 4: quitar "cargando"
        }
    };

    //aca se pone los return de los hooks, por ejemplo: 
    // return { tipoPublicos, loading };

    const onInputChange=(e)=>{
        setMarcas({...marcas, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleUpdateMarca(idMarca, marcas); // acá le pasas el id y los datos(como esta en el hook)
    }

  // Mostrar loading mientras trae el producto
  if (loading) return <p>Cargando marca...</p>;

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Editar Marca</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form className="container py-4" onSubmit={(e)=> onSubmit(e)}> 
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            <div className="col">
                <label className="form-label">Nombre de marca</label>
                <input type="text" 
                name="nombreMarca" 
                placeholder="Ingresa nombre de la marca"
                className="form-control" 
                value={nombreMarca} 
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
            <Link to="/ver_marca" className="btn btn-outline-danger mx-2">
                Cancel
            </Link>
        </div>
    </form>
</div>

  )
}
