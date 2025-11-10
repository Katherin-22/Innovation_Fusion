package com.backend.proyect.repository.productos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.proyect.dto.productos.StockGeneralProjection;
import com.backend.proyect.model.productos.Stock;

public interface StockRepository extends JpaRepository<Stock,Integer>{

    List<Stock> findByProductoIdProducto(Integer idProducto);

    @Query(value = """
    SELECT 
        p.idProducto,
        ANY_VALUE(p.codigoReferencia) AS codigoReferencia,
        ANY_VALUE(p.nombreProducto) AS nombreProducto,
        ANY_VALUE(tp.nombreTipoProducto) AS nombreTipoProducto, 
        ANY_VALUE(p.precio) AS precio,
        GROUP_CONCAT(DISTINCT v.nombre SEPARATOR ', ') AS nombre,
        GROUP_CONCAT(DISTINCT c.nombreColor SEPARATOR ', ') AS nombreColor,
        SUM(s.stockActual) AS stockActual,
        ANY_VALUE(p.estadoProducto) AS estadoProducto
    FROM Stock s
    JOIN Producto p ON s.idProducto = p.idProducto
    JOIN Categoria cat ON p.idCategoria = cat.idCategoria
    JOIN TipoProducto tp ON cat.idTipoProducto = tp.idTipoProducto
    LEFT JOIN Variacion v ON v.idVariacion = s.idVariacion
    LEFT JOIN Color c ON c.idColor = s.idColor
    GROUP BY p.idProducto
    ORDER BY p.nombreProducto ASC;
    """, nativeQuery = true)
    List<StockGeneralProjection> obtenerStockAgrupado();


}
