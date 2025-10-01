package com.proyectosena.backend.DTO.modulo_promociones;

import java.time.LocalDate;

import com.proyectosena.backend.model.modulo_promociones.Promocion;
import com.proyectosena.backend.model.modulo_promociones.Promocion.EstadoPromocion;

public class PromocionDTO {

    private String nombrePromocion;
    private String codigoPromocion;
    private Integer descuento;
    private String descripcion;
    private LocalDate fechaFin;
    private EstadoPromocion estadoPromocion;

    // Getters y Setters
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
