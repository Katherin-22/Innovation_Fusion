package com.backend.proyect.dto.productos;

public class ColorDTO {
    private Integer idColor;
    private String nombreColor;

    public ColorDTO() {}

    public ColorDTO(Integer idColor, String nombreColor) {
        this.idColor = idColor;
        this.nombreColor = nombreColor;
    }

    public Integer getIdColor() {
        return idColor;
    }

    public void setIdColor(Integer idColor) {
        this.idColor = idColor;
    }

    public String getNombreColor() {
        return nombreColor;
    }

    public void setNombreColor(String nombreColor) {
        this.nombreColor = nombreColor;
    }    
    
}
