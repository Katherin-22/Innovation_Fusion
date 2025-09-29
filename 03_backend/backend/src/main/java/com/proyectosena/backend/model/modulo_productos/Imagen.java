package com.proyectosena.backend.model.modulo_productos;

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
@Table(name = "Imagen")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idImagen")
    private Integer idImagen;

    @Column(name = "urlImagen", nullable = false, length = 255)
    private String urlImagen;

    // Relación muchos a uno con TipoProducto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idStock", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Stock stock;


    // Constructor vacío (necesario para JPA)
    public Imagen() {
    }

    // Constructor con parámetros
    public Imagen(String urlImagen) {
        this.urlImagen = urlImagen;
        this.stock = stock;
    }
    // Getters y Setters

    public Integer getIdImagen() {
        return idImagen;
    }

    public void setIdImagen(Integer idImagen) {
        this.idImagen = idImagen;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

}
