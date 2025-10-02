package com.gestion_usuarios.gestion_usuarios_backend.model;

import jakarta.persistence.*;

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
