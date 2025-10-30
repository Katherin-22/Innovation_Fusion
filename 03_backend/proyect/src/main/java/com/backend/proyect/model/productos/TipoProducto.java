package com.backend.proyect.model.productos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TipoProducto")
public class TipoProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idTipoProducto")
    private Integer idTipoProducto;

    @Column(name = "nombreTipoProducto", nullable = false, length = 45)
    private String nombreTipoProducto;

    // Constructor vacío (necesario para JPA)
    public TipoProducto() {}

    // Constructor con parámetros
    public TipoProducto(String nombreTipoProducto) {
        this.nombreTipoProducto = nombreTipoProducto;
    }
    
    // Getters y Setters

    public Integer getIdTipoProducto() {
        return idTipoProducto;
    }

    public void setIdTipoProducto(Integer idTipoProducto) {
        this.idTipoProducto = idTipoProducto;
    }

    public String getNombreTipoProducto() {
        return nombreTipoProducto;
    }

    public void setNombreTipoProducto(String nombreTipoProducto) {
        this.nombreTipoProducto = nombreTipoProducto;
    }
    
}
