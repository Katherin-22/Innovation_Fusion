package com.backend.proyect.repository.productos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.productos.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria,Integer>{

}
