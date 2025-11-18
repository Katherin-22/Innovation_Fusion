package com.backend.proyect.model.pedidos;

import java.io.Serializable;
import java.util.Objects;

public class DetalleCarritoId implements Serializable {

    private Integer producto;  // idProducto
    private Integer carrito;   // idCarrito

    // Default constructor
    public DetalleCarritoId() {}

    public DetalleCarritoId(Integer producto, Integer carrito) {
        this.producto = producto;
        this.carrito = carrito;
    }

    // Getters and setters
    public Integer getProducto() {
        return producto;
    }

    public void setProducto(Integer producto) {
        this.producto = producto;
    }

    public Integer getCarrito() {
        return carrito;
    }

    public void setCarrito(Integer carrito) {
        this.carrito = carrito;
    }

    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DetalleCarritoId that = (DetalleCarritoId) o;
        return Objects.equals(producto, that.producto) && Objects.equals(carrito, that.carrito);
    }

    @Override
    public int hashCode() {
        return Objects.hash(producto, carrito);
    }
}