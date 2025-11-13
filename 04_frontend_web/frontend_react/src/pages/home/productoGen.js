import React , { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetStock } from "../../hooks/stock/useGetStock";
import MenuHome from "../../layouts/home/menuHome";

const ProductoGen = () => {
  const { stock } = useGetStock();
  const { codigoReferencia } = useParams();

  // Buscar producto por códigoReferencia
  const producto = stock.find(p => p.codigoReferencia === codigoReferencia);
  const [favorito, setFavorito] = useState(false);

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
                <div className="row">  
                  <div className="col">



                  </div>

                  <div className="col mb-6">
                  <h3 className="card-title">{producto.nombreProducto}</h3>
                  <p className="card-text text-muted">
                    Código: <b>{producto.codigoReferencia}</b>
                  </p>
                  <p className="card-text text-muted">
                    Precio: <b>${producto.precio}</b>
                  </p>
                  <p className="card-text text-muted">
                    Descripción: <b>${producto.Descripción}</b>
                  </p>
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col">
                                        {/* Botón Favoritos */}
                    <button
                      className={`btn ${
                        favorito ? "btn-danger" : "btn-outline-danger"
                      }`}
                      onClick={() => setFavorito(!favorito)}
                    >
                      <i
                        className={`bi ${
                          favorito ? "bi-heart-fill" : "bi-heart"
                        }`}
                      ></i>
                      {favorito ? " Quitar" : " Favorito"}
                    </button>
                  </div>

                  
                  <div className="col">
                    <button className="btn btn-custom btn-success mb-3">
                      Comprar
                    </button>
                  </div>
                  <div className="col">
                    {/* Botón para volver al catálogo */}
                    <Link to="/" className="btn custom-btn-leave btn-outline-secondary">
                      Volver al catálogo
                    </Link>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">

                      <form className="container">
                        <div className="row">
                          <div className="col-8">                          
                            <label className="form-label">Hacer comentario</label>
                            <input type="text" 
                            name="opinion " 
                            placeholder="Ingresa tu opinion sobre este producto"
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
