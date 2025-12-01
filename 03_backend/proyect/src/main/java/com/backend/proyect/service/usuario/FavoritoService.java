package com.backend.proyect.service.usuario;

import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.usuario.Favorito;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.productos.ProductoRepository;
import com.backend.proyect.repository.usuario.FavoritoRepository;
import com.backend.proyect.repository.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    /**
     * Agregar producto a favoritos
     */
    public void agregarAFavoritos(Integer idUsuario, Integer idProducto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));

        // Verificar que el producto esté activo
        if (producto.getEstadoProducto() != Producto.EstadoProducto.Activo) {
            throw new IllegalArgumentException("El producto no está disponible");
        }

        // Verificar que no esté ya en favoritos
        if (favoritoRepository.existsByUsuarioAndProductoIdProducto(usuario, idProducto)) {
            throw new IllegalArgumentException("El producto ya está en favoritos");
        }

        Favorito favorito = new Favorito(usuario, producto);
        favoritoRepository.save(favorito);
    }

    /**
     * Eliminar producto de favoritos
     */
    public void eliminarDeFavoritos(Integer idUsuario, Integer idProducto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        Favorito favorito = favoritoRepository.findByUsuarioAndProductoIdProducto(usuario, idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Favorito no encontrado", idProducto));

        favoritoRepository.delete(favorito);
    }

    /**
     * Verificar si un producto está en favoritos
     */
    public boolean estaEnFavoritos(Integer idUsuario, Integer idProducto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        return favoritoRepository.existsByUsuarioAndProductoIdProducto(usuario, idProducto);
    }

    /**
     * Obtener todos los favoritos de un usuario
     */
    public List<Favorito> obtenerFavoritos(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        return favoritoRepository.findByUsuarioWithActiveProducts(usuario);
    }

    /**
     * Obtener lista de IDs de productos favoritos
     */
    public List<Integer> obtenerIdsProductosFavoritos(Integer idUsuario) {
        return obtenerFavoritos(idUsuario).stream()
                .map(favorito -> favorito.getProducto().getIdProducto())
                .collect(Collectors.toList());
    }

    /**
     * Contar favoritos de un usuario
     */
    public long contarFavoritos(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        return favoritoRepository.countByUsuario(usuario);
    }
}