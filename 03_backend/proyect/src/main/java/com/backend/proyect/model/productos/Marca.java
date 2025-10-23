package com.backend.proyect.model.productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Marca")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idMarca")
    private Integer idMarca;

    @Column(name = "nombreMarca", nullable = false, length = 45)
    private String nombreMarca;

    // Constructor vacío (necesario para JPA)
    public Marca() {}

    // Constructor con parámetros
    public Marca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
    }
    // Getters y Setters
    public Integer getIdMarca() {
        return idMarca;
    }

    public void setIdMarca(Integer idMarca) {
        this.idMarca = idMarca;
    }

    public String getNombreMarca() {
        return nombreMarca;
    }

    public void setNombreMarca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
    }

}
