import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import {deleteItem} from "../../Service/ItemService.js";
import {adjustStock} from "../../Service/StockService.js";
import toast from "react-hot-toast";
import './ItemList.css';

const ItemList = () => {
    const {itemsData, setItemsData, refreshItems} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [showStockModal, setShowStockModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newStock, setNewStock] = useState(0);
    const [adjustmentReason, setAdjustmentReason] = useState("");

    const filteredItems = itemsData.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    const removeItem = async (itemId) => {
        try {
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                await refreshItems(); // Refresh items to show updated data
                toast.success("Item deleted");
            } else {
                toast.error("Unable to delete item");
            }
        }catch(err) {
            console.error(err);
            toast.error("Unable to delete item");
        }
    }

    const openStockModal = (item) => {
        setSelectedItem(item);
        setNewStock(item.stockQuantity);
        setAdjustmentReason("");
        setShowStockModal(true);
    }

    const closeStockModal = () => {
        setShowStockModal(false);
        setSelectedItem(null);
    }

    const handleStockAdjustment = async () => {
        if (!selectedItem || !adjustmentReason.trim()) {
            toast.error("Please provide a reason for the adjustment");
            return;
        }

        try {
            const response = await adjustStock(selectedItem.id, newStock, adjustmentReason, "Admin");
            if (response.status === 200) {
                await refreshItems();
                toast.success("Stock adjusted successfully");
                closeStockModal();
            } else {
                toast.error("Failed to adjust stock");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adjusting stock");
        }
    }

    return (
        <div className="category-list-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="row">
                <div className="input-group mb-3">
                    <input type="text"
                           name="keyword"
                           id="keyword"
                           placeholder="Busca ítems"
                           className="form-control"
                           onChange={(e) => setSearchTerm(e.target.value)}
                           value={searchTerm}
                    />
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div className="row g-3">
                {filteredItems.map((item, index) => (
                    <div className="col-lg-12" key={index}>
                        <div className="card p-3 bg-dark item-card">
                            <div className="d-flex align-items-center">
                                <div style={{marginRight: '15px'}}>
                                    <img src={item.imgUrl} alt={item.name} className="item-image" />
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-1 text-white">{item.name}</h6>
                                    <p className="mb-0 text-white">
                                        Categoría: {item.categoryName}
                                    </p>
                                    <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                                        $ {item.price}
                                    </span>
                                    <p className="mb-0 text-white">
                                        Stock: {item.stockQuantity} - {item.stockStatus === 'IN_STOCK' ? 'En Stock' : item.stockStatus === 'LOW_STOCK' ? 'Stock Bajo' : 'Sin Stock'}
                                    </p>
                                </div>
                                <div className="d-flex gap-1">
                                    <button className="btn btn-warning btn-sm" onClick={() => openStockModal(item)} title="Adjust Stock">
                                        <i className="bi bi-plus-circle"></i>
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)} title="Delete Item">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stock Adjustment Modal */}
            {showStockModal && selectedItem && (
                <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-light">
                            <div className="modal-header">
                                <h5 className="modal-title">Adjust Stock - {selectedItem.name}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeStockModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Current Stock: {selectedItem.stockQuantity}</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newStock" className="form-label">New Stock Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="newStock"
                                        value={newStock}
                                        onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                                        min="0"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reason" className="form-label">Reason for Adjustment</label>
                                    <textarea
                                        className="form-control"
                                        id="reason"
                                        rows="3"
                                        value={adjustmentReason}
                                        onChange={(e) => setAdjustmentReason(e.target.value)}
                                        placeholder="Enter reason for stock adjustment"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeStockModal}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleStockAdjustment}>Adjust Stock</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemList;