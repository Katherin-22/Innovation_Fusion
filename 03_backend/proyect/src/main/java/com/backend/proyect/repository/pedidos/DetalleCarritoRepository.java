package com.backend.proyect.repository.pedidos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.pedidos.DetalleCarrito;
import com.backend.proyect.model.pedidos.DetalleCarritoId;
import com.backend.proyect.model.usuario.Usuario;

public interface DetalleCarritoRepository extends JpaRepository<DetalleCarrito, DetalleCarritoId> {

    // Buscar detalles por usuario
    List<DetalleCarrito> findByUsuario(Usuario usuario);

    // Buscar por carrito
    List<DetalleCarrito> findByCarritoIdCarrito(Integer idCarrito);

    // Verificar si existe un item específico en el carrito
    Optional<DetalleCarrito> findByUsuarioAndProductoIdProductoAndColorIdColorAndVariacionIdVariacion(
        Usuario usuario, Integer idProducto, Integer idColor, Integer idVariacion);
}