package com.proyectosena.backend.repository.modulo_productos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectosena.backend.model.modulo_productos.Material;

public interface MaterialRepository extends JpaRepository<Material,Integer>{
    
}