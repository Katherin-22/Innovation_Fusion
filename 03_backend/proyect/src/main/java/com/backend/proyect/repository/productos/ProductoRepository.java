package com.backend.proyect.repository.productos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.productos.Producto;

public interface ProductoRepository extends JpaRepository<Producto,Integer>{
    // Verifica si ya existe un producto con ese código de referencia
    boolean existsByCodigoReferencia(String codigoReferencia);

    //Verifica si existe otro producto con el mismo código de referencia al actualizar
    boolean existsByCodigoReferenciaAndIdProductoNot (String codigoReferencia, Integer IdProducto);

    // Opcional: obtener un producto por su código
    Optional<Producto> findByCodigoReferencia(String codigoReferencia);

    // Listar productos por estado (Activo/ Inactivo)
    List<Producto> findByEstadoProducto(Producto.EstadoProducto estado);
}
