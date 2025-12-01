package com.backend.proyect.service.pedidos;

import com.backend.proyect.dto.pedidos.AgregarAlCarritoRequest;
import com.backend.proyect.dto.pedidos.CarritoDTO;
import com.backend.proyect.dto.pedidos.DetalleCarritoDTO;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.pedidos.Carrito;
import com.backend.proyect.model.pedidos.DetalleCarrito;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.pedidos.CarritoRepository;
import com.backend.proyect.repository.pedidos.DetalleCarritoRepository;
import com.backend.proyect.repository.productos.ProductoRepository;
import com.backend.proyect.repository.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private DetalleCarritoRepository detalleCarritoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private StockService stockService;

    /**
     * Obtener o crear carrito para un usuario
     */
    public Carrito obtenerOCrearCarrito(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));

        Optional<Carrito> carritoOpt = carritoRepository.findByUsuarioWithDetalles(usuario);

        if (carritoOpt.isPresent()) {
            return carritoOpt.get();
        } else {
            Carrito nuevoCarrito = new Carrito();
            nuevoCarrito.setUsuario(usuario);
            nuevoCarrito.setFechaCreacion(LocalDateTime.now());
            return carritoRepository.save(nuevoCarrito);
        }
    }

    /**
     * Agregar producto al carrito
     */
    public CarritoDTO agregarProducto(Integer idUsuario, AgregarAlCarritoRequest request) {
        Carrito carrito = obtenerOCrearCarrito(idUsuario);

        Producto producto = productoRepository.findById(request.getIdProducto())
                .orElseThrow(() -> new ResourceNotFoundException("Producto", request.getIdProducto()));

        // Verificar stock disponible
        if (producto.getEstadoProducto() != Producto.EstadoProducto.Activo) {
            throw new IllegalArgumentException("El producto no está disponible");
        }

        // Verificar stock disponible antes de agregar
        if (!stockService.hayStockDisponible(request.getIdProducto(), request.getCantidad())) {
            int stockDisponible = stockService.obtenerStockTotal(request.getIdProducto());
            throw new IllegalArgumentException("Stock insuficiente. Disponible: " + stockDisponible);
        }

        // Buscar si el producto ya está en el carrito
        DetalleCarrito detalleExistente = detalleCarritoRepository
                .findByProductoIdProductoAndCarritoIdCarrito(request.getIdProducto(), carrito.getIdCarrito());

        if (detalleExistente != null) {
            // Actualizar cantidad
            detalleExistente.setCantidad(detalleExistente.getCantidad() + request.getCantidad());
            detalleCarritoRepository.save(detalleExistente);
        } else {
            // Crear nuevo detalle
            DetalleCarrito nuevoDetalle = new DetalleCarrito();
            nuevoDetalle.setProducto(producto);
            nuevoDetalle.setCarrito(carrito);
            nuevoDetalle.setCantidad(request.getCantidad());
            nuevoDetalle.setUsuario(carrito.getUsuario());
            detalleCarritoRepository.save(nuevoDetalle);
        }

        return convertirACarritoDTO(carritoRepository.findByUsuarioWithDetalles(carrito.getUsuario()).get());
    }

    /**
     * Actualizar cantidad de un producto en el carrito
     */
    public CarritoDTO actualizarCantidad(Integer idUsuario, Integer idProducto, Integer nuevaCantidad) {
        Carrito carrito = obtenerOCrearCarrito(idUsuario);

        DetalleCarrito detalle = detalleCarritoRepository
                .findByProductoIdProductoAndCarritoIdCarrito(idProducto, carrito.getIdCarrito());

        if (detalle == null) {
            throw new ResourceNotFoundException("Producto en carrito", idProducto);
        }

        if (nuevaCantidad <= 0) {
            // Eliminar el producto del carrito
            detalleCarritoRepository.delete(detalle);
        } else {
            detalle.setCantidad(nuevaCantidad);
            detalleCarritoRepository.save(detalle);
        }

        return convertirACarritoDTO(carritoRepository.findByUsuarioWithDetalles(carrito.getUsuario()).get());
    }

    /**
     * Eliminar producto del carrito
     */
    public CarritoDTO eliminarProducto(Integer idUsuario, Integer idProducto) {
        Carrito carrito = obtenerOCrearCarrito(idUsuario);

        DetalleCarrito detalle = detalleCarritoRepository
                .findByProductoIdProductoAndCarritoIdCarrito(idProducto, carrito.getIdCarrito());

        if (detalle != null) {
            detalleCarritoRepository.delete(detalle);
        }

        return convertirACarritoDTO(carritoRepository.findByUsuarioWithDetalles(carrito.getUsuario()).get());
    }

    /**
     * Vaciar carrito completo
     */
    public void vaciarCarrito(Integer idUsuario) {
        Carrito carrito = obtenerOCrearCarrito(idUsuario);
        detalleCarritoRepository.deleteByCarritoId(carrito.getIdCarrito());
    }

    /**
     * Obtener carrito del usuario
     */
    public CarritoDTO obtenerCarrito(Integer idUsuario) {
        Carrito carrito = obtenerOCrearCarrito(idUsuario);
        return convertirACarritoDTO(carrito);
    }

    /**
     * Calcular total del carrito
     */
    private Double calcularTotal(Carrito carrito) {
        return carrito.getDetallesCarrito().stream()
                .mapToDouble(detalle -> detalle.getProducto().getPrecio() * detalle.getCantidad())
                .sum();
    }

    /**
     * Convertir Carrito a CarritoDTO
     */
    private CarritoDTO convertirACarritoDTO(Carrito carrito) {
        CarritoDTO dto = new CarritoDTO();
        dto.setIdCarrito(carrito.getIdCarrito());
        dto.setFechaCreacion(carrito.getFechaCreacion());
        dto.setIdUsuario(carrito.getUsuario().getIdUsuario());
        dto.setNombreUsuario(carrito.getUsuario().getNombreUsuario());

        List<DetalleCarritoDTO> detallesDTO = carrito.getDetallesCarrito().stream()
                .map(this::convertirADetalleCarritoDTO)
                .collect(Collectors.toList());

        dto.setDetallesCarrito(detallesDTO);
        dto.setTotal(calcularTotal(carrito));

        return dto;
    }

    /**
     * Convertir DetalleCarrito a DetalleCarritoDTO
     */
    private DetalleCarritoDTO convertirADetalleCarritoDTO(DetalleCarrito detalle) {
        DetalleCarritoDTO dto = new DetalleCarritoDTO();
        dto.setIdProducto(detalle.getProducto().getIdProducto());
        dto.setNombreProducto(detalle.getProducto().getNombreProducto());
        dto.setCodigoReferencia(detalle.getProducto().getCodigoReferencia());
        dto.setPrecio(detalle.getProducto().getPrecio());
        dto.setCantidad(detalle.getCantidad());
        dto.setSubtotal(detalle.getProducto().getPrecio() * detalle.getCantidad());

        // Obtener primera imagen del producto si existe
        if (!detalle.getProducto().getImagenes().isEmpty()) {
            dto.setImagenUrl(detalle.getProducto().getImagenes().get(0).getUrlImagen());
        }

        return dto;
    }
}