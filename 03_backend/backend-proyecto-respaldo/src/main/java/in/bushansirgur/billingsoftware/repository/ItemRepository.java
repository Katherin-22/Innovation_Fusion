package in.bushansirgur.billingsoftware.repository;

import in.bushansirgur.billingsoftware.entity.ItemEntity;
import in.bushansirgur.billingsoftware.entity.StockStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String id);

    Integer countByCategoryId(Long id);

    @Query("SELECT i FROM ItemEntity i WHERE i.stockQuantity <= 10 AND i.stockQuantity > 0")
    List<ItemEntity> findLowStockProducts();

    @Query("SELECT i FROM ItemEntity i WHERE i.stockQuantity = 0")
    List<ItemEntity> findOutOfStockProducts();

    @Query("SELECT COUNT(i) FROM ItemEntity i WHERE i.stockQuantity > 10")
    Long countInStock();

    @Query("SELECT COUNT(i) FROM ItemEntity i WHERE i.stockQuantity BETWEEN 1 AND 10")
    Long countLowStock();

    @Query("SELECT COUNT(i) FROM ItemEntity i WHERE i.stockQuantity = 0")
    Long countOutOfStock();

    default Long countByStockStatus(StockStatus status) {
        switch (status) {
            case IN_STOCK:
                return countInStock();
            case LOW_STOCK:
                return countLowStock();
            case OUT_OF_STOCK:
                return countOutOfStock();
            default:
                return 0L;
        }
    }
}
