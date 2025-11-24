package in.bushansirgur.billingsoftware.io;

import in.bushansirgur.billingsoftware.entity.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {
    private String itemId;
    private String name;
    private BigDecimal price;
    private String categoryId;
    private String description;
    private Long id;
    private String categoryName;
    private String imgUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Integer stockQuantity;
    private StockStatus stockStatus;
}
