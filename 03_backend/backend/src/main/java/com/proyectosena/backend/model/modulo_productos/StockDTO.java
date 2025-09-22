package com.proyectosena.backend.model.modulo_productos;

import java.time.LocalDate;

public class StockDTO {
    private Integer stockMinimo;
    private Integer stockActual;
    private LocalDate fechaModificacion;
    private Integer idColor;
    private Integer idVariacion;
    private Integer idProducto;
    // getters y setters
    public Integer getStockMinimo() {
        return stockMinimo;
    }
    public void setStockMinimo(Integer stockMinimo) {
        this.stockMinimo = stockMinimo;
    }
    public Integer getStockActual() {
        return stockActual;
    }
    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }
    public LocalDate getFechaModificacion() {
        return fechaModificacion;
    }
    public void setFechaModificacion(LocalDate fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }
    public Integer getIdColor() {
        return idColor;
    }
    public void setIdColor(Integer idColor) {
        this.idColor = idColor;
    }
    public Integer getIdVariacion() {
        return idVariacion;
    }
    public void setIdVariacion(Integer idVariacion) {
        this.idVariacion = idVariacion;
    }
    public Integer getIdProducto() {
        return idProducto;
    }
    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }
 

}
