package com.backend.proyect.model.productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private Tipo tipo;

    public enum Tipo {
        Talla_Calzado,
        Tamano_Bolso
    }

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

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    
}