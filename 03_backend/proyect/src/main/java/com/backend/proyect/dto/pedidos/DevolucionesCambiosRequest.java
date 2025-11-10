package com.backend.proyect.dto.pedidos;

public class DevolucionesCambiosRequest {

    private String motivo;
    private String tipoSolicitud;
    private String estadoSolicitud;
    private String fechaSolicitud;
    private String fechaRespuesta;


    private Long idUsuario;

    // Getters y Setters
    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getTipoSolicitud() {
        return tipoSolicitud;
    }

    public void setTipoSolicitud(String tipoSolicitud) {
        this.tipoSolicitud = tipoSolicitud;
    }

    public String getEstadoSolicitud() {
        return estadoSolicitud;
    }

    public void setEstadoSolicitud(String estadoSolicitud) {
        this.estadoSolicitud = estadoSolicitud;
    }

    public String getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(String fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public String getFechaRespuesta() {
        return fechaRespuesta;
    }

    public void setFechaRespuesta(String fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }

    public Long getIdUsuario() { return idUsuario; }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

}
