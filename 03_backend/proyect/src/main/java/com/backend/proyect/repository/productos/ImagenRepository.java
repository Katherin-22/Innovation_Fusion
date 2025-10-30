package com.backend.proyect.repository.productos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.productos.Imagen;


public interface ImagenRepository extends JpaRepository<Imagen,Integer>{
    List<Imagen> findByProductoIdProducto(Integer idProducto);

}
