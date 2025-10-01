package com.proyectosena.backend.service.modulo_productos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectosena.backend.model.modulo_productos.Producto;
import com.proyectosena.backend.model.modulo_productos.Variacion;
import com.proyectosena.backend.repository.modulo_productos.ProductoRepository;
import com.proyectosena.backend.repository.modulo_productos.VariacionRepository;

@Service
public class PostStockService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private VariacionRepository variacionRepository;
    
public Variacion validarVariacionProducto(Integer idProducto, Integer idVariacion) {
    // 1. Obtener producto
    Producto producto = productoRepository.findById(idProducto)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    // 2. Obtener tipo de producto
    String tipoProducto = producto.getCategoria().getTipoProducto().getNombreTipoProducto();

    // 3. Obtener variación seleccionada
    Variacion variacion = variacionRepository.findById(idVariacion)
        .orElseThrow(() -> new RuntimeException("Variación no encontrada"));

    // 4. Validar compatibilidad
    if(tipoProducto.equalsIgnoreCase("Bolso") && variacion.getTipo() != Variacion.Tipo.Tamano_Bolso) {
        throw new RuntimeException("La variación no corresponde a un bolso");
    }
    if(tipoProducto.equalsIgnoreCase("Calzado") && variacion.getTipo() != Variacion.Tipo.Talla_Calzado) {
        throw new RuntimeException("La variación no corresponde a un calzado");
    }

    return variacion;
}


}


