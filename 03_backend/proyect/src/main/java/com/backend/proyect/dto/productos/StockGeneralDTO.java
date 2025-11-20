package com.backend.proyect.dto.productos;

import com.backend.proyect.model.productos.Producto.EstadoProducto;

public class StockGeneralDTO {

    Integer idProducto;
    String codigoReferencia;
    String nombreProducto;
    String nombreTipoProducto;
    Double precio;
    String nombre;
    String nombreColor;
    Integer stockActual;
    EstadoProducto estadoProducto;

    public StockGeneralDTO (Integer idProducto, String codigoReferencia, String nombreProducto,
    String nombreTipoProducto, Double precio, String tallasDisponibles, String coloresDisponibles, 
    Integer stockActual, EstadoProducto estadoProducto)
    {this.idProducto = idProducto;
    this.codigoReferencia = codigoReferencia;
    this.nombreProducto = nombreProducto;
    this.nombreTipoProducto = nombreTipoProducto;
    this.precio = precio;
    this.nombre = nombre; // campo usado para tallas
    this.nombreColor = nombreColor; // campo usado para colores
    this.stockActual = stockActual;
    this.estadoProducto = estadoProducto;}

    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public String getCodigoReferencia() {
        return codigoReferencia;
    }

    public void setCodigoReferencia(String codigoReferencia) {
        this.codigoReferencia = codigoReferencia;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getNombreTipoProducto() {
        return nombreTipoProducto;
    }

    public void setNombreTipoProducto(String nombreTipoProducto) {
        this.nombreTipoProducto = nombreTipoProducto;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreColor() {
        return nombreColor;
    }

    public void setNombreColor(String nombreColor) {
        this.nombreColor = nombreColor;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public EstadoProducto getEstadoProducto() {
        return estadoProducto;
    }

    public void setEstadoProducto(EstadoProducto estadoProducto) {
        this.estadoProducto = estadoProducto;
    }

}