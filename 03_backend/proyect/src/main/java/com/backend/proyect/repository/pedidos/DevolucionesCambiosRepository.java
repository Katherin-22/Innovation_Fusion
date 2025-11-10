package com.backend.proyect.repository.pedidos;

import com.backend.proyect.model.pedidos.DevolucionesCambios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  DevolucionesCambiosRepository extends JpaRepository<DevolucionesCambios, Long> {
}
