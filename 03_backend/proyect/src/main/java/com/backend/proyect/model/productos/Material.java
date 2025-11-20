package com.backend.proyect.model.productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idMaterial")
    private Integer idMaterial;

    @Column(name = "nombreMaterial", nullable = false, length = 45)
    private String nombreMaterial;

    // Constructor vacío (necesario para JPA)
    public Material() {}

    // Constructor con parámetros
    public Material(String nombreMaterial) {
        this.nombreMaterial = nombreMaterial;
    }

    // Getters y Setters

    public Integer getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(Integer idMaterial) {
        this.idMaterial = idMaterial;
    }

    public String getNombreMaterial() {
        return nombreMaterial;
    }

    public void setNombreMaterial(String nombreMaterial) {
        this.nombreMaterial = nombreMaterial;
    }
    
}