package com.backend.proyect.model.productos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.backend.proyect.model.promociones.Promocion;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idProducto")
    private Integer idProducto;

    @Column(name = "nombreProducto", nullable = false, length = 45)
    private String nombreProducto;

    @Column(name = "codigoReferencia", nullable = false, length = 20)
    private String codigoReferencia;

    @Column(name = "descripcion", nullable = false, length = 200)
    private String descripcion;

    @Column(name = "precio", nullable = false)
    private Double precio;

    @Column(name = "fechaCreacion", nullable = false)
    private LocalDate fechaCreacion;

    @Column(name = "fechaModificacion", nullable = false)
    private LocalDate fechaModificacion;

    //enum para estadoProducto
    @Enumerated(EnumType.STRING)
    @Column(name = "estadoProducto", nullable = false)
    private EstadoProducto estadoProducto;

    public enum EstadoProducto {
        Activo,
        Inactivo
    }

    // Relación muchos a uno con Categoria
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCategoria", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Categoria categoria;

    // Relación muchos a uno con Marca
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idMarca", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Marca marca;

    // Relación muchos a uno con Material
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idMaterial", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Material material;

    // Relación muchos a uno con Material
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPublico", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TipoPublico tipoPublico;

    // Relación muchos a uno con Material
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPromocion", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Promocion promocion;

    // Constructor vacío (necesario para JPA)
    public Producto() {}

    // Constructor con parámetros
    public Producto(String nombreProducto, String codigoReferencia, String descripcion, 
                    Double precio, LocalDate fechaCreacion, LocalDate fechaModificacion,
                    EstadoProducto estadoProducto, Categoria categoria, Marca marca,
                    Material material, TipoPublico tipoPublico, Promocion promocion) {
        this.nombreProducto = nombreProducto;
        this.codigoReferencia = codigoReferencia;
        this.descripcion = descripcion;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
        this.estadoProducto = estadoProducto;
        this.categoria = categoria;
        this.marca = marca;
        this.material = material;
        this.tipoPublico = tipoPublico;
        this.promocion = promocion;
    }

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

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public TipoPublico getTipoPublico() {
        return tipoPublico;
    }

    public void setTipoPublico(TipoPublico tipoPublico) {
        this.tipoPublico = tipoPublico;
    }

    public Promocion getPromocion() {
        return promocion;
    }

    public void setPromocion(Promocion promocion) {
        this.promocion = promocion;
    }

}
