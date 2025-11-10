import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStockById, updateStock } from "../../../services/administrador/StockService";
import {useGetColor} from "../../../hooks/color/useGetColor";
import {useGetVariacionPorProducto} from "../../../hooks/stock/useVariacionStock";
import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";
import AlertMessage from "../../../components/admi/AlertMessage";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function UpdateStock() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    const { idProducto, idStock } = useParams();

    let navigate=useNavigate();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);


    const [stock, setStock]=useState({ 
        stockMinimo:"",
        stockActual: "",
        idColor: "",
        idVariacion: "",
    });
    
    const { stockMinimo, stockActual } = stock;

    const { color } = useGetColor();
    const { variacionStock } = useGetVariacionPorProducto(idProducto);

    // Traer los productos al cargar la página
    useEffect(() => {
    const fetchStockId = async () => {
        try {
        const response = await getStockById(idStock);
        const data = response.data;

        // Desanidar el tipoProducto, trae el idTipoProducto directamente
        setStock({
            stockMinimo: data.stockMinimo,
            stockActual: data.stockActual,
            idColor: data.color?.idColor || "",
            idVariacion: data.variacion?.idVariacion || "",
        });

        } catch (error) {
        console.error("Error al cargar el Stock", error);
        } finally {
        setLoading(false);
        }
    };

    if (idStock) fetchStockId();
}, [idStock]);

    

    const handleUpdateStock = async ( idProducto, idStock, data) => {
        setLoading(true); // paso 1: activar "cargando"
        try {
        await updateStock(idProducto, idStock, data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
    // Espera 3 segundos antes de redirigir
// Esperar a que el mensaje desaparezca antes de navegar
    setTimeout(() => {
        setSuccess(null); // Oculta el mensaje suavemente
        navigate(`/stock/producto/${idProducto}`, { replace: true }); // Evita doble render de historial
    }, 2500);
        } catch (error) {
        console.error("Error al actualizar el stock:", error);
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoading(false);         // paso 4: quitar "cargando"
        }
    };

    //aca se pone los return de los hooks, por ejemplo: 
    // return { tipoPublicos, loading };

    const onInputChange=(e)=>{
        setStock({...stock, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleUpdateStock(idProducto, idStock, stock); // acá le pasas el id y los datos(como esta en el hook)
    }

  // Mostrar loading mientras trae el producto
  if (loading) return <p>Cargando stock...</p>;

  return (

<div className="main-content">
    {/*} Éxito con ícono de check por 5 segundos */}
{success === true && (
  <AlertMessage
    type="success"
    icon="check-circle-fill"
    message="Stock actualizado con éxito"
  />
)}
    {/*// Peligro (error) */}
{success === false && (
  <AlertMessage
    type="danger"
    icon="exclamation-triangle-fill"
    message="No se pudo actualizar el stock"
  />
)}

    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Editar Stock</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form className="container py-4" onSubmit={(e)=> onSubmit(e)}> 
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            <div className="col">
                <label className="form-label">Stock minimo</label>
                <input type="number" 
                name="stockMinimo" 
                placeholder="Ingresa el stock minimo del producto"
                className="form-control" 
                value={stockMinimo} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Stock Actual</label>
                <input type="number" 
                name="stockActual" 
                placeholder="Ingresa el stock actual del producto"
                className="form-control" 
                value={stockActual} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Color</label>
                <select name="idColor" value={stock.idColor} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {color?.map((color) => (
                <option key={color.idColor} value={color.idColor}>
                    {color.nombreColor}
                </option>
                ))}
                </select>
            </div>

            <div className="col">
                <label className="form-label">Medidas</label>
                <select name="idVariacion" value={stock.idVariacion} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {variacionStock?.map((variacion) => (
                <option key={variacion.idVariacion} value={variacion.idVariacion}>
                    {variacion.nombre}
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
            <Link to={`/stock/producto/${idProducto}`} className="btn btn-outline-danger mx-2">
                Cancel
            </Link>
        </div>
    </form>
</div>

  )
}
