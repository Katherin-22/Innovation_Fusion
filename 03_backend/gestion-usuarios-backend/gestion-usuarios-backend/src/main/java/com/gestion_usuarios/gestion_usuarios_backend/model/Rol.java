package com.gestion_usuarios.gestion_usuarios_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRol")
    private Integer  idRol;

    @Enumerated(EnumType.STRING)
    @Column(name = "nombreRol")
    private RolEnum nombreRol;


    // Getters and setters
}
