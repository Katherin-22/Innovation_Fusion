import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Badge, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmationPage = () => {
  const { idPedido } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarPedido();
  }, [idPedido]);

  const cargarPedido = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/pedidos/${idPedido}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setPedido(response.data.pedido);
      } else {
        setError(response.data.message || 'Error al cargar el pedido');
      }
    } catch (err) {
      console.error('Error cargando pedido:', err);
      setError('Error al cargar el pedido');
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadgeVariant = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'pendiente': return 'warning';
      case 'confirmado': return 'info';
      case 'en_preparacion': return 'primary';
      case 'enviado': return 'secondary';
      case 'entregado': return 'success';
      case 'cancelado': return 'danger';
      default: return 'secondary';
    }
  };

  const getEstadoTexto = (estado) => {
    const estados = {
      'PENDIENTE': 'Pendiente',
      'CONFIRMADO': 'Confirmado',
      'EN_PREPARACION': 'En Preparación',
      'ENVIADO': 'Enviado',
      'ENTREGADO': 'Entregado',
      'CANCELADO': 'Cancelado'
    };
    return estados[estado] || estado;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Cargando pedido...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h5>Error al cargar el pedido</h5>
          <p>{error}</p>
          <Link to="/pedidos">
            <Button variant="outline-primary">Ver Mis Pedidos</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  if (!pedido) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <h5>Pedido no encontrado</h5>
          <p>El pedido que buscas no existe o no tienes acceso a él.</p>
          <Link to="/pedidos">
            <Button variant="outline-primary">Ver Mis Pedidos</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header className="bg-success text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">¡Pedido Confirmado!</h4>
                <Badge bg={getEstadoBadgeVariant(pedido.estadoPedido)}>
                  {getEstadoTexto(pedido.estadoPedido)}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6}>
                  <h6>Número de Pedido</h6>
                  <p className="text-muted">#{pedido.idPedido}</p>
                </Col>
                <Col md={6}>
                  <h6>Fecha del Pedido</h6>
                  <p className="text-muted">
                    {new Date(pedido.fechaPedido).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <h6>Método de Pago</h6>
                  <p className="text-muted">{pedido.nombreMetodoPago}</p>
                </Col>
                <Col md={6}>
                  <h6>Dirección de Envío</h6>
                  <p className="text-muted">{pedido.direccionEnvio || 'Dirección registrada'}</p>
                </Col>
              </Row>

              {pedido.notas && (
                <div className="mb-4">
                  <h6>Notas del Pedido</h6>
                  <p className="text-muted">{pedido.notas}</p>
                </div>
              )}

              <h5>Productos</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-end">Precio Unit.</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedido.detallesPedido.map((detalle) => (
                      <tr key={detalle.idDetallePedido}>
                        <td>
                          <div className="d-flex align-items-center">
                            {detalle.imagenUrl && (
                              <img
                                src={`http://localhost:8080/uploads/${detalle.imagenUrl}`}
                                alt={detalle.nombreProducto}
                                className="me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              />
                            )}
                            <div>
                              <div className="fw-bold">{detalle.nombreProducto}</div>
                              <small className="text-muted">{detalle.codigoReferencia}</small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">{detalle.cantidad}</td>
                        <td className="text-end">${detalle.precioUnitario?.toLocaleString()}</td>
                        <td className="text-end">${detalle.subtotal?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end fw-bold">Total:</td>
                      <td className="text-end fw-bold fs-5">${pedido.total?.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5>¿Qué sigue?</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <Badge bg="warning" className="me-2">1</Badge>
                <strong>Confirmación</strong>
                <p className="text-muted small mb-0">Tu pedido ha sido confirmado y está siendo procesado.</p>
              </div>

              <div className="mb-3">
                <Badge bg="secondary" className="me-2">2</Badge>
                <strong>Preparación</strong>
                <p className="text-muted small mb-0">Estamos preparando tu pedido para envío.</p>
              </div>

              <div className="mb-3">
                <Badge bg="secondary" className="me-2">3</Badge>
                <strong>Envío</strong>
                <p className="text-muted small mb-0">Te notificaremos cuando tu pedido sea enviado.</p>
              </div>

              <div className="mb-3">
                <Badge bg="secondary" className="me-2">4</Badge>
                <strong>Entrega</strong>
                <p className="text-muted small mb-0">Recibirás tu pedido en la dirección especificada.</p>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="text-center">
              <h6>¿Necesitas ayuda?</h6>
              <p className="text-muted small">
                Si tienes alguna pregunta sobre tu pedido, puedes contactarnos.
              </p>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm" as={Link} to="/pedidos">
                  Ver Todos Mis Pedidos
                </Button>
                <Button variant="primary" size="sm" as={Link} to="/">
                  Continuar Comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmationPage;