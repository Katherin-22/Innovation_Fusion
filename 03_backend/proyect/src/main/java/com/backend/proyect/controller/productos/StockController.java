package com.backend.proyect.controller.productos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.proyect.dto.productos.ColorProjection;
import com.backend.proyect.dto.productos.StockDTO;
import com.backend.proyect.dto.productos.StockGeneralProjection;
import com.backend.proyect.dto.productos.VariacionProjection;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Color;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.productos.Stock;
import com.backend.proyect.model.productos.Variacion;
import com.backend.proyect.repository.productos.ColorRepository;
import com.backend.proyect.repository.productos.ProductoRepository;
import com.backend.proyect.repository.productos.StockRepository;
import com.backend.proyect.repository.productos.VariacionRepository;
import com.backend.proyect.service.productos.GetStockService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController

public class StockController {

    @Autowired
    private GetStockService getStockService;
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private VariacionRepository variacionRepository;
    @Autowired
    private ProductoRepository productoRepository;

    //@PreAuthorize("hasAuthority('administrador')")
    @PostMapping("/stock/{idProducto}")
    ResponseEntity<Stock> newStock(@RequestBody StockDTO stockDTO, @PathVariable Integer idProducto) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));

        Stock stock = new Stock();
        stock.setStockMinimo(stockDTO.getStockMinimo());
        stock.setStockActual(stockDTO.getStockActual());
        stock.setProducto(producto);

        // Color opcional
        if (stockDTO.getIdColor() != null) {
            Color color = colorRepository.findById(stockDTO.getIdColor())
                    .orElseThrow(() -> new ResourceNotFoundException("Color", stockDTO.getIdColor()));
            stock.setColor(color);
        } else {
            stock.setColor(null);
        }

        // Variación opcional
        if (stockDTO.getIdVariacion() != null) {
            Variacion variacion = variacionRepository.findById(stockDTO.getIdVariacion())
                    .orElseThrow(() -> new ResourceNotFoundException("Variacion", stockDTO.getIdVariacion()));
            stock.setVariacion(variacion);
        } else {
            stock.setVariacion(null);
        }

        Stock saved = stockRepository.save(stock);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // 201 Created
    }

    @GetMapping("/publico/stock/variaciones/{idProducto}")
    List<Variacion> obtenerVariacionesPorProducto(@PathVariable Integer idProducto) {
        return getStockService.listarVariacionesPorProducto(idProducto);
    }

    @GetMapping("/publico/stocks")
    public ResponseEntity<List<StockGeneralProjection>> getAllStock() {
        List<StockGeneralProjection> listaStock = stockRepository.obtenerStockAgrupado();
        return ResponseEntity.ok(listaStock);
    }

    @GetMapping("/publico/stock/producto/{idProducto}")
    ResponseEntity<List<StockDTO>> getStockByProducto(@PathVariable Integer idProducto) {
        List<StockDTO> IdStockProducto = stockRepository.findByProductoIdProducto(idProducto).stream().map(stock -> {
            StockDTO dto = new StockDTO();
            dto.setIdStock(stock.getIdStock());  // <- importante, para eliminar
            dto.setIdProducto(stock.getProducto().getIdProducto()); // <- importante, para ir al stock por idProducto
            dto.setNombreProducto(stock.getProducto().getNombreProducto());
            dto.setStockMinimo(stock.getStockMinimo());
            dto.setStockActual(stock.getStockActual());

            //esto permite que este null no de error
            dto.setNombre(
                    stock.getVariacion() != null ? stock.getVariacion().getNombre() : "Sin variación"
            );
            dto.setNombreColor(
                    stock.getColor() != null ? stock.getColor().getNombreColor() : "Sin color"
            );
            return dto;
        }).toList();
        return ResponseEntity.ok(IdStockProducto);
    }

    //busca los colores disponibles para un producto
    @GetMapping("/publico/stock/producto/{idProducto}/color")
    public ResponseEntity<List<ColorProjection>> getColorsUser (@PathVariable Integer idProducto) {
        List<ColorProjection> colores = stockRepository.findColoresByProducto(idProducto);
        return ResponseEntity.ok(colores);
    }

    //busca las tallas disponibles para un producto segun el color
    @GetMapping("/publico/stock/producto/{idProducto}/color/{idColor}/tallas")
    public ResponseEntity<List<VariacionProjection>> getTallasUser(@PathVariable Integer idProducto, @PathVariable Integer idColor) {
        List<VariacionProjection> tallas = stockRepository.findTallasByProductoAndColor(idProducto, idColor);
        return ResponseEntity.ok(tallas);
    }

    @GetMapping("/publico/stock/{idStock}")
    ResponseEntity<Stock> getOneStock(@PathVariable Integer idStock) {
        Stock stock = stockRepository.findById(idStock)
                .orElseThrow(() -> new ResourceNotFoundException("Stock", idStock));
        return ResponseEntity.ok(stock); // 200 OK
    }

    //@PreAuthorize("hasAuthority('administrador')")
    @PutMapping("/producto/{idProducto}/stock/{idStock}")
    ResponseEntity<Stock> updateStock(@RequestBody StockDTO updateStockDTO, @PathVariable Integer idProducto, @PathVariable Integer idStock) {
        return stockRepository.findById(idStock)
            .map(stock -> {
                // Buscar las entidades relacionadas por ID
                Producto producto = productoRepository.findById(idProducto)
                        .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));

                // Color opcional
                if (updateStockDTO.getIdColor() != null) {
                    Color color = colorRepository.findById(updateStockDTO.getIdColor())
                            .orElseThrow(() -> new ResourceNotFoundException("Color", updateStockDTO.getIdColor()));
                    stock.setColor(color);
                } else {
                    stock.setColor(null);
                }

                // Variación opcional
                if (updateStockDTO.getIdVariacion() != null) {
                    Variacion variacion = variacionRepository.findById(updateStockDTO.getIdVariacion())
                            .orElseThrow(() -> new ResourceNotFoundException("Variacion", updateStockDTO.getIdVariacion()));
                    stock.setVariacion(variacion);
                } else {
                    stock.setVariacion(null);
                }

                stock.setStockMinimo(updateStockDTO.getStockMinimo());
                stock.setStockActual(updateStockDTO.getStockActual());
                stock.setProducto(producto);

                Stock actualizado = stockRepository.save(stock);
                return ResponseEntity.ok(actualizado); // 200 OK
            }).orElseThrow(() -> new ResourceNotFoundException("Stock", idStock));
    }

    //@PreAuthorize("hasAuthority('administrador')")
    @DeleteMapping("/stock/{idStock}")
    ResponseEntity<Void> deleteStock(@PathVariable Integer idStock) {
        if (!stockRepository.existsById(idStock)) {
            throw new ResourceNotFoundException("Stock", idStock);
        }
        stockRepository.deleteById(idStock);
        return ResponseEntity.noContent().build();// 204 No Content
    }
}
