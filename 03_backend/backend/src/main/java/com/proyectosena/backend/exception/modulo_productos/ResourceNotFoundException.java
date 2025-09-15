package com.proyectosena.backend.exception.modulo_productos;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String resourceName, Integer id){
        super(resourceName + " con id " + id + " no encontrado.");
    }
}
