import React, { useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import ToastNotification from '../components/ToastNotification';

const CartPage = () => {
  const { cart, loading, error, notification, loadCart, isAuthenticated, clearNotification } = useCart();

  useEffect(() => {
    if (isAuthenticated()) {
      loadCart();
    }
  }, [isAuthenticated, loadCart]);

  const handleCheckout = () => {
    // TODO: Implementar navegación a checkout
    alert('Funcionalidad de checkout próximamente disponible');
  };

  if (!isAuthenticated()) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="warning" className="text-center">
              <h4>Acceso requerido</h4>
              <p>Debes iniciar sesión para ver tu carrito de compras.</p>
              <Link to="/login">
                <Button variant="primary">Iniciar Sesión</Button>
              </Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <Link to="/" className="btn btn-outline-secondary me-3">
              <ArrowLeft size={16} className="me-2" />
              Continuar Comprando
            </Link>
            <h2 className="mb-0">Mi Carrito de Compras</h2>
          </div>
        </Col>
      </Row>

      {/* Error message */}
      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger" dismissible>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Loading state */}
      {loading && (
        <Row className="mb-3">
          <Col>
            <Alert variant="info">
              Cargando carrito...
            </Alert>
          </Col>
        </Row>
      )}

      {/* Cart content */}
      {cart && cart.detallesCarrito && cart.detallesCarrito.length > 0 ? (
        <Row>
          {/* Cart items */}
          <Col lg={8} className="mb-4">
            <div className="mb-3">
              <h4>Productos en tu carrito</h4>
            </div>
            {cart.detallesCarrito.map((item) => (
              <CartItem key={item.idProducto} item={item} />
            ))}
          </Col>

          {/* Cart summary */}
          <Col lg={4}>
            <CartSummary />
          </Col>
        </Row>
      ) : (
        /* Empty cart */
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center py-5">
              <div className="mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h4 className="mb-3">Tu carrito está vacío</h4>
              <p className="text-muted mb-4">
                Parece que aún no has agregado productos a tu carrito.
              </p>
              <Link to="/">
                <Button variant="primary" size="lg">
                  Explorar Productos
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      )}

      {/* Toast notifications */}
      {notification && (
        <ToastNotification
          show={!!notification}
          onClose={clearNotification}
          title={notification.title}
          message={notification.message}
          variant={notification.variant}
        />
      )}
    </Container>
  );
};

export default CartPage;