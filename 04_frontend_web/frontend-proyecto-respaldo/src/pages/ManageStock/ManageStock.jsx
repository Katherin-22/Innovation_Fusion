import {useEffect, useState} from "react";
import './ManageStock.css';

const ManageStock = () => {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch stock dashboard data
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading stock data...</div>;
    }

    return (
        <div className="manage-stock-container">
            <h2>Gestión de Inventario</h2>
            {/* TODO: Add stock management UI */}
            <p>Funcionalidad de gestión de stock próximamente.</p>
        </div>
    );
};

export default ManageStock;