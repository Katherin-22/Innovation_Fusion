package com.backend.proyect.model.productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Color")
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idColor")
    private Integer idColor;

    @Column(name = "nombreColor", nullable = false, length = 45)
    private String nombreColor;

    // Constructor vacío (necesario para JPA)
    public Color() {}

    // Constructor con parámetros
    public Color(String nombreColor) {
        this.nombreColor = nombreColor;
    }

    // Getters y Setters
    public Integer getIdColor() {
        return idColor;
    }

    public void setIdColor(Integer idColor) {
        this.idColor = idColor;
    }

    public String getNombreColor() {
        return nombreColor;
    }

    public void setNombreColor(String nombreColor) {
        this.nombreColor = nombreColor;
    }

    
}
