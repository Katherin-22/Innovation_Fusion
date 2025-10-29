package com.backend.proyect.repository.productos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.productos.Stock;

public interface StockRepository extends JpaRepository<Stock,Integer>{

    List<Stock> findByProductoIdProducto(Integer idProducto);

}
