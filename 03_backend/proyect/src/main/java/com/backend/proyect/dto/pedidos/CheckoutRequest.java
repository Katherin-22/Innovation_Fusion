package com.backend.proyect.dto.pedidos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CheckoutRequest {

    @NotNull(message = "El ID del método de pago es obligatorio")
    private Integer idMetodoPago;

    @Size(max = 500, message = "Las notas no pueden exceder 500 caracteres")
    private String notas;

    private String direccionEnvio;

    public CheckoutRequest() {
    }

    public CheckoutRequest(Integer idMetodoPago, String notas, String direccionEnvio) {
        this.idMetodoPago = idMetodoPago;
        this.notas = notas;
        this.direccionEnvio = direccionEnvio;
    }

    // Getters y Setters
    public Integer getIdMetodoPago() {
        return idMetodoPago;
    }

    public void setIdMetodoPago(Integer idMetodoPago) {
        this.idMetodoPago = idMetodoPago;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public String getDireccionEnvio() {
        return direccionEnvio;
    }

    public void setDireccionEnvio(String direccionEnvio) {
        this.direccionEnvio = direccionEnvio;
    }
}