package com.proyectosena.backend.repository.inbox;

import com.proyectosena.backend.model.inbox.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
}
