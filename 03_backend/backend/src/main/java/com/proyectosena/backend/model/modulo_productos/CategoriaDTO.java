package com.proyectosena.backend.model.modulo_productos;

public class CategoriaDTO {
//unicamente se le pasara esto al usuario
    private String nombreCategoria;
    private Integer idTipoProducto;

    // Getters y Setters
    public String getNombreCategoria() {
        return nombreCategoria;
    }

    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }

    public Integer getIdTipoProducto() {
        return idTipoProducto;
    }

    public void setIdTipoProducto(Integer idTipoProducto) {
        this.idTipoProducto = idTipoProducto;
    }

}
