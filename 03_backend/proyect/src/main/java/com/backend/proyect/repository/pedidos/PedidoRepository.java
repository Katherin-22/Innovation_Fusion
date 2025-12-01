package com.backend.proyect.repository.pedidos;

import com.backend.proyect.model.pedidos.Pedido;
import com.backend.proyect.model.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    // Obtener pedidos de un usuario ordenados por fecha descendente
    List<Pedido> findByUsuarioOrderByFechaPedidoDesc(Usuario usuario);

    // Obtener pedidos por estado
    List<Pedido> findByEstadoPedido(Pedido.EstadoPedido estadoPedido);

    // Obtener pedidos de un usuario por estado
    List<Pedido> findByUsuarioAndEstadoPedidoOrderByFechaPedidoDesc(Usuario usuario, Pedido.EstadoPedido estadoPedido);

    // Contar pedidos de un usuario
    long countByUsuario(Usuario usuario);

    // Buscar pedidos con detalles (para optimización)
    @Query("SELECT p FROM Pedido p LEFT JOIN FETCH p.detallesPedido WHERE p.usuario = :usuario ORDER BY p.fechaPedido DESC")
    List<Pedido> findByUsuarioWithDetalles(Usuario usuario);
}