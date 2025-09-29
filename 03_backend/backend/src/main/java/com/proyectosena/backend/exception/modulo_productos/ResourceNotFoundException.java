package com.proyectosena.backend.exception.modulo_productos;

/*Cuándo usarla: cuando no se encuentra un recurso en GET, PUT o DELETE 
(ej: producto con ID inexistente).
Sirve para: GET (buscar producto), PUT (editar producto inexistente), 
DELETE (eliminar producto inexistente). */
public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String resourceName, Integer id){
        super(resourceName + " con id " + id + " no encontrado.");
    }
}
