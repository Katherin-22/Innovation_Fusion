import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const FavoritesPage = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, showNotification } = useCart();

  useEffect(() => {
    cargarFavoritos();
  }, []);

  const cargarFavoritos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/favoritos', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setFavoritos(response.data.favoritos);
      } else {
        setError(response.data.message || 'Error al cargar favoritos');
      }
    } catch (err) {
      console.error('Error cargando favoritos:', err);
      setError('Error al cargar favoritos');
    } finally {
      setLoading(false);
    }
  };

  const eliminarDeFavoritos = async (idProducto) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8080/api/favoritos/producto/${idProducto}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setFavoritos(prev => prev.filter(fav => fav.idProducto !== idProducto));
        showNotification('Eliminado', 'Producto removido de favoritos', 'info');
      } else {
        showNotification('Error', response.data.message || 'Error al eliminar de favoritos', 'danger');
      }
    } catch (err) {
      console.error('Error eliminando favorito:', err);
      showNotification('Error', 'Error al eliminar de favoritos', 'danger');
    }
  };

  const agregarAlCarrito = async (idProducto, nombreProducto) => {
    const result = await addToCart(idProducto, 1);
    if (result.success) {
      showNotification('Agregado', `"${nombreProducto}" agregado al carrito`, 'success');
    }
  };

  const getEstadoBadgeVariant = (estadoProducto) => {
    return estadoProducto === 'Activo' ? 'success' : 'secondary';
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Cargando favoritos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h5>Error al cargar favoritos</h5>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <Heart className="me-2 text-danger" size={32} />
                Mis Favoritos
              </h2>
              <p className="text-muted mt-1">
                {favoritos.length} producto{favoritos.length !== 1 ? 's' : ''} en tu lista de deseos
              </p>
            </div>
            <Button as={Link} to="/" variant="primary">
              Continuar Comprando
            </Button>
          </div>

          {favoritos.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-5">
                <Heart size={64} className="text-muted mb-3" />
                <h5>No tienes productos favoritos</h5>
                <p className="text-muted">
                  Agrega productos a tu lista de deseos haciendo clic en el corazón en las tarjetas de productos.
                </p>
                <Button as={Link} to="/" variant="primary">
                  Explorar Productos
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {favoritos.map((producto) => (
                <Col key={producto.idProducto} lg={4} md={6} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <div className="position-relative">
                      {producto.imagenUrl ? (
                        <Card.Img
                          variant="top"
                          src={`http://localhost:8080/uploads/${producto.imagenUrl}`}
                          alt={producto.nombreProducto}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="bg-light d-flex align-items-center justify-content-center"
                          style={{ height: '200px' }}
                        >
                          <span className="text-muted">Sin imagen</span>
                        </div>
                      )}

                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 m-2"
                        onClick={() => eliminarDeFavoritos(producto.idProducto)}
                        title="Remover de favoritos"
                      >
                        <Heart size={16} fill="currentColor" />
                      </Button>

                      <Badge
                        bg={getEstadoBadgeVariant(producto.estadoProducto)}
                        className="position-absolute bottom-0 start-0 m-2"
                      >
                        {producto.estadoProducto}
                      </Badge>
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-truncate" title={producto.nombreProducto}>
                        {producto.nombreProducto}
                      </Card.Title>

                      <Card.Text className="text-muted small mb-2">
                        Código: {producto.codigoReferencia}
                      </Card.Text>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="h5 text-primary mb-0">
                            ${producto.precio?.toLocaleString()}
                          </span>
                        </div>

                        <div className="d-grid gap-2">
                          <Button
                            variant="primary"
                            onClick={() => agregarAlCarrito(producto.idProducto, producto.nombreProducto)}
                            disabled={producto.estadoProducto !== 'Activo'}
                          >
                            <ShoppingCart size={16} className="me-2" />
                            Agregar al Carrito
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FavoritesPage;