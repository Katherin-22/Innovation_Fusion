package in.bushansirgur.billingsoftware.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "tbl_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String itemId;

    private String name;

    private BigDecimal price;

    private String description;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;

    private String imgUrl;

    @Column(nullable = false)
    private Integer stockQuantity = 0;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    private CategoryEntity category;

    // Métodos para gestión de stock
    public Integer getStock() {
        return stockQuantity;
    }

    public void setStock(Integer stock) {
        this.stockQuantity = stock;
    }

    public boolean reduceStock(Integer quantity) {
        if (stockQuantity >= quantity) {
            stockQuantity -= quantity;
            return true;
        }
        return false;
    }

    public void increaseStock(Integer quantity) {
        stockQuantity += quantity;
    }

    public StockStatus getStockStatus() {
        if (stockQuantity == 0) {
            return StockStatus.OUT_OF_STOCK;
        } else if (stockQuantity <= 10) { // Umbral configurable
            return StockStatus.LOW_STOCK;
        } else {
            return StockStatus.IN_STOCK;
        }
    }
}
