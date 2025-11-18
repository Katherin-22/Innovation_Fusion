package com.backend.proyect.repository.pedidos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.pedidos.Carrito;
import com.backend.proyect.model.usuario.Usuario;

public interface CarritoRepository extends JpaRepository<Carrito, Integer> {

    // Buscar carrito activo por usuario (asumiendo uno por usuario)
    Optional<Carrito> findByUsuario(Usuario usuario);
}