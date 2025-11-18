import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuHome from '../layouts/home/menuHome';
import axios from 'axios';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchFavoritos(token);
  }, []);

  const fetchFavoritos = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/favoritos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavoritos(response.data);
    } catch (error) {
      console.error('Error cargando favoritos:', error);
    }
  };

  const eliminarFavorito = async (idFavorito) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:8080/api/favoritos/${idFavorito}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFavoritos(token);
    } catch (error) {
      console.error('Error eliminando favorito:', error);
    }
  };

  return (
    <div className="allHome">
      <MenuHome />
      <div className="body-color">
        <div className="container-fluid">
          <h2 className="text-center mb-4">Mis Favoritos</h2>
          {favoritos.length === 0 ? (
            <p className="text-center">No tienes productos favoritos</p>
          ) : (
            <div className="row">
              {favoritos.map((fav) => (
                <div key={fav.idFavorito} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5>{fav.producto.nombreProducto}</h5>
                      <p>{fav.producto.descripcion}</p>
                      <p>Precio: ${fav.producto.precio}</p>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => eliminarFavorito(fav.idFavorito)}
                      >
                        Quitar
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/home/${fav.producto.codigoReferencia}`)}
                      >
                        Ver Producto
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favoritos;