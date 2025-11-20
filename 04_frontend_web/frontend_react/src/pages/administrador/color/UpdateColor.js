import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getColorById, updateColor } from "../../../services/administrador/ColorService";
import MenuAdmin from "../../../layouts/administrador/menuAdmin";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function UpdateColor() {

    const { idColor } = useParams(); // esto se usa cuando se va a editar

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    let navigate=useNavigate();

    const [colores,setColores]=useState({ 
        nombreColor:""
    });

    const { nombreColor } = colores;   

    // Traer los productos al cargar la página
    useEffect(() => {
    const fetchColorId = async () => {
        try {
        const response = await getColorById(idColor);
        const data = response.data;

        // Desanidar el tipoProducto, trae el idTipoProducto directamente
        setColores({
            nombreColor: data.nombreColor
        });
        } catch (error) {
        console.error("Error al cargar el color", error);
        } finally {
        setLoading(false);
        }
    };

    if (idColor) fetchColorId();
    }, [idColor]);



    const handleUpdateColor = async (idColor, data) => {
        setLoading(true); // paso 1: activar "cargando"
        try {
        await updateColor(idColor, data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        navigate("/ver_color")
        } catch (error) {
        console.error("Error al actualizar el color:", error);
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoading(false);         // paso 4: quitar "cargando"
        }
    };

    const onInputChange=(e)=>{
        setColores({...colores, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleUpdateColor(idColor, colores); // acá le pasas el id y los datos(como esta en el hook)
    }

  // Mostrar loading mientras trae el producto
  if (loading) return <p>Cargando color...</p>;

  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Editar Color</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form className="container py-4" onSubmit={(e)=> onSubmit(e)}> 
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            <div className="col">
                <label className="form-label">Nombre Color</label>
                <input type="text" 
                name="nombreColor" 
                placeholder="Ingresa el nombre del color"
                className="form-control" 
                value={nombreColor} 
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
            <Link className="btn btn-outline-danger mx-2" to="/ver_color">
                Cancel
            </Link>
        </div>
    </form>
</div>

  )
}
