package com.backend.proyect.service.usuario;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.usuario.Favoritos;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.usuario.FavoritosRepository;

@Service
public class FavoritosService {

    private final FavoritosRepository favoritosRepository;

    public FavoritosService(FavoritosRepository favoritosRepository) {
        this.favoritosRepository = favoritosRepository;
    }

    // Agregar a favoritos
    public Favoritos agregarFavorito(Usuario usuario, Producto producto) {
        Optional<Favoritos> existente = favoritosRepository.findByUsuarioAndProductoIdProducto(usuario, producto.getIdProducto());
        if (existente.isPresent()) {
            throw new RuntimeException("Producto ya en favoritos");
        }
        Favoritos favorito = new Favoritos();
        favorito.setUsuario(usuario);
        favorito.setProducto(producto);
        favorito.setFechaAgregado(LocalDateTime.now());
        return favoritosRepository.save(favorito);
    }

    // Obtener favoritos del usuario
    public List<Favoritos> getFavoritos(Usuario usuario) {
        return favoritosRepository.findByUsuario(usuario);
    }

    // Eliminar favorito
    public void eliminarFavorito(Integer idFavorito) {
        favoritosRepository.deleteById(idFavorito);
    }

    // Verificar si es favorito
    public boolean esFavorito(Usuario usuario, Producto producto) {
        return favoritosRepository.findByUsuarioAndProductoIdProducto(usuario, producto.getIdProducto()).isPresent();
    }
}