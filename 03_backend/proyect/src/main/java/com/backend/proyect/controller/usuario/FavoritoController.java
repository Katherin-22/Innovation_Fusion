package com.backend.proyect.controller.usuario;

import com.backend.proyect.service.usuario.FavoritoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favoritos")
@PreAuthorize("isAuthenticated()")
public class FavoritoController {

    private static final Logger logger = LoggerFactory.getLogger(FavoritoController.class);

    @Autowired
    private FavoritoService favoritoService;

    /**
     * Agregar producto a favoritos
     */
    @PostMapping("/producto/{idProducto}")
    public ResponseEntity<Map<String, Object>> agregarFavorito(@PathVariable Integer idProducto) {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();
            favoritoService.agregarAFavoritos(idUsuario, idProducto);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Producto agregado a favoritos");

            logger.info("Producto {} agregado a favoritos del usuario {}", idProducto, idUsuario);
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            logger.warn("Error al agregar favorito: {}", e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            logger.error("Error al agregar favorito", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Eliminar producto de favoritos
     */
    @DeleteMapping("/producto/{idProducto}")
    public ResponseEntity<Map<String, Object>> eliminarFavorito(@PathVariable Integer idProducto) {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();
            favoritoService.eliminarDeFavoritos(idUsuario, idProducto);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Producto eliminado de favoritos");

            logger.info("Producto {} eliminado de favoritos del usuario {}", idProducto, idUsuario);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error al eliminar favorito", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Verificar si un producto está en favoritos
     */
    @GetMapping("/producto/{idProducto}/estado")
    public ResponseEntity<Map<String, Object>> verificarFavorito(@PathVariable Integer idProducto) {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();
            boolean estaEnFavoritos = favoritoService.estaEnFavoritos(idUsuario, idProducto);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("esFavorito", estaEnFavoritos);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error al verificar favorito", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Obtener todos los favoritos del usuario
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> obtenerFavoritos() {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();
            var favoritos = favoritoService.obtenerFavoritos(idUsuario);

            // Convertir a formato simple para frontend
            List<Map<String, Object>> productosFavoritos = favoritos.stream()
                    .map(favorito -> {
                        Map<String, Object> producto = new HashMap<>();
                        producto.put("idProducto", favorito.getProducto().getIdProducto());
                        producto.put("nombreProducto", favorito.getProducto().getNombreProducto());
                        producto.put("codigoReferencia", favorito.getProducto().getCodigoReferencia());
                        producto.put("precio", favorito.getProducto().getPrecio());
                        producto.put("estadoProducto", favorito.getProducto().getEstadoProducto());
                        producto.put("fechaAgregado", favorito.getFechaAgregado());

                        // Agregar primera imagen si existe
                        if (!favorito.getProducto().getImagenes().isEmpty()) {
                            producto.put("imagenUrl", favorito.getProducto().getImagenes().get(0).getUrlImagen());
                        }

                        return producto;
                    })
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("favoritos", productosFavoritos);
            response.put("total", productosFavoritos.size());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error al obtener favoritos", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Obtener IDs de productos favoritos (para optimización)
     */
    @GetMapping("/ids")
    public ResponseEntity<Map<String, Object>> obtenerIdsFavoritos() {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();
            List<Integer> idsFavoritos = favoritoService.obtenerIdsProductosFavoritos(idUsuario);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("favoritosIds", idsFavoritos);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error al obtener IDs de favoritos", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Contar favoritos del usuario
     */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> contarFavoritos() {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();
            long count = favoritoService.contarFavoritos(idUsuario);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("count", count);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error al contar favoritos", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Método auxiliar para obtener el ID del usuario actual
     */
    private Integer obtenerIdUsuarioActual() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Asumiendo que el principal contiene el ID del usuario como String
        return Integer.parseInt(authentication.getName());
    }
}