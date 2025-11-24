package in.bushansirgur.billingsoftware.service;

import in.bushansirgur.billingsoftware.entity.*;
import in.bushansirgur.billingsoftware.repository.ItemRepository;
import in.bushansirgur.billingsoftware.repository.StockMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StockService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private StockMovementRepository stockMovementRepository;

    /**
     * Reduce el stock de un producto (usado en ventas)
     */
    @Transactional
    public boolean reduceStock(Long productId, Integer quantity, String referenceType,
                               Long referenceId, String userName) {
        ItemEntity itemEntity = itemRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Integer previousStock = itemEntity.getStock();

        if (!itemEntity.reduceStock(quantity)) {
            return false; // No hay suficiente stock
        }

        itemRepository.save(itemEntity);

        // Registrar movimiento
        StockMovement movement = new StockMovement(
                itemEntity,
                MovementType.OUT,
                quantity,
                previousStock,
                itemEntity.getStock(),
                referenceType,
                referenceId,
                "Venta realizada",
                userName
        );

        stockMovementRepository.save(movement);

        return true;
    }

    /**
     * Aumenta el stock de un producto (usado en compras/entradas)
     */
    @Transactional
    public void increaseStock(Long productId, Integer quantity, String reason, String userName) {
        ItemEntity itemEntity = itemRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Integer previousStock = itemEntity.getStock();
        itemEntity.increaseStock(quantity);
        itemRepository.save(itemEntity);

        // Registrar movimiento
        StockMovement movement = new StockMovement(
                itemEntity,
                MovementType.IN,
                quantity,
                previousStock,
                itemEntity.getStock(),
                "MANUAL",
                null,
                reason,
                userName
        );

        stockMovementRepository.save(movement);
    }

    /**
     * Ajuste manual de stock
     */
    @Transactional
    public void adjustStock(Long productId, Integer newStock, String reason, String userName) {
        ItemEntity itemEntity = itemRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Integer previousStock = itemEntity.getStock();
        Integer difference = newStock - previousStock;

        itemEntity.setStock(newStock);
        itemRepository.save(itemEntity);

        // Registrar movimiento
        StockMovement movement = new StockMovement(
                itemEntity,
                MovementType.ADJUSTMENT,
                Math.abs(difference),
                previousStock,
                newStock,
                "ADJUSTMENT",
                null,
                reason,
                userName
        );

        stockMovementRepository.save(movement);
    }

    /**
     * Obtener historial de movimientos de un producto
     */
    public List<StockMovement> getProductMovements(Long productId) {
        return stockMovementRepository.findByItemEntityIdOrderByCreatedAtDesc(productId);
    }

    /**
     * Obtener movimientos recientes
     */
    public List<StockMovement> getRecentMovements() {
        return stockMovementRepository.findTop50ByOrderByCreatedAtDesc();
    }

    /**
     * Obtener productos con stock bajo
     */
    public List<ItemEntity> getLowStockProducts() {
        return itemRepository.findLowStockProducts();
    }

    /**
     * Obtener productos sin stock
     */
    public List<ItemEntity> getOutOfStockProducts() {
        return itemRepository.findOutOfStockProducts();
    }

    /**
     * Dashboard de estadísticas de stock
     */
    public Map<String, Object> getStockDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("totalProducts", itemRepository.count());
        dashboard.put("inStock", itemRepository.countByStockStatus(StockStatus.IN_STOCK));
        dashboard.put("lowStock", itemRepository.countByStockStatus(StockStatus.LOW_STOCK));
        dashboard.put("outOfStock", itemRepository.countByStockStatus(StockStatus.OUT_OF_STOCK));
        dashboard.put("lowStockProducts", getLowStockProducts());
        dashboard.put("outOfStockProducts", getOutOfStockProducts());
        dashboard.put("recentMovements", getRecentMovements());

        return dashboard;
    }

    /**
     * Validar si hay stock suficiente para una venta
     */
    public boolean hasEnoughStock(Long productId, Integer quantity) {
        ItemEntity product = itemRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return product.getStock() >= quantity;
    }


}
