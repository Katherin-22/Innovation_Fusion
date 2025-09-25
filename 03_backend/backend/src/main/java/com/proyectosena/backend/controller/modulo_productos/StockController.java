package com.proyectosena.backend.controller.modulo_productos;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyectosena.backend.DTO.modulo_productos.StockDTO;
import com.proyectosena.backend.exception.modulo_productos.ResourceNotFoundException;
import com.proyectosena.backend.model.modulo_productos.Color;
import com.proyectosena.backend.model.modulo_productos.Producto;
import com.proyectosena.backend.model.modulo_productos.Stock;
import com.proyectosena.backend.model.modulo_productos.Variacion;
import com.proyectosena.backend.repository.modulo_productos.ColorRepository;
import com.proyectosena.backend.repository.modulo_productos.ProductoRepository;
import com.proyectosena.backend.repository.modulo_productos.StockRepository;
import com.proyectosena.backend.repository.modulo_productos.VariacionRepository;
import com.proyectosena.backend.service.modulo_productos.GetStockService;
import com.proyectosena.backend.service.modulo_productos.PostStockService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class StockController {
@Autowired
private GetStockService getStockService;
@Autowired
private PostStockService postStockService;
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

        
        // Validar variación según el tipo de producto
        Variacion variacion = postStockService.validarVariacionProducto(
            stockDTO.getIdProducto(),
            stockDTO.getIdVariacion()
        );


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
    List<Variacion> obtenerVariacionesPorProducto(@PathVariable Integer idProducto) {
        return getStockService.listarVariacionesPorProducto(idProducto);
    }


    @GetMapping("/stocks")
    List<StockDTO> getAllStock() {
    // Traes todos los stocks de la base de datos
    List<Stock> stocks = stockRepository.findAll();

    // Los conviertes a DTO con stream
    return stocks.stream()
            .map(stock -> {
                StockDTO stockDTO = new StockDTO();
                stockDTO.setCodigoReferencia(stock.getProducto().getCodigoReferencia());
                stockDTO.setNombreProducto(stock.getProducto().getNombreProducto());
                stockDTO.setNombreTipoProducto(stock.getProducto().getCategoria().getTipoProducto().getNombreTipoProducto());
                stockDTO.setNombreCategoria(stock.getProducto().getCategoria().getNombreCategoria());
                stockDTO.setDescripcion(stock.getProducto().getDescripcion());
                stockDTO.setStockActual(stock.getStockActual());
                stockDTO.setPrecio(stock.getProducto().getPrecio());
                stockDTO.setNombreMarca(stock.getProducto().getMarca().getNombreMarca());
                stockDTO.setNombre(stock.getVariacion().getNombre());
                stockDTO.setNombreTipoProducto(stock.getProducto().getCategoria().getTipoProducto().getNombreTipoProducto());
                stockDTO.setFechaCreacion(stock.getProducto().getFechaCreacion());
                stockDTO.setNombreColor(stock.getColor().getNombreColor());
                stockDTO.setNombreMaterial(stock.getProducto().getMaterial().getNombreMaterial());
                stockDTO.setNombrePublico(stock.getProducto().getTipoPublico().getNombrePublico());
            
                return stockDTO;
            })
            .toList();
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
