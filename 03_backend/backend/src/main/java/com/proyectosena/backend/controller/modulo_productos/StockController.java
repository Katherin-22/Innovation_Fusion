package com.proyectosena.backend.controller.modulo_productos;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyectosena.backend.exception.modulo_productos.ResourceNotFoundException;
import com.proyectosena.backend.model.modulo_productos.Color;
import com.proyectosena.backend.model.modulo_productos.Producto;
import com.proyectosena.backend.model.modulo_productos.Stock;
import com.proyectosena.backend.model.modulo_productos.StockDTO;
import com.proyectosena.backend.model.modulo_productos.Variacion;
import com.proyectosena.backend.repository.modulo_productos.ColorRepository;
import com.proyectosena.backend.repository.modulo_productos.ProductoRepository;
import com.proyectosena.backend.repository.modulo_productos.StockRepository;
import com.proyectosena.backend.repository.modulo_productos.VariacionRepository;
import com.proyectosena.backend.service.modulo_productos.StockService;

@RestController

public class StockController {
@Autowired
private StockService stockService;
@Autowired
private StockRepository stockRepository;
@Autowired 
private ColorRepository colorRepository;
@Autowired
private VariacionRepository variacionRepository;
@Autowired
private ProductoRepository productoRepository;

    @PostMapping("/stock")
    Stock newStock(@RequestBody StockDTO stockDTO) {
        Color color = colorRepository.findById(stockDTO.getIdColor())
                .orElseThrow(() -> new ResourceNotFoundException("Color", stockDTO.getIdColor()));

        Variacion variacion = variacionRepository.findById(stockDTO.getIdVariacion())
                .orElseThrow(() -> new ResourceNotFoundException("Variacion", stockDTO.getIdVariacion()));

        Producto producto = productoRepository.findById(stockDTO.getIdProducto())
                .orElseThrow(() -> new ResourceNotFoundException("Producto", stockDTO.getIdProducto()));

        Stock stock = new Stock();
        stock.setStockMinimo(stockDTO.getStockMinimo());
        stock.setStockActual(stockDTO.getStockActual());
        stock.setFechaModificacion(LocalDate.now());
        stock.setColor(color);
        stock.setVariacion(variacion);
        stock.setProducto(producto);

        return stockRepository.save(stock);
    }


    @GetMapping("/stock/variaciones/{idProducto}")
    public List<Variacion> obtenerVariacionesPorProducto(Integer idProducto) {
        Producto producto = productoRepository.findById(idProducto)
            .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));

        String nombreTipo = producto.getCategoria().getTipoProducto().getNombreTipoProducto();

        Variacion.Tipo tipoEnum = nombreTipo.equalsIgnoreCase("Calzado") 
            ? Variacion.Tipo.Talla_Calzado 
            : Variacion.Tipo.Tamano_Bolso;

        return variacionRepository.findByTipo(tipoEnum);
    }

    @GetMapping("/stocks")
    List<Stock> getAllStock(){
        return stockRepository.findAll();
    }

    @GetMapping("/stock/{idStock}")
    Stock getOneStock(@PathVariable Integer idStock) {
        return stockRepository.findById(idStock)
                .orElseThrow(() -> new ResourceNotFoundException("Stock", idStock));
    }

    @PutMapping("/stock/{idStock}")
    Stock updateStock (@RequestBody StockDTO updateStockDTO, @PathVariable Integer idStock){
        return stockRepository.findById(idStock)
            .map(stock ->{
            // Buscar las entidades relacionadas por ID
            Color color = colorRepository.findById(updateStockDTO.getIdColor())
                .orElseThrow(() -> new ResourceNotFoundException("Color", updateStockDTO.getIdColor()));

            Variacion variacion = variacionRepository.findById(updateStockDTO.getIdVariacion())
                .orElseThrow(() -> new ResourceNotFoundException("Variacion", updateStockDTO.getIdVariacion()));

            Producto producto = productoRepository.findById(updateStockDTO.getIdProducto())
                .orElseThrow(() -> new ResourceNotFoundException("Producto", updateStockDTO.getIdProducto()));

        stock.setStockMinimo(updateStockDTO.getStockMinimo());
        stock.setStockActual(updateStockDTO.getStockActual());
        stock.setFechaModificacion(LocalDate.now());
        stock.setColor(color);
        stock.setVariacion(variacion);
        stock.setProducto(producto);

        return stockRepository.save(stock);
        }).orElseThrow(()->new ResourceNotFoundException("Stock",idStock));
    }

    @DeleteMapping("/stock/{idStock}")
    String  deleteStock (@PathVariable Integer idStock){
        if(!stockRepository.existsById(idStock)){
            throw new ResourceNotFoundException("Stock",idStock);
        }
        stockRepository.deleteById(idStock);
        return "El Stock con id " + idStock + " ha sido eliminado correctamente";
    }
}
