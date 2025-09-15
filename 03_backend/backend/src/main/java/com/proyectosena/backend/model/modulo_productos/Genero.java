package com.proyectosena.backend.model.modulo_productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Genero")
public class Genero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idGenero")
    private Integer idGenero;

    @Column(name = "nombreGenero", nullable = false, length = 45)
    private String nombreGenero;

    // Constructor vacío (necesario para JPA)
    public Genero() {}

    // Constructor con parámetros
    public Genero(String nombreGenero) {
        this.nombreGenero = nombreGenero;
    }
// Getters y Setters
    public Integer getIdGenero() {
        return idGenero;
    }

    public void setIdGenero(Integer idGenero) {
        this.idGenero = idGenero;
    }

    public String getNombreGenero() {
        return nombreGenero;
    }

    public void setNombreGenero(String nombreGenero) {
        this.nombreGenero = nombreGenero;
    }

}