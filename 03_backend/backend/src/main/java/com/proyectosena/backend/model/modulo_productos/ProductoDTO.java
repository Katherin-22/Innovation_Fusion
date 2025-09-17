package com.proyectosena.backend.model.modulo_productos;

import java.time.LocalDate;

import com.proyectosena.backend.model.modulo_productos.Producto.EstadoProducto;

public class ProductoDTO {
    //unicamente se le pasara esto al usuario
    private String nombreProducto;
    private String codigoReferencia;
    private String descripcion;
    private Double precio;
    private String urlImagen;
    private LocalDate fechaModificacion;
    private EstadoProducto estadoProducto;
    private Integer idCategoria;
    private Integer idMarca;
    private Integer idMaterial;
    private Integer idPublico;
    private Integer idPromocion;

    // Getters y Setters
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
    public String getUrlImagen() {
        return urlImagen;
    }
    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }
    public LocalDate getFechaModificacion() {
        return fechaModificacion;
    }
    public void setFechaModificacion(LocalDate fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
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
}
