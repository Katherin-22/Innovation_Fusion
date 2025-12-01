package com.backend.proyect.dto.pedidos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleCarritoDTO {

    private Integer idProducto;
    private String nombreProducto;
    private String codigoReferencia;
    private Double precio;
    private Integer cantidad;
    private Double subtotal;
    private String imagenUrl;
}