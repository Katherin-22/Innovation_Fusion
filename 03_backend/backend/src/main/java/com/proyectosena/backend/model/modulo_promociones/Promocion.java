package com.proyectosena.backend.model.modulo_promociones;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Promocion")
public class Promocion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement en MySQL
    @Column(name = "idPromocion")
    private Integer idPromocion;

    @Column(name = "nombrePromocion", nullable = false, length = 50)
    private String nombrePromocion;
    
    @Column(name = "codigo_Promocion", nullable = false, length = 45)
    private String codigoPromocion;

    @Column(name = "descuento", nullable = false)
    private Integer descuento;

    @Column(name = "descripcion", nullable = false, length = 200)
    private String descripcion;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Enumerated(EnumType.STRING)
    @Column(name = "estadoPromocion", nullable = false)
    private EstadoPromocion estadoPromocion;

    public enum EstadoPromocion {
        Activo,
        Inactivo
    }

    // Constructor vacío (necesario para JPA)
    public Promocion() {}

    // Constructor con parámetros (útil para crear manualmente)
    public Promocion(String nombrePromocion, String codigoPromocion, Integer descuento,
                     String descripcion, LocalDate fechaInicio, LocalDate fechaFin, EstadoPromocion estadoPromocion) {
        this.nombrePromocion = nombrePromocion;
        this.codigoPromocion = codigoPromocion;
        this.descuento = descuento;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estadoPromocion = estadoPromocion;
    }
  // ---- GETTERS & SETTERS ----

    public Integer getIdPromocion() {
        return idPromocion;
    }

    public void setIdPromocion(Integer idPromocion) {
        this.idPromocion = idPromocion;
    }

    public String getNombrePromocion() {
        return nombrePromocion;
    }

    public void setNombrePromocion(String nombrePromocion) {
        this.nombrePromocion = nombrePromocion;
    }

    public String getCodigoPromocion() {
        return codigoPromocion;
    }

    public void setCodigoPromocion(String codigoPromocion) {
        this.codigoPromocion = codigoPromocion;
    }

    public Integer getDescuento() {
        return descuento;
    }

    public void setDescuento(Integer descuento) {
        this.descuento = descuento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public EstadoPromocion getEstadoPromocion() {
        return estadoPromocion;
    }

    public void setEstadoPromocion(EstadoPromocion estadoPromocion) {
        this.estadoPromocion = estadoPromocion;
    }
}