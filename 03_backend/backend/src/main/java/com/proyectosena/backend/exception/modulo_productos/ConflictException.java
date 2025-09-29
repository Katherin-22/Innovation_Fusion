package com.proyectosena.backend.exception.modulo_productos;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}