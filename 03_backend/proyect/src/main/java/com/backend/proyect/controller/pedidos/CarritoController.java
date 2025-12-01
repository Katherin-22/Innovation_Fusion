package com.backend.proyect.controller.pedidos;

import com.backend.proyect.dto.pedidos.AgregarAlCarritoRequest;
import com.backend.proyect.dto.pedidos.CarritoDTO;
import com.backend.proyect.service.pedidos.CarritoService;
import com.backend.proyect.security.usuario.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/carrito")
@PreAuthorize("isAuthenticated()")
public class CarritoController {

    private static final Logger logger = LoggerFactory.getLogger(CarritoController.class);

    @Autowired
    private CarritoService carritoService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Obtener carrito del usuario actual
     */
    @GetMapping
    public ResponseEntity<CarritoDTO> obtenerCarrito(@RequestHeader("Authorization") String token) {
        Integer idUsuario = obtenerIdUsuarioDesdeToken(token);
        logger.info("Obteniendo carrito para usuario: {}", idUsuario);

        CarritoDTO carrito = carritoService.obtenerCarrito(idUsuario);
        return ResponseEntity.ok(carrito);
    }

    /**
     * Agregar producto al carrito
     */
    @PostMapping("/agregar")
    public ResponseEntity<CarritoDTO> agregarProducto(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody AgregarAlCarritoRequest request) {

        Integer idUsuario = obtenerIdUsuarioDesdeToken(token);
        logger.info("Agregando producto {} al carrito del usuario {} - cantidad: {}",
                   request.getIdProducto(), idUsuario, request.getCantidad());

        CarritoDTO carrito = carritoService.agregarProducto(idUsuario, request);
        logger.info("Producto agregado exitosamente. Total del carrito: {}", carrito.getTotal());

        return ResponseEntity.ok(carrito);
    }

    /**
     * Actualizar cantidad de un producto en el carrito
     */
    @PutMapping("/producto/{idProducto}/cantidad/{cantidad}")
    public ResponseEntity<CarritoDTO> actualizarCantidad(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer idProducto,
            @PathVariable Integer cantidad) {

        Integer idUsuario = obtenerIdUsuarioDesdeToken(token);
        logger.info("Actualizando cantidad del producto {} a {} para usuario {}",
                   idProducto, cantidad, idUsuario);

        CarritoDTO carrito = carritoService.actualizarCantidad(idUsuario, idProducto, cantidad);
        return ResponseEntity.ok(carrito);
    }

    /**
     * Eliminar producto del carrito
     */
    @DeleteMapping("/producto/{idProducto}")
    public ResponseEntity<CarritoDTO> eliminarProducto(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer idProducto) {

        Integer idUsuario = obtenerIdUsuarioDesdeToken(token);
        logger.info("Eliminando producto {} del carrito del usuario {}", idProducto, idUsuario);

        CarritoDTO carrito = carritoService.eliminarProducto(idUsuario, idProducto);
        return ResponseEntity.ok(carrito);
    }

    /**
     * Vaciar carrito completo
     */
    @DeleteMapping
    public ResponseEntity<Void> vaciarCarrito(@RequestHeader("Authorization") String token) {
        Integer idUsuario = obtenerIdUsuarioDesdeToken(token);
        logger.info("Vaciando carrito completo del usuario {}", idUsuario);

        carritoService.vaciarCarrito(idUsuario);
        return ResponseEntity.noContent().build();
    }

    /**
     * Obtener ID del usuario desde el token JWT
     */
    private Integer obtenerIdUsuarioDesdeToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            Long userId = jwtUtil.extractUserId(token);
            return userId != null ? userId.intValue() : null;
        }
        throw new IllegalArgumentException("Token inválido");
    }
}