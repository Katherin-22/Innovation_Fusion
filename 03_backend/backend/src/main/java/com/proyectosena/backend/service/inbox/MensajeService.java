package com.proyectosena.backend.service.inbox;

import com.proyectosena.backend.model.inbox.Mensaje;
import com.proyectosena.backend.repository.inbox.MensajeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MensajeService {
    private final MensajeRepository repository;

    public MensajeService(MensajeRepository repository) {
        this.repository = repository;
    }

    public List<Mensaje> listarTodos() {
        return repository.findAll();
    }

    public Mensaje guardar(Mensaje mensaje) {
        return repository.save(mensaje);
    }

    public Mensaje responder(Long id, String respuesta) {
        return repository.findById(id).map(m -> {
            m.setRespuesta(respuesta);
            m.setFechaRespuesta(LocalDateTime.now());
            return repository.save(m);
        }).orElseThrow(() -> new RuntimeException("Mensaje no encontrado"));
    }
}
