package com.backend.proyect.repository.productos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.productos.Producto;

public interface ProductoRepository extends JpaRepository<Producto,Integer>{
    // Verifica si ya existe un producto con ese código de referencia
    boolean existsByCodigoReferencia(String codigoReferencia);

    // Opcional: obtener un producto por su código
    Optional<Producto> findByCodigoReferencia(String codigoReferencia);

    // Listar productos por estado (Activo/ Inactivo)
    List<Producto> findByEstadoProducto(Producto.EstadoProducto estado);
}
