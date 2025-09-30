package com.proyectosena.backend.model.modulo_productos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Stock")

public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idStock")
    private Integer idStock;

    @Column(name = "stockMinimo", nullable = false)
    private Integer stockMinimo;

    @Column(name = "stockActual", nullable = false)
    private Integer stockActual;

    // Relación muchos a uno con TipoProducto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idColor", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Color color;

    // Relación muchos a uno con TipoProducto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idVariacion", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Variacion variacion;

    // Relación muchos a uno con TipoProducto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Producto producto;

    public Stock() {
    }

    public Stock(Integer stockMinimo, Integer stockActual, LocalDate fechaModificacion,
            Color color, Variacion variacion, Producto producto) {
        this.stockMinimo = stockMinimo;
        this.stockActual = stockActual;
        this.color = color;
        this.variacion = variacion;
        this.producto = producto;
    }
    // getters y setters

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

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Variacion getVariacion() {
        return variacion;
    }

    public void setVariacion(Variacion variacion) {
        this.variacion = variacion;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

}
