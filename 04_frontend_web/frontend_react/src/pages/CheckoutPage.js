import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, loadCart, isAuthenticated } = useCart();
  const navigate = useNavigate();

  const [metodosPago, setMetodosPago] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    idMetodoPago: '',
    notas: '',
    direccionEnvio: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    loadCart();
    cargarMetodosPago();
  }, [isAuthenticated, navigate, loadCart]);

  const cargarMetodosPago = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/pedidos/metodos-pago', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setMetodosPago(response.data.metodosPago);
        if (response.data.metodosPago.length > 0) {
          setFormData(prev => ({
            ...prev,
            idMetodoPago: response.data.metodosPago[0].idMetodoPago.toString()
          }));
        }
      }
    } catch (err) {
      console.error('Error cargando métodos de pago:', err);
      setError('Error al cargar métodos de pago');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.idMetodoPago) {
      setError('Debes seleccionar un método de pago');
      return;
    }

    if (!cart || cart.detallesCarrito.length === 0) {
      setError('Tu carrito está vacío');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/pedidos/checkout', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSuccess(true);
        // Redirigir a página de confirmación después de 2 segundos
        setTimeout(() => {
          navigate(`/pedido/${response.data.pedido.idPedido}`);
        }, 2000);
      } else {
        setError(response.data.message || 'Error al procesar el pedido');
      }
    } catch (err) {
      console.error('Error en checkout:', err);
      const errorMessage = err.response?.data?.message || 'Error al procesar el pedido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Debes iniciar sesión para realizar un pedido.
          <Link to="/login" className="alert-link ms-2">Iniciar Sesión</Link>
        </Alert>
      </Container>
    );
  }

  if (!cart || cart.detallesCarrito.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">
          Tu carrito está vacío.
          <Link to="/" className="alert-link ms-2">Ir a comprar</Link>
        </Alert>
      </Container>
    );
  }

  if (success) {
    return (
      <Container className="py-5">
        <Alert variant="success" className="text-center">
          <h4>¡Pedido realizado exitosamente!</h4>
          <p>Serás redirigido a la confirmación del pedido...</p>
          <Spinner animation="border" />
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h4>Información del Pedido</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Método de Pago *</Form.Label>
                      <Form.Select
                        name="idMetodoPago"
                        value={formData.idMetodoPago}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar método de pago</option>
                        {metodosPago.map(metodo => (
                          <option key={metodo.idMetodoPago} value={metodo.idMetodoPago}>
                            {metodo.nombreMetodoPago}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Dirección de Envío</Form.Label>
                      <Form.Control
                        type="text"
                        name="direccionEnvio"
                        value={formData.direccionEnvio}
                        onChange={handleInputChange}
                        placeholder="Opcional - dirección personalizada"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Notas del Pedido</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    placeholder="Instrucciones especiales, notas de entrega, etc."
                  />
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <div className="d-flex gap-2">
                  <Button
                    variant="secondary"
                    as={Link}
                    to="/carrito"
                  >
                    Volver al Carrito
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="flex-fill"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Procesando...
                      </>
                    ) : (
                      'Confirmar Pedido'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5>Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              {cart.detallesCarrito.map((item) => (
                <div key={item.idProducto} className="d-flex justify-content-between mb-2">
                  <span className="text-truncate me-2" style={{ fontSize: '0.9rem' }}>
                    {item.nombreProducto} x{item.cantidad}
                  </span>
                  <span>${item.subtotal?.toLocaleString()}</span>
                </div>
              ))}

              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${cart.total?.toLocaleString()}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;