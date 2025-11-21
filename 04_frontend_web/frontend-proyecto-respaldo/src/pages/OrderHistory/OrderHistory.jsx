import './OrderHistory.css';
import {useEffect, useState} from "react";
import {latestOrders} from "../../Service/OrderService.js";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await latestOrders();
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    if (loading) {
        return <div className="text-center py-4">Buscando órdenes...</div>
    }

    if (orders.length === 0) {
        return <div className="text-center py-4">No se encontraron órdenes</div>
    }

    return (
        <div className="orders-history-container">
            <h2 className="mb-2 text-light">Órdenes encontradas: </h2>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>Número de orden</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Ítem</th>
                        <th>Total</th>
                        <th>Método de Pago</th>
                        <th>Estado</th>
                        <th>Hora</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order =>
                            order.items.map((item, index) => (
                                <tr key={`${order.orderId}-${index}`}>
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={order.items.length}>{order.orderId}</td>
                                            <td rowSpan={order.items.length}>
                                                {order.customerName}<br/>
                                                <small className="text-muted">{order.phoneNumber}</small>
                                            </td>
                                        </>
                                    )}
                                    <td>{item.quantity}</td>
                                    <td>{item.name}</td>
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={order.items.length}>${order.grandTotal}</td>
                                            <td rowSpan={order.items.length}>{order.paymentMethod}</td>
                                            <td rowSpan={order.items.length}>
                                              <span className={`badge ${order.paymentDetails?.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"}`}>
                                                {order.paymentDetails?.status || "PENDING"}
                                              </span>
                                            </td>
                                            <td rowSpan={order.items.length}>{formatDate(order.createdAt)}</td>
                                        </>
                                    )}
                                </tr>
                            ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderHistory;