package com.backend.proyect.model.pedidos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.backend.proyect.model.productos.Color;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.productos.Variacion;
import com.backend.proyect.model.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DetalleCarrito")
@IdClass(DetalleCarritoId.class)
public class DetalleCarrito {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Producto producto;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCarrito", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Carrito carrito;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idColor")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Color color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idVariacion")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Variacion variacion;
}