package com.backend.proyect.dto.pedidos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoDTO {

    private Integer idCarrito;
    private LocalDateTime fechaCreacion;
    private Integer idUsuario;
    private String nombreUsuario;
    private List<DetalleCarritoDTO> detallesCarrito;
    private Double total;
}