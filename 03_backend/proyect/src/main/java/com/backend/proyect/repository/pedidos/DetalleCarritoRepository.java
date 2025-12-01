package com.backend.proyect.repository.pedidos;

import com.backend.proyect.model.pedidos.DetalleCarrito;
import com.backend.proyect.model.pedidos.DetalleCarritoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DetalleCarritoRepository extends JpaRepository<DetalleCarrito, DetalleCarritoId> {

    // Buscar detalles por carrito
    List<DetalleCarrito> findByCarritoIdCarrito(Integer idCarrito);

    // Buscar detalle específico por producto y carrito
    DetalleCarrito findByProductoIdProductoAndCarritoIdCarrito(Integer idProducto, Integer idCarrito);

    // Eliminar todos los detalles de un carrito
    @Modifying
    @Query("DELETE FROM DetalleCarrito dc WHERE dc.carrito.idCarrito = :idCarrito")
    void deleteByCarritoId(@Param("idCarrito") Integer idCarrito);

    // Verificar si existe un detalle para un producto y carrito
    boolean existsByProductoIdProductoAndCarritoIdCarrito(Integer idProducto, Integer idCarrito);
}