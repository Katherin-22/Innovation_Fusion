package com.backend.proyect.repository.usuario;

import com.backend.proyect.model.usuario.Favorito;
import com.backend.proyect.model.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FavoritoRepository extends JpaRepository<Favorito, Integer> {

    // Verificar si un producto está en favoritos de un usuario
    boolean existsByUsuarioAndProductoIdProducto(Usuario usuario, Integer idProducto);

    // Encontrar favorito específico
    Optional<Favorito> findByUsuarioAndProductoIdProducto(Usuario usuario, Integer idProducto);

    // Obtener todos los favoritos de un usuario
    List<Favorito> findByUsuarioOrderByFechaAgregadoDesc(Usuario usuario);

    // Obtener favoritos con productos activos
    @Query("SELECT f FROM Favorito f WHERE f.usuario = :usuario AND f.producto.estadoProducto = 'Activo' ORDER BY f.fechaAgregado DESC")
    List<Favorito> findByUsuarioWithActiveProducts(Usuario usuario);

    // Contar favoritos de un usuario
    long countByUsuario(Usuario usuario);
}