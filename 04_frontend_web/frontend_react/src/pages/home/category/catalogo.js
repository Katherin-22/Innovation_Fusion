import React from "react";
import { useGetStock } from "../../../hooks/stock/useGetStock";
import { Link } from "react-router-dom";
import MenuHome from "../../../layouts/home/menuHome";

const Catalogo = () => {
  const { stock } = useGetStock();

  return (
    <div className="allHome">
      <MenuHome />
      <div className="body-color">
        <div className="container-fluid">
          <div className="row custom-row">
            {stock.map(producto => (
                <div key={producto.codigoReferencia} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div className="card">
                        <img
                            src={producto.imagen || "/iamgenes_prueba/default.jpg"}
                            className="card-img-top"
                            alt={producto.nombreProducto}
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{producto.nombreProducto}</h5>
                            <p className="card-text text-muted">Precio: <b>${producto.precio}</b></p>
                            <Link to={`/home/${producto.codigoReferencia}`} className="btn mt-auto">
                                Ver producto
                            </Link>
                        </div>
                    </div>
                </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
