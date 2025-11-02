package com.backend.proyect.model.productos;

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
@Table(name = "Categoria")

public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idCategoria")
    private Integer idCategoria;

    @Column(name = "nombreCategoria", nullable = false, length = 45)
    private String nombreCategoria;

    // Relación muchos a uno con TipoProducto
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idTipoProducto", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TipoProducto tipoProducto;

    public Categoria() {
    }

    public Categoria(String nombreCategoria, TipoProducto tipoProducto) {
        this.nombreCategoria = nombreCategoria;
        this.tipoProducto = tipoProducto;
    }
    // getters y setters

    public Integer getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getNombreCategoria() {
        return nombreCategoria;
    }

    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }

    public TipoProducto getTipoProducto() {
        return tipoProducto;
    }

    public void setTipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
    }

}
