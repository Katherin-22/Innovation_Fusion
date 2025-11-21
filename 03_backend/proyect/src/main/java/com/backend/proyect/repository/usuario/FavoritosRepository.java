package com.backend.proyect.repository.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.usuario.Favoritos;
import com.backend.proyect.model.usuario.Usuario;

public interface FavoritosRepository extends JpaRepository<Favoritos, Integer> {

    // Buscar favoritos por usuario
    List<Favoritos> findByUsuario(Usuario usuario);

    // Verificar si un producto ya está en favoritos para un usuario
    Optional<Favoritos> findByUsuarioAndProductoIdProducto(Usuario usuario, Integer idProducto);

    // Contar favoritos por usuario
    long countByUsuario(Usuario usuario);
}