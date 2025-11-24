package in.bushansirgur.billingsoftware.entity;

public enum StockStatus {
    IN_STOCK("En Stock"),
    LOW_STOCK("Stock Bajo"),
    OUT_OF_STOCK("Sin Stock");

    private final String displayName;

    StockStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }


}
