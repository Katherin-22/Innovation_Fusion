package com.proyectosena.backend.model.modulo_productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TipoPublico")
public class TipoPublico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idPublico")
    private Integer idPublico;

    @Column(name = "nombrePublico", nullable = false, length = 45)
    private String nombrePublico;

    // Constructor vacío (necesario para JPA)
    public TipoPublico() {}

    // Constructor con parámetros
    public TipoPublico(String nombrePublico) {
        this.nombrePublico = nombrePublico;
    }
// Getters y Setters

    public Integer getIdPublico() {
        return idPublico;
    }

    public void setIdPublico(Integer idPublico) {
        this.idPublico = idPublico;
    }

    public String getNombrePublico() {
        return nombrePublico;
    }

    public void setNombrePublico(String nombrePublico) {
        this.nombrePublico = nombrePublico;
    }

}