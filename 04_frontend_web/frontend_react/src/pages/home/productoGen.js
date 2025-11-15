import React , { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetStock } from "../../hooks/stock/useGetStock";
import MenuHome from "../../layouts/home/menuHome";
import axios from "axios";

const ProductoGen = () => {
  const { stock } = useGetStock();
  const { codigoReferencia } = useParams();

  // Buscar producto por códigoReferencia
  const producto = stock.find(p => p.codigoReferencia === codigoReferencia);

  const [favorito, setFavorito] = useState(false);

  // 🟡 ESTADOS PARA COLORES Y TALLAS
  const [colores, setColores] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [colorSeleccionado, setColorSeleccionado] = useState("");

  // ============================
  // 1️⃣ Cargar COLORES del producto
  // ============================
  useEffect(() => {
    if (!producto) return;

    axios.get(`http://localhost:8080/publico/stock/producto/${producto.idProducto}/color`)
      .then(res => {
        setColores(res.data);
      })
      .catch(err => console.error("Error al cargar colores:", err));
  }, [producto]);

  // ============================
  // 2️⃣ Cargar TALLAS cuando se selecciona un color
  // ============================
  useEffect(() => {
    if (!producto || !colorSeleccionado) return;

    axios.get(`http://localhost:8080/publico/stock/producto/${producto.idProducto}/color/${colorSeleccionado}/tallas`)
      .then(res => {
        setTallas(res.data);
      })
      .catch(err => console.error("Error al cargar tallas:", err));
  }, [producto, colorSeleccionado]);


  if (!producto) {
    return <h2 className="text-center mt-5">Producto no encontrado</h2>;
  }

  return (
    <div className="allHome">
      <MenuHome />
      <div className="body-color">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col justify-md-6">
              <div className="card card-custom shadow-sm h-100">
                <div className="card-body body-card-custom d-flex flex-column">

                  {/* ============================
                      INFO PRINCIPAL
                  ============================ */}
                  <div className="row">  
                    <div className="col"></div>

                    <div className="col mb-6">
                      <h3 className="card-title">{producto.nombreProducto}</h3>
                      <p className="card-text text-muted">
                        Código: <b>{producto.codigoReferencia}</b>
                      </p>
                      <p className="card-text text-muted">
                        Precio: <b>${producto.precio}</b>
                      </p>
                      <p className="card-text text-muted">
                        Descripción: <b>{producto.Descripción}</b>
                      </p>
                    </div>
                  </div>

                  {/* ============================
                      COLORES Y TALLAS
                  ============================ */}
                  <div className="row mt-3">
                    <div className="col">
                      <label className="form-label"><b>Color:</b></label>
                      <select
                        className="form-select"
                        value={colorSeleccionado}
                        onChange={(e) => setColorSeleccionado(e.target.value)}
                      >
                        <option value="">Seleccione un color</option>

                        {colores.map((color) => (
                          <option key={color.idColor} value={color.idColor}>
                            {color.nombreColor}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col">
                      <label className="form-label"><b>Talla:</b></label>
                      <select className="form-select" disabled={!colorSeleccionado}>
                        <option value="">Seleccione una talla</option>

                        {tallas.map((t, index) => (
                          <option key={index}>
                            {t.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>


                  {/* ============================
                      BOTONES
                  ============================ */}
                  <div className="row justify-content-end mt-4">
                    <div className="col">
                      <button
                        className={`btn ${favorito ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => setFavorito(!favorito)}
                      >
                        <i className={`bi ${favorito ? "bi-heart-fill" : "bi-heart"}`}></i>
                        {favorito ? " Quitar" : " Favorito"}
                      </button>
                    </div>

                    <div className="col">
                      <button className="btn btn-custom btn-success mb-3">
                        Comprar
                      </button>
                    </div>

                    <div className="col">
                      <Link to="/" className="btn custom-btn-leave btn-outline-secondary">
                        Volver al catálogo
                      </Link>
                    </div>
                  </div>

                  {/* ============================
                      OPINIONES
                  ============================ */}
                  <div className="row mt-4">
                    <div className="col">

                      <form className="container">
                        <div className="row">
                          <div className="col-8">                          
                            <label className="form-label">Hacer comentario</label>
                            <input 
                              type="text" 
                              name="opinion"
                              placeholder="Ingresa tu opinión sobre este producto"
                              className="form-control"
                            />
                          </div>

                          <div className="col">
                            <button type="submit" 
                              className="btn btn-comment btn-outline-primary mt-3">
                              Comentar
                            </button>
                          </div>
                        </div>
                      </form>

                      <h4 className="text-center mb-4">Opiniones</h4>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default ProductoGen;
