package in.bushansirgur.billingsoftware.repository;

import in.bushansirgur.billingsoftware.entity.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {

    // Obtener movimientos por producto
    List<StockMovement> findByItemEntityIdOrderByCreatedAtDesc(Long itemId);

    // Obtener movimientos recientes
    List<StockMovement> findTop50ByOrderByCreatedAtDesc();

    // Movimientos por rango de fecha
    List<StockMovement> findByCreatedAtBetweenOrderByCreatedAtDesc(
            LocalDateTime start, LocalDateTime end);

    // Movimientos por tipo
    List<StockMovement> findByMovementTypeOrderByCreatedAtDesc(String movementType);

}
