package com.proyectosena.backend.config.inbox;

import com.proyectosena.backend.model.inbox.Mensaje;
import com.proyectosena.backend.service.inbox.MensajeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
@CrossOrigin(origins = "*") // permitir frontend React
public class MensajeController {
    private final MensajeService service;

    public MensajeController(MensajeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Mensaje> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public Mensaje crear(@RequestBody Mensaje mensaje) {
        return service.guardar(mensaje);
    }

    @PostMapping("/{id}/responder")
    public Mensaje responder(@PathVariable Long id, @RequestBody String respuesta) {
        return service.responder(id, respuesta);
    }
}
