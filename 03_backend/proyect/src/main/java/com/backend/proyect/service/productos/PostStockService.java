package com.backend.proyect.service.productos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.productos.Variacion;
import com.backend.proyect.repository.productos.ProductoRepository;
import com.backend.proyect.repository.productos.VariacionRepository;

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


