package com.backend.proyect.dto.productos;

import com.backend.proyect.model.productos.Variacion.Tipo;

public class VariacionDTO {
    private Integer idVariacion;
    private String nombre;

    public VariacionDTO() {}

    public VariacionDTO(Integer idVariacion, String nombre, Tipo tipo) {
        this.idVariacion = idVariacion;
        this.nombre = nombre;
    }

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
