package com.backend.proyect.model.pedidos;

import com.backend.proyect.model.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "devoluciones_Cambios")

public class DevolucionesCambios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_devolucion")
    private Integer id_devolucion;

    @Column(name = "motivo", nullable = false)
    private String motivo;

    @Column(name = "tipo_solicitud" , nullable = false)
    private String tipoSolicitud;

    @Column(name = "estado_solicitud", nullable = false)
    private String estadoSolicitud;

    @Column(name = "fecha_solicitud")
    private String fechaSolicitud;

    @Column(name = "fecha_respuesta")
    private String fechaRespuesta;

    @ManyToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario")
    private Usuario usuario;

}
