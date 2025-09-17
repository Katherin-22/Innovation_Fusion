package com.proyectosena.backend.repository.modulo_productos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proyectosena.backend.model.modulo_productos.Variacion;

public interface VariacionRepository extends JpaRepository<Variacion,Integer>{
    List<Variacion> findByTipo(Variacion.Tipo tipo);
}


