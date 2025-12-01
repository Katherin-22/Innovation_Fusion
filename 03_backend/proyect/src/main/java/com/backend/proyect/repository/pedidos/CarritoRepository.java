package com.backend.proyect.repository.pedidos;

import com.backend.proyect.model.pedidos.Carrito;
import com.backend.proyect.model.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito, Integer> {

    // Buscar carrito activo de un usuario
    Optional<Carrito> findByUsuario(Usuario usuario);

    // Buscar carrito por usuario con detalles cargados
    @Query("SELECT c FROM Carrito c LEFT JOIN FETCH c.detallesCarrito WHERE c.usuario = :usuario")
    Optional<Carrito> findByUsuarioWithDetalles(@Param("usuario") Usuario usuario);
}