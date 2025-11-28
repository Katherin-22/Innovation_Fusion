package com.backend.proyect.repository.productos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.proyect.dto.productos.ColorProjection;
import com.backend.proyect.dto.productos.StockGeneralProjection;
import com.backend.proyect.dto.productos.VariacionProjection;
import com.backend.proyect.model.productos.Stock;

public interface StockRepository extends JpaRepository<Stock,Integer>{

    List<Stock> findByProductoIdProducto(Integer idProducto);

    @Query(value = """
    SELECT 
        p.idProducto,
        ANY_VALUE(p.codigoReferencia) AS codigoReferencia,
        ANY_VALUE(p.nombreProducto) AS nombreProducto,
        ANY_VALUE(p.descripcion) AS descripcion,
        ANY_VALUE(tp.nombreTipoProducto) AS nombreTipoProducto, 
        ANY_VALUE(tpb.nombrePublico) AS nombrePublico, 
        ANY_VALUE(cat.nombreCategoria) AS nombreCategoria, 
        ANY_VALUE(mat.nombreMaterial) AS nombreMaterial, 
        ANY_VALUE(p.precio) AS precio,
        GROUP_CONCAT(DISTINCT v.nombre SEPARATOR ', ') AS nombre,
        GROUP_CONCAT(DISTINCT c.nombreColor SEPARATOR ', ') AS nombreColor,
        SUM(s.stockActual) AS stockActual,
        ANY_VALUE(p.estadoProducto) AS estadoProducto
    FROM Stock s
    JOIN Producto p ON s.idProducto = p.idProducto
    JOIN Categoria cat ON p.idCategoria = cat.idCategoria
    JOIN TipoProducto tp ON cat.idTipoProducto = tp.idTipoProducto
    JOIN Material mat ON p.idMaterial = mat.idMaterial
    JOIN TipoPublico tpb ON p.idPublico = tpb.idPublico
    LEFT JOIN Variacion v ON v.idVariacion = s.idVariacion
    LEFT JOIN Color c ON c.idColor = s.idColor
    GROUP BY p.idProducto
    ORDER BY p.nombreProducto ASC;
    """, nativeQuery = true)
    List<StockGeneralProjection> obtenerStockAgrupado();

@Query(value = """
    SELECT DISTINCT c.idColor, c.nombreColor 
    FROM Stock s
    LEFT JOIN Color c ON c.idColor = s.idColor
    WHERE s.idProducto = ?1 AND s.stockActual > 0
    ORDER BY c.nombreColor
""", nativeQuery = true)
List<ColorProjection> findColoresByProducto(Integer idProducto);

@Query(value = """
        SELECT v.idVariacion, v.nombre, s.stockActual
        FROM Stock s
        LEFT JOIN Variacion v ON v.idVariacion = s.idVariacion
        WHERE s.idProducto = ?1 
        AND s.idColor = ?2 
        AND s.stockActual > 0
        ORDER BY v.nombre
""", nativeQuery = true)
List<VariacionProjection> findTallasByProductoAndColor(Integer idProducto, Integer idColor);
}
