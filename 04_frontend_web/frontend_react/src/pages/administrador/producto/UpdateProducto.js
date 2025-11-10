import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getProductoId, updateProducto} from "../../../services/administrador/ProductoService";

import {useGetCategorias} from "../../../hooks/categoria/useGetCategoria";
import {useGetMarca} from "../../../hooks/marca/useGetMarca";
import {useGetMaterial} from "../../../hooks/material/useGetMaterial";
import {useGetTipoPublicos} from "../../../hooks/tipoPublico/useGetTipoPublico";
import {useGetPromociones} from "../../../hooks/promocion/useGetPromocion";
import MenuAdmin from "../../../layouts/Administrador/Menu/menuAdmin";
import "../../../styles/administrador/inventario.css";
import "../../../styles/administrador/gestion_producto.css";

export default function UpdateProducto() {
{/*navigate=useNavigate():Sirve para moverte entre páginas desde el código */}
{/*navigate("/"); // me lleva a la página principal */}
    
    let navigate=useNavigate();
    const { idProducto } = useParams(); // esto se usa cuando se va a editar

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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

    const estadoProductos = ['Activo', 'Inactivo', 'Descontinuado'];
    const { nombreProducto, codigoReferencia, descripcion, precio, estadoProducto } = producto;

    //aca se pone los return de los hooks, por ejemplo: 
    // return { tipoPublicos, loading };
    const { categorias } = useGetCategorias();
    const { marcas } = useGetMarca();
    const { materiales } = useGetMaterial();
    const { tipoPublicos } = useGetTipoPublicos();
    const { promociones } = useGetPromociones();

    // Traer los productos al cargar la página
    useEffect(() => {
    const fetchProductoId = async () => {
        try {
        const response = await getProductoId(idProducto);
        const data = response.data;

        // Desanidar el tipoProducto, trae el idTipoProducto directamente
        setproducto({
            nombreProducto: data.nombreProducto || "",
            codigoReferencia: data.codigoReferencia || "",
            descripcion: data.descripcion || "",
            precio: data.precio || "",
            estadoProducto: data.estadoProducto || "",
            idCategoria: data.categoria?.idCategoria || "",
            idMarca: data.marca?.idMarca || "",
            idMaterial: data.material?.idMaterial || "",
            idPublico: data.tipoPublico?.idPublico || "",
            idPromocion: data.promocion?.idPromocion || ""
        });
        } catch (error) {
        console.error("Error al cargar el producto", error);
        } finally {
        setLoading(false);
        }
    };

    if (idProducto) fetchProductoId();
    }, [idProducto]);

    

    const handleUpdateProducto = async (idProducto, data) => {
        setLoading(true); // paso 1: activar "cargando"
        try {
        await updateProducto(idProducto, data); // paso 2: enviar datos al backend
        setSuccess(true);        // paso 3: si todo ok → marcar éxito
        navigate("/ver_producto")
        } catch (error) {
        console.error("Error al crear la categoria:", error);

        // Verifica si el backend envió un mensaje
        if (error.response && error.response.data && error.response.data.errorMessage) {
        alert("⚠️ " + error.response.data.errorMessage);
        } else {
        alert("⚠️ Error desconocido al crear la categoria");
        }
        setSuccess(false);      // si falla → marcar como no exitoso
        } finally {
        setLoading(false);         // paso 4: quitar "cargando"
        }
    };

    //aca se pone los return de los hooks, por ejemplo: 
    // return { tipoPublicos, loading };

    const onInputChange=(e)=>{
        setproducto({...producto, [e.target.name]: e.target.value});
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        await handleUpdateProducto(idProducto, producto); // acá le pasas el id y los datos(como esta en el hook)
    }

  // Mostrar loading mientras trae el producto
  if (loading) return <p>Cargando producto...</p>;
  return (

<div className="main-content">
    <nav>
        <MenuAdmin />
    </nav>
    <div className="header">    
        <div className="row custom-header">
            <div className="col-12 d-flex align-items-center justify-content-between px-4 w-100">
                <h1 className="mb-0">Editar producto</h1>
                <a href="./INVENTARIO(PRINCIPAL).HTML" className="btn btn-light custom-btn-exit">
                    <img src="../img/caret-left.png" alt=""/>
                </a>
            </div>
        </div>
    </div>  

    <form className="container py-4" onSubmit={(e)=> onSubmit(e)}> 
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            <div className="col">
                <label className="form-label">Categoria</label>
                <select name="idCategoria" value={producto.idCategoria} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {categorias.map((categoria) => (
                <option key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.nombreCategoria}
                </option>
                ))}
                </select>
            </div>

            <div className="col">
                <label className="form-label">Código de referencia</label>
                <input type="text" 
                name="codigoReferencia" 
                placeholder="Ingresa nombre del producto"
                className="form-control" 
                value={codigoReferencia} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Nombre del producto</label>
                <input type="text" 
                name="nombreProducto" 
                placeholder="Ingresa nombre del producto"
                className="form-control" 
                value={nombreProducto} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Marca</label>
                <select name="idMarca" value={producto.idMarca} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {marcas.map((marca) => (
                <option key={marca.idMarca} value={marca.idMarca}>
                    {marca.nombreMarca}
                </option>
                ))}
                </select>
            </div>

            <div className="col">
                <label className="form-label">Descripción</label>
                <textarea 
                name="descripcion"
                placeholder="Ingresa una descripción del producto"
                className="form-control" 
                value={descripcion} 
                onChange={(e)=>onInputChange(e)}
                ></textarea>
            </div>
 
            <div className="col">
                <label className="form-label">Precio</label>
                <input type="number" 
                name="precio" 
                placeholder="Ingresa el precio del producto"
                className="form-control" 
                value={precio} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="col">
                <label className="form-label">Material</label>
                <select name="idMaterial" value={producto.idMaterial} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {materiales.map((material) => (
                <option key={material.idMaterial} value={material.idMaterial}>
                    {material.nombreMaterial}
                </option>
                ))}
                </select>
            </div>


            <div className="col">
                <label className="form-label">Sexo Biologico</label>
                <select name="idPublico" value={producto.idPublico} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {tipoPublicos.map((publico) => (
                <option key={publico.idPublico} value={publico.idPublico}>
                    {publico.nombrePublico}
                </option>
                ))}
                </select>
            </div>

            <div className="col">
                <label className="form-label">Estado del Producto</label>
                <select name="estadoProducto" value={estadoProducto} onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {estadoProductos.map((estado) => (
                <option key={estado} value={estado}>
                    {estado}
                </option>
                ))}
                </select>
            </div>

            <div className="col">
                <label className="form-label">Promocion del producto</label>
                <select name="idPromocion"   value={producto.idPromocion || ""}
                onChange={(e)=>onInputChange(e)} className="form-select">
                <option value="">-- Selecciona una opción --</option>
                {promociones.map((promocion) => (
                <option key={promocion.idPromocion} value={promocion.idPromocion}>
                    {promocion.nombrePromocion}
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
            <Link to="/ver_producto" className="btn btn-outline-danger mx-2" >
                Cancel
            </Link>
        </div>
    </form>
</div>

  )
}
