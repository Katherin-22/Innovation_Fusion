import React from "react";
import { useGetStock } from "../../hooks/stock/useGetStock";
import { Link } from "react-router-dom";
import MenuHome from "../../layouts/menuHome/menuHome";

const Catalogo = () => {
  const { stock } = useGetStock();

  return (
    <div className="allHome">
      <MenuHome />
      <div className="body-color">
        <div className="container-fluid">
          <div className="row custom-row">
            {stock.map(producto => (
              <div key={producto.codigoReferencia} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombreProducto}</h5>
                    <p className="card-text text-muted">
                      Precio: <b>${producto.precio}</b>
                    </p>
                    {/* Botón que lleva a la vista del producto */}
                    <Link
                      to={`/home/${producto.codigoReferencia}`}
                      className="btn btn-primary btn-custom mt-auto"
                    >
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
