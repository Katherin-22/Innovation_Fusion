package com.backend.proyect.exception.productos;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}