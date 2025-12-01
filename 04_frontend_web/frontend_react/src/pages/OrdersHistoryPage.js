import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrdersHistoryPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/pedidos', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setPedidos(response.data.pedidos);
      } else {
        setError(response.data.message || 'Error al cargar pedidos');
      }
    } catch (err) {
      console.error('Error cargando pedidos:', err);
      setError('Error al cargar pedidos');
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
        <p className="mt-3">Cargando pedidos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h5>Error al cargar pedidos</h5>
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
            <h2>Mis Pedidos</h2>
            <Button as={Link} to="/" variant="primary">
              Continuar Comprando
            </Button>
          </div>

          {pedidos.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-5">
                <h5>No tienes pedidos aún</h5>
                <p className="text-muted">¡Empieza a comprar productos de nuestra tienda!</p>
                <Button as={Link} to="/" variant="primary">
                  Explorar Productos
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <div className="table-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>N° Pedido</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Método de Pago</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidos.map((pedido) => (
                        <tr key={pedido.idPedido}>
                          <td>
                            <strong>#{pedido.idPedido}</strong>
                          </td>
                          <td>
                            {new Date(pedido.fechaPedido).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td>
                            <Badge bg={getEstadoBadgeVariant(pedido.estadoPedido)}>
                              {getEstadoTexto(pedido.estadoPedido)}
                            </Badge>
                          </td>
                          <td className="fw-bold">
                            ${pedido.total?.toLocaleString()}
                          </td>
                          <td>
                            {pedido.nombreMetodoPago}
                          </td>
                          <td>
                            <Button
                              as={Link}
                              to={`/pedido/${pedido.idPedido}`}
                              variant="outline-primary"
                              size="sm"
                            >
                              Ver Detalles
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersHistoryPage;