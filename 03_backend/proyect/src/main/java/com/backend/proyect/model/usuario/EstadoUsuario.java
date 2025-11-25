package com.backend.proyect.model.usuario;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "estado_usuario")

public class EstadoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idestado_usuario")
    private Integer  idestado_usuario;

    @Column(name = "nombre_Estado_usuario")
    private String nombre_Estado_usuario;


    // Getters and setters
}
