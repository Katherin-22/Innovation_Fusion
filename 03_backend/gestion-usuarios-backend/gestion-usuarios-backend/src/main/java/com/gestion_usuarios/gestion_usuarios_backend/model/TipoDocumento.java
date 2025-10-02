package com.gestion_usuarios.gestion_usuarios_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipo_de_documento")

public class TipoDocumento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTipoDeDocumento")
    private Integer  idTipoDeDocumento;

    @Column(name = "nombreTipoDeDocumento")
    private String nombreTipoDeDocumento;


    // Getters and setters
}