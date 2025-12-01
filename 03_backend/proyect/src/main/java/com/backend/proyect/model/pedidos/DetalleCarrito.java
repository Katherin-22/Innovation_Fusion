package com.backend.proyect.model.pedidos;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.usuario.Usuario;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DetalleCarrito")
@IdClass(DetalleCarritoId.class)
public class DetalleCarrito {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto")
    private Producto producto;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCarrito")
    private Carrito carrito;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;
}