package com.backend.proyect.repository.productos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.proyect.model.productos.Variacion;

public interface VariacionRepository extends JpaRepository<Variacion,Integer>{
    List<Variacion> findByTipo(Variacion.Tipo tipo);
}


