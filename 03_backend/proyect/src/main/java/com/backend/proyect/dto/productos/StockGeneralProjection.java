package com.backend.proyect.dto.productos;
import com.backend.proyect.model.productos.Producto.EstadoProducto;

public interface StockGeneralProjection {
    Integer getIdProducto();
    String getCodigoReferencia();
    String getNombreProducto();
    String getNombreTipoProducto();
    Double getPrecio();
    String getNombre();
    String getNombreColor();
    Integer getStockActual();
    EstadoProducto getEstadoProducto();
}