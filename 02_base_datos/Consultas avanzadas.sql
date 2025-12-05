								-- cosultas avanzadas:
-- -----------------------------------------------------
-- Disparadores
-- -----------------------------------------------------
-- trigger para que cuando se cree un producto, se guarde en un stoc vacio
DELIMITER $$

CREATE TRIGGER trg_producto_after_insert
AFTER INSERT ON Producto
FOR EACH ROW
BEGIN
    INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto)
    VALUES (0, 0, Null, Null, NEW.idProducto);
END$$

DELIMITER ;

-- consulta para agrupar el stok segun el idProducto

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

select * from usuario;
select * from rol;



