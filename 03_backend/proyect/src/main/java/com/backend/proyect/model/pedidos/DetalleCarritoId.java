package com.backend.proyect.model.pedidos;

import java.io.Serializable;
import java.util.Objects;

public class DetalleCarritoId implements Serializable {

    private Integer producto;
    private Integer carrito;

    public DetalleCarritoId() {}

    public DetalleCarritoId(Integer producto, Integer carrito) {
        this.producto = producto;
        this.carrito = carrito;
    }

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