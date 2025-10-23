package com.backend.proyect.service.productos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.productos.TipoProducto;
import com.backend.proyect.model.productos.Variacion;
import com.backend.proyect.repository.productos.ProductoRepository;
import com.backend.proyect.repository.productos.VariacionRepository;

@Service
public class GetStockService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private VariacionRepository variacionRepository;

    // Método para obtener las variaciones de un producto según su tipo
    public List<Variacion> listarVariacionesPorProducto(Integer idProducto) {
        // 1. Obtener producto
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // 2. Obtener tipo de producto desde la categoría
        TipoProducto tipoProducto = producto.getCategoria().getTipoProducto();

        // 3. Mapear tipo de producto a tipo de variación
        Variacion.Tipo tipoVariacion;
        if(tipoProducto.getNombreTipoProducto().equalsIgnoreCase("Bolso")) {
            tipoVariacion = Variacion.Tipo.Tamano_Bolso;
        } else if(tipoProducto.getNombreTipoProducto().equalsIgnoreCase("Calzado")) {
            tipoVariacion = Variacion.Tipo.Talla_Calzado;
        } else {
            throw new RuntimeException("Tipo de producto no soportado para variaciones");
        }

        // 4. Consultar y devolver variaciones
        return variacionRepository.findByTipo(tipoVariacion);
    }
}

