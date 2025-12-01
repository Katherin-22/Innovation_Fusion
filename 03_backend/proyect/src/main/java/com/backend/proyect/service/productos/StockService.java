package com.backend.proyect.service.productos;

import com.backend.proyect.dto.productos.ColorProjection;
import com.backend.proyect.dto.productos.StockGeneralProjection;
import com.backend.proyect.dto.productos.VariacionProjection;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Stock;
import com.backend.proyect.repository.productos.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    /**
     * Verificar si hay stock disponible para un producto
     */
    public boolean hayStockDisponible(Integer idProducto, Integer cantidadRequerida) {
        List<Stock> stocks = stockRepository.findByProductoIdProducto(idProducto);
        int stockTotal = stocks.stream()
                .mapToInt(Stock::getStockActual)
                .sum();
        return stockTotal >= cantidadRequerida;
    }

    /**
     * Obtener stock total disponible para un producto
     */
    public int obtenerStockTotal(Integer idProducto) {
        List<Stock> stocks = stockRepository.findByProductoIdProducto(idProducto);
        return stocks.stream()
                .mapToInt(Stock::getStockActual)
                .sum();
    }

    /**
     * Reducir stock de un producto
     */
    public void reducirStock(Integer idProducto, Integer cantidad) {
        List<Stock> stocks = stockRepository.findByProductoIdProducto(idProducto);

        if (stocks.isEmpty()) {
            throw new ResourceNotFoundException("Stock para producto", idProducto);
        }

        int cantidadRestante = cantidad;

        // Reducir stock de los registros disponibles (FIFO)
        for (Stock stock : stocks) {
            if (cantidadRestante <= 0) break;

            int disponible = stock.getStockActual();
            if (disponible > 0) {
                int reducir = Math.min(disponible, cantidadRestante);
                stock.setStockActual(disponible - reducir);
                cantidadRestante -= reducir;
                stockRepository.save(stock);
            }
        }

        if (cantidadRestante > 0) {
            throw new IllegalStateException("Stock insuficiente para producto " + idProducto);
        }
    }

    /**
     * Aumentar stock de un producto (para devoluciones o reabastecimiento)
     */
    public void aumentarStock(Integer idProducto, Integer cantidad) {
        List<Stock> stocks = stockRepository.findByProductoIdProducto(idProducto);

        if (stocks.isEmpty()) {
            throw new ResourceNotFoundException("Stock para producto", idProducto);
        }

        // Aumentar en el primer registro de stock disponible
        Stock primerStock = stocks.get(0);
        primerStock.setStockActual(primerStock.getStockActual() + cantidad);
        stockRepository.save(primerStock);
    }

    /**
     * Verificar si un producto está por debajo del stock mínimo
     */
    public boolean estaBajoStockMinimo(Integer idProducto) {
        List<Stock> stocks = stockRepository.findByProductoIdProducto(idProducto);
        int stockTotal = stocks.stream()
                .mapToInt(Stock::getStockActual)
                .sum();

        int stockMinimoTotal = stocks.stream()
                .mapToInt(Stock::getStockMinimo)
                .sum();

        return stockTotal <= stockMinimoTotal;
    }

    /**
     * Obtener stock agrupado (método existente)
     */
    public List<StockGeneralProjection> obtenerStockAgrupado() {
        return stockRepository.obtenerStockAgrupado();
    }

    /**
     * Obtener colores disponibles para un producto
     */
    public List<ColorProjection> obtenerColoresDisponibles(Integer idProducto) {
        return stockRepository.findColoresByProducto(idProducto);
    }

    /**
     * Obtener variaciones disponibles para un producto y color
     */
    public List<VariacionProjection> obtenerVariacionesDisponibles(Integer idProducto, Integer idColor) {
        return stockRepository.findTallasByProductoAndColor(idProducto, idColor);
    }
}