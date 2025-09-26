package com.proyectosena.backend.model.modulo_productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "UrlImagen")
public class UrlImagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idUrlImagen")
    private Integer idUrlImagen;

    @Column(name = "urlImagen", nullable = false, length = 255)
    private String urlImagen;

    // Constructor vacío (necesario para JPA)
    public UrlImagen() {}

    // Constructor con parámetros
    public UrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }
    // Getters y Setters
    public Integer getIdUrlImagen() {
        return idUrlImagen;
    }

    public void setIdUrlImagen(Integer idUrlImagen) {
        this.idUrlImagen = idUrlImagen;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }


    
}


