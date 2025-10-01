package com.proyectosena.backend.DTO.modulo_productos;

import java.time.LocalDate;

import com.proyectosena.backend.model.modulo_productos.Producto.EstadoProducto;

public class ProductoDTO {
    //unicamente se le pasara esto al usuario
    private Integer idProducto;  // <- agregar
    private String nombreProducto;
    private String codigoReferencia;
    private String descripcion;
    private Double precio;
    private LocalDate fechaModificacion;
    private LocalDate fechaCreacion;
    private EstadoProducto estadoProducto;
    private Integer idCategoria;
    private Integer idMarca;
    private Integer idMaterial;
    private Integer idPublico;
    private Integer idPromocion;
    private String nombrePromocion;
    private String nombreCategoria;
    private String nombreMarca;
    private String nombreMaterial;
    private String nombrePublico;
    private String nombreTipoProducto;
    
    public Integer getIdProducto() {
        return idProducto;
    }
    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
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
    public LocalDate getFechaModificacion() {
        return fechaModificacion;
    }
    public void setFechaModificacion(LocalDate fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }
    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }
    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
    public EstadoProducto getEstadoProducto() {
        return estadoProducto;
    }
    public void setEstadoProducto(EstadoProducto estadoProducto) {
        this.estadoProducto = estadoProducto;
    }
    public Integer getIdCategoria() {
        return idCategoria;
    }
    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }
    public Integer getIdMarca() {
        return idMarca;
    }
    public void setIdMarca(Integer idMarca) {
        this.idMarca = idMarca;
    }
    public Integer getIdMaterial() {
        return idMaterial;
    }
    public void setIdMaterial(Integer idMaterial) {
        this.idMaterial = idMaterial;
    }
    public Integer getIdPublico() {
        return idPublico;
    }
    public void setIdPublico(Integer idPublico) {
        this.idPublico = idPublico;
    }
    public Integer getIdPromocion() {
        return idPromocion;
    }
    public void setIdPromocion(Integer idPromocion) {
        this.idPromocion = idPromocion;
    }
    public String getNombrePromocion() {
        return nombrePromocion;
    }
    public void setNombrePromocion(String nombrePromocion) {
        this.nombrePromocion = nombrePromocion;
    }
    public String getNombreCategoria() {
        return nombreCategoria;
    }
    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }
    public String getNombreMarca() {
        return nombreMarca;
    }
    public void setNombreMarca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
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
    public String getNombreTipoProducto() {
        return nombreTipoProducto;
    }
    public void setNombreTipoProducto(String nombreTipoProducto) {
        this.nombreTipoProducto = nombreTipoProducto;
    }



    // Getters y Setters



    
 
}