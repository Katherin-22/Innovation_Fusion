package com.backend.proyect.service.pedidos;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.proyect.model.pedidos.Carrito;
import com.backend.proyect.model.pedidos.DetalleCarrito;
import com.backend.proyect.model.pedidos.DetalleCarritoId;
import com.backend.proyect.model.productos.Color;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.productos.Variacion;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.pedidos.CarritoRepository;
import com.backend.proyect.repository.pedidos.DetalleCarritoRepository;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final DetalleCarritoRepository detalleCarritoRepository;

    public CarritoService(CarritoRepository carritoRepository, DetalleCarritoRepository detalleCarritoRepository) {
        this.carritoRepository = carritoRepository;
        this.detalleCarritoRepository = detalleCarritoRepository;
    }

    // Obtener o crear carrito para el usuario
    public Carrito getOrCreateCarrito(Usuario usuario) {
        Optional<Carrito> carritoOpt = carritoRepository.findByUsuario(usuario);
        if (carritoOpt.isPresent()) {
            return carritoOpt.get();
        }
        Carrito nuevoCarrito = new Carrito();
        nuevoCarrito.setUsuario(usuario);
        nuevoCarrito.setFechaCreacion(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return carritoRepository.save(nuevoCarrito);
    }

    // Agregar item al carrito
    public DetalleCarrito agregarItem(Usuario usuario, Producto producto, Color color, Variacion variacion, Integer cantidad) {
        Carrito carrito = getOrCreateCarrito(usuario);

        Optional<DetalleCarrito> existente = detalleCarritoRepository
            .findByUsuarioAndProductoIdProductoAndColorIdColorAndVariacionIdVariacion(
                usuario, producto.getIdProducto(), color != null ? color.getIdColor() : null,
                variacion != null ? variacion.getIdVariacion() : null);

        if (existente.isPresent()) {
            DetalleCarrito item = existente.get();
            item.setCantidad(item.getCantidad() + cantidad);
            return detalleCarritoRepository.save(item);
        } else {
            DetalleCarrito nuevoItem = new DetalleCarrito();
            nuevoItem.setUsuario(usuario);
            nuevoItem.setCarrito(carrito);
            nuevoItem.setProducto(producto);
            nuevoItem.setColor(color);
            nuevoItem.setVariacion(variacion);
            nuevoItem.setCantidad(cantidad);
            return detalleCarritoRepository.save(nuevoItem);
        }
    }

    // Obtener items del carrito
    public List<DetalleCarrito> getItemsCarrito(Usuario usuario) {
        Carrito carrito = getOrCreateCarrito(usuario);
        return detalleCarritoRepository.findByCarritoIdCarrito(carrito.getIdCarrito());
    }

    // Actualizar cantidad
    public DetalleCarrito actualizarCantidad(DetalleCarritoId id, Integer cantidad) {
        Optional<DetalleCarrito> itemOpt = detalleCarritoRepository.findById(id);
        if (itemOpt.isPresent()) {
            DetalleCarrito item = itemOpt.get();
            item.setCantidad(cantidad);
            return detalleCarritoRepository.save(item);
        }
        throw new RuntimeException("Item no encontrado");
    }

    // Eliminar item
    public void eliminarItem(DetalleCarritoId id) {
        detalleCarritoRepository.deleteById(id);
    }
}