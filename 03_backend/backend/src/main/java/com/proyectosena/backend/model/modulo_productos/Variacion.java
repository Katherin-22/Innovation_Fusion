package com.proyectosena.backend.model.modulo_productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Variacion")
public class Variacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idVariacion")
    private Integer idVariacion;

    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    // Constructor vacío (necesario para JPA)
    public Variacion() {}

    // Constructor con parámetros
    public Variacion(String nombre) {
        this.nombre = nombre;
    }
    // Getters y Setters
    public Integer getIdVariacion() {
        return idVariacion;
    }

    public void setIdVariacion(Integer idVariacion) {
        this.idVariacion = idVariacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
}