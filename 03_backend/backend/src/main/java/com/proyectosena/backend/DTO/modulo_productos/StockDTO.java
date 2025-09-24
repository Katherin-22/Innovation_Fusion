package com.proyectosena.backend.DTO.modulo_productos;

import java.time.LocalDate;

public class StockDTO {
    private Integer stockMinimo;
    private Integer stockActual;
    private LocalDate fechaModificacion;

    // --- IDs para edición ---
    private Integer idColor;
    private Integer idProducto;
    private Integer idPublico;
    private Integer idVariacion;

    // ADVERTENCIA: tienes que ver que haces con variacion, por ejemplo 
    //si se tiene que mostrar en el controlador de variacion o en el stock

    // --- Datos legibles para mostrar en pantalla ---

    // Campos legibles desde las relaciones
    private String codigoReferencia;
    private String nombreTipoProducto;
    private String nombreCategoria;
    private String descripcion;
    private Double precio;
    private String nombreMarca;
    private LocalDate fechaCreacion;
    private String nombreColor;
    private String nombreMaterial;
    private String nombrePublico;
    //imagen
    
    // getters y setters
 // Getters y Setters
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

    public String getCodigoReferencia() {
        return codigoReferencia;
    }
    public void setCodigoReferencia(String codigoReferencia) {
        this.codigoReferencia = codigoReferencia;
    }

    public String getNombreTipoProducto() {
        return nombreTipoProducto;
    }
    public void setNombreTipoProducto(String nombreTipoProducto) {
        this.nombreTipoProducto = nombreTipoProducto;
    }

    public String getNombreCategoria() {
        return nombreCategoria;
    }
    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }

    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }
    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getNombreMarca() {
        return nombreMarca;
    }
    public void setNombreMarca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }
    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getNombreColor() {
        return nombreColor;
    }
    public void setNombreColor(String nombreColor) {
        this.nombreColor = nombreColor;
    }

    public String getNombreMaterial() {
        return nombreMaterial;
    }
    public void setNombreMaterial(String nombreMaterial) {
        this.nombreMaterial = nombreMaterial;
    }

    public String getNombrePublico() {
        return nombrePublico;
    }
    public void setNombrePublico(String nombrePublico) {
        this.nombrePublico = nombrePublico;
    }
}