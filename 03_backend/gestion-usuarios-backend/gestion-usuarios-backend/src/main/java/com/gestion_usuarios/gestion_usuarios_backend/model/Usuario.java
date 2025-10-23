package com.gestion_usuarios.gestion_usuarios_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Usuario")

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuario")
    private Integer idUsuario;

    @Column(name = "numeroDocumento", nullable = false)
    private Integer numeroDocumento;

    @Column(name = "nombreUsuario" , nullable = false)
    private String nombreUsuario;

    @Column(name = "primerApellido", nullable = false)
    private String primerApellido;

    @Column(name = "segundoApellido")
    private String segundoApellido;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "password")
    private String password;

    @Column(name = "correoElectronico")
    private String correoElectronico;

    @Column(name = "Direccion")
    private String Direccion;

    @ManyToOne
    @JoinColumn(name = "idRol", referencedColumnName = "idRol")
    private Rol rol;

    @ManyToOne
    @JoinColumn(name = "idTipoDeDocumento", referencedColumnName = "idTipoDeDocumento")
    private TipoDocumento  tipo_de_documento;

    @ManyToOne
    @JoinColumn(name = "idestado_usuario", referencedColumnName = "idestado_usuario")
    private EstadoUsuario  estado_usuario;
}


