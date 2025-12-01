package com.backend.proyect.repository.pedidos;

import com.backend.proyect.model.pedidos.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Integer> {

    // Obtener métodos de pago activos
    List<MetodoPago> findByActivoTrue();

    // Buscar por nombre
    MetodoPago findByNombreMetodoPago(String nombreMetodoPago);
}