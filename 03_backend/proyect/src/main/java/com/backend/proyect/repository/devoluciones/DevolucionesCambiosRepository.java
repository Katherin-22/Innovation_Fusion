package com.backend.proyect.repository.devoluciones;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.proyect.model.devoluciones.DevolucionesCambios;

@Repository
public interface  DevolucionesCambiosRepository extends JpaRepository<DevolucionesCambios, Long> {
}
