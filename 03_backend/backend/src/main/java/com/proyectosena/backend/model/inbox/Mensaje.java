package com.proyectosena.backend.model.inbox;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "mensajes")
@Data
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;

    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    @Column(columnDefinition = "TEXT")
    private String respuesta;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(name = "fecha_respuesta")
    private LocalDateTime fechaRespuesta;

    public enum Tipo {
        RECLAMO, SOLICITUD_CAMBIO, PREGUNTA, SUGERENCIA
    }
}
