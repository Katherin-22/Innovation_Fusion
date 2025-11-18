package com.backend.proyect.controller.pedidos;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.proyect.model.pedidos.DetalleCarrito;
import com.backend.proyect.model.pedidos.DetalleCarritoId;
import com.backend.proyect.model.productos.Color;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.productos.Variacion;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.security.usuario.JwtUtil;
import com.backend.proyect.service.pedidos.CarritoService;
import com.backend.proyect.service.usuario.UserService;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    private final CarritoService carritoService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public CarritoController(CarritoService carritoService, UserService userService, JwtUtil jwtUtil) {
        this.carritoService = carritoService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    private Usuario getCurrentUser(String token) {
        String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        return userService.findByCorreoElectronico(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @GetMapping
    public ResponseEntity<List<DetalleCarrito>> getCarrito(@RequestHeader("Authorization") String token) {
        Usuario usuario = getCurrentUser(token);
        List<DetalleCarrito> items = carritoService.getItemsCarrito(usuario);
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<DetalleCarrito> agregarItem(
            @RequestHeader("Authorization") String token,
            @RequestBody AgregarCarritoRequest request) {
        Usuario usuario = getCurrentUser(token);
        Producto producto = new Producto(); producto.setIdProducto(request.getIdProducto());
        Color color = request.getIdColor() != null ? new Color() : null; if (color != null) color.setIdColor(request.getIdColor());
        Variacion variacion = request.getIdVariacion() != null ? new Variacion() : null; if (variacion != null) variacion.setIdVariacion(request.getIdVariacion());
        DetalleCarrito item = carritoService.agregarItem(usuario, producto, color, variacion, request.getCantidad());
        return ResponseEntity.ok(item);
    }

    @PutMapping("/{idProducto}/{idCarrito}")
    public ResponseEntity<DetalleCarrito> actualizarCantidad(
            @PathVariable Integer idProducto,
            @PathVariable Integer idCarrito,
            @RequestBody ActualizarCantidadRequest request) {
        DetalleCarritoId id = new DetalleCarritoId(idProducto, idCarrito);
        DetalleCarrito item = carritoService.actualizarCantidad(id, request.getCantidad());
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{idProducto}/{idCarrito}")
    public ResponseEntity<Void> eliminarItem(
            @PathVariable Integer idProducto,
            @PathVariable Integer idCarrito) {
        DetalleCarritoId id = new DetalleCarritoId(idProducto, idCarrito);
        carritoService.eliminarItem(id);
        return ResponseEntity.noContent().build();
    }

    // DTOs internos
    public static class AgregarCarritoRequest {
        private Integer idProducto;
        private Integer idColor;
        private Integer idVariacion;
        private Integer cantidad;
        // getters/setters
        public Integer getIdProducto() { return idProducto; }
        public void setIdProducto(Integer idProducto) { this.idProducto = idProducto; }
        public Integer getIdColor() { return idColor; }
        public void setIdColor(Integer idColor) { this.idColor = idColor; }
        public Integer getIdVariacion() { return idVariacion; }
        public void setIdVariacion(Integer idVariacion) { this.idVariacion = idVariacion; }
        public Integer getCantidad() { return cantidad; }
        public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    }

    public static class ActualizarCantidadRequest {
        private Integer cantidad;
        public Integer getCantidad() { return cantidad; }
        public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    }
}