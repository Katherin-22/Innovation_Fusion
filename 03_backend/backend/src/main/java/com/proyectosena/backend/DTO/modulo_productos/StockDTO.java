package com.proyectosena.backend.DTO.modulo_productos;

import java.time.LocalDate;

import com.proyectosena.backend.model.modulo_productos.Producto.EstadoProducto;

public class StockDTO {
    private Integer idStock;
    private Integer stockMinimo;
    private Integer stockActual;
    private LocalDate fechaModificacion;

    // --- IDs para edición ---
    private Integer idColor;
    private Integer idProducto;
    private Integer idPublico;
    private Integer idVariacion;

    // --- Datos legibles para mostrar en pantalla ---

    // Campos legibles desde las relaciones
    private String nombreProducto;
    private String codigoReferencia;
    private String nombreTipoProducto;
    private String nombreCategoria;
    private String descripcion;
    private Double precio;
    private String nombreMarca;
    //nombre de la variacion
    private String nombre;
    private LocalDate fechaCreacion;
    private String nombreColor;
    private String nombreMaterial;
    private String nombrePublico;
    private EstadoProducto estadoProducto;
    
    public Integer getIdStock() {
        return idStock;
    }
    public void setIdStock(Integer idStock) {
        this.idStock = idStock;
    }
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
    public Integer getIdProducto() {
        return idProducto;
    }
    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }
    public Integer getIdPublico() {
        return idPublico;
    }
    public void setIdPublico(Integer idPublico) {
        this.idPublico = idPublico;
    }
    public Integer getIdVariacion() {
        return idVariacion;
    }
    public void setIdVariacion(Integer idVariacion) {
        this.idVariacion = idVariacion;
    }
    public String getNombreProducto() {
        return nombreProducto;
    }
    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
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
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
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
    public EstadoProducto getEstadoProducto() {
        return estadoProducto;
    }
    public void setEstadoProducto(EstadoProducto estadoProducto) {
        this.estadoProducto = estadoProducto;
    }

    // Getters y Setters

    

    
}