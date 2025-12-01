package com.backend.proyect.controller.pedidos;

import com.backend.proyect.dto.pedidos.CheckoutRequest;
import com.backend.proyect.dto.pedidos.PedidoDTO;
import com.backend.proyect.service.pedidos.PedidoService;
import jakarta.validation.Valid;
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

@RestController
@RequestMapping("/api/pedidos")
@PreAuthorize("isAuthenticated()")
public class PedidoController {

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    @Autowired
    private PedidoService pedidoService;

    /**
     * Realizar checkout del carrito
     */
    @PostMapping("/checkout")
    public ResponseEntity<Map<String, Object>> realizarCheckout(@Valid @RequestBody CheckoutRequest request) {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();

            logger.info("Realizando checkout para usuario {}", idUsuario);

            PedidoDTO pedido = pedidoService.realizarCheckout(idUsuario, request);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Pedido realizado exitosamente");
            response.put("pedido", pedido);

            logger.info("Checkout exitoso - Pedido ID: {} para usuario {}", pedido.getIdPedido(), idUsuario);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalArgumentException e) {
            logger.warn("Error en checkout: {}", e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);

        } catch (Exception e) {
            logger.error("Error interno en checkout", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Obtener pedidos del usuario actual
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> obtenerMisPedidos() {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();

            List<PedidoDTO> pedidos = pedidoService.obtenerPedidosUsuario(idUsuario);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("pedidos", pedidos);
            response.put("total", pedidos.size());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error al obtener pedidos", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Obtener pedido específico por ID
     */
    @GetMapping("/{idPedido}")
    public ResponseEntity<Map<String, Object>> obtenerPedido(@PathVariable Integer idPedido) {
        try {
            Integer idUsuario = obtenerIdUsuarioActual();

            PedidoDTO pedido = pedidoService.obtenerPedidoPorId(idUsuario, idPedido);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("pedido", pedido);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            logger.warn("Acceso denegado a pedido {}: {}", idPedido, e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);

        } catch (Exception e) {
            logger.error("Error al obtener pedido {}", idPedido, e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Obtener métodos de pago disponibles
     */
    @GetMapping("/metodos-pago")
    public ResponseEntity<Map<String, Object>> obtenerMetodosPago() {
        try {
            var metodosPago = pedidoService.obtenerMetodosPagoDisponibles();

            // Convertir a formato simple para frontend
            List<Map<String, Object>> metodos = metodosPago.stream()
                    .map(metodo -> {
                        Map<String, Object> m = new HashMap<>();
                        m.put("idMetodoPago", metodo.getIdMetodoPago());
                        m.put("nombreMetodoPago", metodo.getNombreMetodoPago());
                        m.put("descripcion", metodo.getDescripcion());
                        return m;
                    })
                    .toList();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("metodosPago", metodos);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error al obtener métodos de pago", e);
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