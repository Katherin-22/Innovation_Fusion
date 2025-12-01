package com.backend.proyect.service.pedidos;

import com.backend.proyect.dto.pedidos.CheckoutRequest;
import com.backend.proyect.dto.pedidos.DetallePedidoDTO;
import com.backend.proyect.dto.pedidos.PedidoDTO;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.pedidos.*;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.pedidos.MetodoPagoRepository;
import com.backend.proyect.repository.pedidos.PedidoRepository;
import com.backend.proyect.repository.usuario.UsuarioRepository;
import com.backend.proyect.service.productos.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private MetodoPagoRepository metodoPagoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CarritoService carritoService;

    @Autowired
    private StockService stockService;

    /**
     * Realizar checkout del carrito
     */
    public PedidoDTO realizarCheckout(Integer idUsuario, CheckoutRequest request) {
        // Obtener usuario
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        // Obtener método de pago
        MetodoPago metodoPago = metodoPagoRepository.findById(request.getIdMetodoPago())
                .orElseThrow(() -> new ResourceNotFoundException("Método de pago", request.getIdMetodoPago()));

        // Verificar que el método de pago esté activo
        if (!metodoPago.getActivo()) {
            throw new IllegalArgumentException("El método de pago no está disponible");
        }

        // Obtener carrito del usuario
        var carritoDTO = carritoService.obtenerCarrito(idUsuario);

        if (carritoDTO.getDetallesCarrito() == null || carritoDTO.getDetallesCarrito().isEmpty()) {
            throw new IllegalArgumentException("El carrito está vacío");
        }

        // Verificar stock para todos los productos
        for (var detalle : carritoDTO.getDetallesCarrito()) {
            if (!stockService.hayStockDisponible(detalle.getIdProducto(), detalle.getCantidad())) {
                int stockDisponible = stockService.obtenerStockTotal(detalle.getIdProducto());
                throw new IllegalArgumentException(
                    "Stock insuficiente para " + detalle.getNombreProducto() +
                    ". Disponible: " + stockDisponible + ", solicitado: " + detalle.getCantidad());
            }
        }

        // Crear pedido
        Pedido pedido = new Pedido(
            usuario,
            metodoPago,
            carritoDTO.getTotal(),
            request.getDireccionEnvio() != null ? request.getDireccionEnvio() : usuario.getDireccion()
        );
        pedido.setNotas(request.getNotas());

        // Crear detalles del pedido
        for (var detalleCarrito : carritoDTO.getDetallesCarrito()) {
            DetallePedido detallePedido = new DetallePedido(
                pedido,
                detalleCarrito.getProducto(),
                detalleCarrito.getCantidad(),
                detalleCarrito.getPrecio()
            );
            pedido.getDetallesPedido().add(detallePedido);

            // Reducir stock
            stockService.reducirStock(detalleCarrito.getIdProducto(), detalleCarrito.getCantidad());
        }

        // Guardar pedido
        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        // Vaciar carrito después del checkout exitoso
        carritoService.vaciarCarrito(idUsuario);

        return convertirAPedidoDTO(pedidoGuardado);
    }

    /**
     * Obtener pedidos del usuario
     */
    public List<PedidoDTO> obtenerPedidosUsuario(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        List<Pedido> pedidos = pedidoRepository.findByUsuarioWithDetalles(usuario);
        return pedidos.stream()
                .map(this::convertirAPedidoDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtener pedido por ID
     */
    public PedidoDTO obtenerPedidoPorId(Integer idUsuario, Integer idPedido) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido", idPedido));

        // Verificar que el pedido pertenece al usuario
        if (!pedido.getUsuario().getIdUsuario().equals(idUsuario)) {
            throw new IllegalArgumentException("No tienes acceso a este pedido");
        }

        return convertirAPedidoDTO(pedido);
    }

    /**
     * Obtener métodos de pago disponibles
     */
    public List<MetodoPago> obtenerMetodosPagoDisponibles() {
        return metodoPagoRepository.findByActivoTrue();
    }

    /**
     * Convertir Pedido a PedidoDTO
     */
    private PedidoDTO convertirAPedidoDTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setIdPedido(pedido.getIdPedido());
        dto.setFechaPedido(pedido.getFechaPedido());
        dto.setEstadoPedido(pedido.getEstadoPedido().toString());
        dto.setTotal(pedido.getTotal());
        dto.setDireccionEnvio(pedido.getDireccionEnvio());
        dto.setNotas(pedido.getNotas());
        dto.setNombreMetodoPago(pedido.getMetodoPago().getNombreMetodoPago());

        List<DetallePedidoDTO> detallesDTO = pedido.getDetallesPedido().stream()
                .map(this::convertirADetallePedidoDTO)
                .collect(Collectors.toList());

        dto.setDetallesPedido(detallesDTO);
        return dto;
    }

    /**
     * Convertir DetallePedido a DetallePedidoDTO
     */
    private DetallePedidoDTO convertirADetallePedidoDTO(DetallePedido detalle) {
        DetallePedidoDTO dto = new DetallePedidoDTO();
        dto.setIdDetallePedido(detalle.getIdDetallePedido());
        dto.setIdProducto(detalle.getProducto().getIdProducto());
        dto.setNombreProducto(detalle.getProducto().getNombreProducto());
        dto.setCodigoReferencia(detalle.getProducto().getCodigoReferencia());
        dto.setCantidad(detalle.getCantidad());
        dto.setPrecioUnitario(detalle.getPrecioUnitario());
        dto.setSubtotal(detalle.getSubtotal());

        // Agregar primera imagen si existe
        if (!detalle.getProducto().getImagenes().isEmpty()) {
            dto.setImagenUrl(detalle.getProducto().getImagenes().get(0).getUrlImagen());
        }

        return dto;
    }
}