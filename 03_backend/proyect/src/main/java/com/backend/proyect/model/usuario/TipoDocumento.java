package com.backend.proyect.model.usuario;

import jakarta.persistence.*;
import lombok.Data;

@Data
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

