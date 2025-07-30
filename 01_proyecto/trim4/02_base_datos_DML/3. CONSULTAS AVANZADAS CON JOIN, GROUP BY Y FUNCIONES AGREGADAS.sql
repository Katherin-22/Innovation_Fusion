use innovation_fusion;

-- Total de consultas por sección: JOIN = 19, GROUP BY = 14, SUBCONSULTAS = 14


-- ================================================================================================
-- CONSULTAS AVANZADAS CON JOIN, GROUP BY Y FUNCIONES AGREGADAS

-- Este script contiene consultas SQL avanzadas diseñadas para extraer información combinando datos 
-- de múltiples tablas en la base de datos Innovation_Fusion.

-- Incluye:
--   - JOINs entre varias tablas para obtener relaciones entre usuarios, productos, pedidos, etc.
--   - Agrupaciones con GROUP BY para contar, promediar o sumar datos por categoría, usuario o estado.
--   - Funciones agregadas como COUNT(), SUM(), AVG(), MAX(), MIN().
--   - Alias para mejorar la legibilidad de los resultados.
--   - Subconsultas en SELECT o WHERE cuando es necesario.

-- Estas consultas permiten realizar análisis más complejos, como:
--   - Obtener la cantidad de productos por categoría.
--   - Ver el promedio de pagos por usuario.
--   - Mostrar pedidos con información detallada del usuario y estado.
--   - Consultar las colecciones activas con nombre de producto, creador y promoción.
-- ================================================================================================

-- =============================
-- SECCIÓN 1: CONSULTAS CON JOIN
-- =============================

-- Productos y su proveedor (si tiene)
SELECT pr.nombreProducto, prov.nombreProveedor
FROM Producto pr
LEFT JOIN Proveedor prov ON pr.idProveedor = prov.idProveedor;

-- Carrito con usuario que lo creó
SELECT c.idCarrito, u.nombreUsuario, c.fechaCreacion
FROM Carrito c
JOIN Usuario u ON c.idUsuario = u.idUsuario;

-- Productos con su categoría y tipo de producto
SELECT p.nombreProducto, c.nombreCategoria, tp.nombreTipoProducto
FROM Producto p
JOIN Categoria c ON p.idCategoria = c.idCategoria
JOIN TipoProducto tp ON p.idTipoProducto = tp.idTipoProducto;

-- Pedidos con carrito, usuario y método de pago
SELECT p.idPedido, u.nombreUsuario, c.fechaCreacion, mp.nombreMetodoPago
FROM Pedido p
JOIN Usuario u ON p.idUsuario = u.idUsuario
JOIN Carrito c ON p.idCarrito = c.idCarrito
JOIN MetodoPago mp ON p.idMetodoPago = mp.idMetodoPago;

select * from detallepedido;
select * from carrito;

-- Carritos con cantidad total de productos y nombre del usuario
SELECT c.idCarrito, u.nombreUsuario, SUM(dc.cantidad) AS total_productos
FROM Carrito c
JOIN DetalleCarrito dc ON c.idCarrito = dc.idCarrito
JOIN Usuario u ON c.idUsuario = u.idUsuario
GROUP BY c.idCarrito;

-- Devoluciones/cambios con nombre de usuario y estado
SELECT d.idDevolucionCambio, u.nombreUsuario, d.estado_solicitud, d.fecha_solicitud
FROM DevolucionCambio d
JOIN Usuario u ON d.idUsuario = u.idUsuario;

-- Productos incluidos en colecciones y su promoción
SELECT col.nombre AS nombreColeccion, p.nombreProducto, promo.codigo_Promocion
FROM Coleccion col
JOIN Producto p ON col.idProducto = p.idProducto
JOIN Promocion promo ON col.idPromocion = promo.idPromocion;

-- Métodos de pago utilizados en pedidos con nombre de usuario
SELECT mp.nombreMetodoPago, u.nombreUsuario, COUNT(*) AS cantidad_usos
FROM Pedido p
JOIN MetodoPago mp ON p.idMetodoPago = mp.idMetodoPago
JOIN Usuario u ON p.idUsuario = u.idUsuario
GROUP BY mp.nombreMetodoPago, u.nombreUsuario;

-- Promociones aplicadas en pedidos y usuarios que las usaron
SELECT DISTINCT promo.codigo_Promocion, u.nombreUsuario
FROM Pedido p
JOIN Promocion promo ON p.idPromocion = promo.idPromocion
JOIN Usuario u ON p.idUsuario = u.idUsuario;

-- Detalles de comprobantes con nombre de producto y valor total
SELECT dc.idComprobanteDeVenta, p.nombreProducto, dc.precio_unitario, dc.cantidad,
       (dc.precio_unitario * dc.cantidad) AS totalProducto
FROM DetallesComprobanteDeVenta dc
JOIN Producto p ON dc.idProducto = p.idProducto;

-- Usuarios con rol asignado
SELECT u.nombreUsuario, r.nombreRol
FROM Usuario u
JOIN Rol r ON u.idRol = r.idRol;

-- Tipos de documento usados por usuarios
SELECT u.nombreUsuario, td.nombreTipoDeDocumento
FROM Usuario u
JOIN tipoDocumento td ON u.idtipoDocumento = td.idtipoDocumento;

-- Seguimiento de pedidos con nombre de usuario y estado actual
SELECT sp.idSeguimiento, u.nombreUsuario, ep.nombreEstado, sp.fechaEstado
FROM SeguimientoPedido sp
JOIN Pedido p ON sp.idPedido = p.idPedido
JOIN Usuario u ON p.idUsuario = u.idUsuario
JOIN EstadoPedido ep ON sp.idEstadoPedido = ep.idEstadoPedido;

-- Comprobantes de venta con nombre del usuario
SELECT cv.idComprobanteDeVenta, u.nombreUsuario, cv.fechaEmision
FROM ComprobanteDeVenta cv
JOIN Usuario u ON cv.idUsuario = u.idUsuario;

-- Cantidad de productos vendidos por pedido
SELECT dp.idPedido, COUNT(dp.idDetallePedido) AS cantidad_productos
FROM DetallePedido dp
GROUP BY dp.idPedido;

-- Total de pedidos hechos por cada usuario
SELECT u.nombreUsuario, COUNT(p.idPedido) AS total_pedidos
FROM Usuario u
JOIN Pedido p ON u.idUsuario = p.idUsuario
GROUP BY u.idUsuario;

-- Total recaudado por cada pedido
SELECT p.idPedido, SUM(dp.cantidad * dp.precioUnitario) AS total_pedido
FROM DetallePedido dp
JOIN Pedido p ON dp.idPedido = p.idPedido
GROUP BY p.idPedido;

-- Comprobantes de venta con total por comprobante
SELECT cv.idComprobanteDeVenta, SUM(dcv.precio_unitario * dcv.cantidad) AS total_venta
FROM ComprobanteDeVenta cv
JOIN DetallesComprobanteDeVenta dcv ON cv.idComprobanteDeVenta = dcv.idComprobanteDeVenta
GROUP BY cv.idComprobanteDeVenta;


-- =============================
-- SECCIÓN 2: CONSULTAS CON GROUP BY Y FUNCIONES DE AGREGADO
-- =============================

-- Cantidad de productos por categoría
SELECT c.nombreCategoria AS categoria, COUNT(p.idProducto) AS total_productos
FROM Categoria c
JOIN Producto p ON p.idCategoria = c.idCategoria
GROUP BY c.nombreCategoria;

-- Total de productos por tipo de producto
SELECT tp.nombreTipoProducto, COUNT(p.idProducto) AS cantidad
FROM TipoProducto tp
JOIN Producto p ON p.idTipoProducto = tp.idTipoProducto
GROUP BY tp.nombreTipoProducto;

-- Total de pedidos por usuario
SELECT u.nombreUsuario, COUNT(p.idPedido) AS total_pedidos
FROM Usuario u
JOIN Pedido p ON u.idUsuario = p.idUsuario
GROUP BY u.nombreUsuario;

-- Promedio de precio de los productos por categoría
SELECT c.nombreCategoria, AVG(p.precio) AS precio_promedio
FROM Categoria c
JOIN Producto p ON p.idCategoria = c.idCategoria
GROUP BY c.nombreCategoria;

-- Promedio de cantidad de productos por carrito
SELECT c.idCarrito, AVG(dc.cantidad) AS promedio_cantidad
FROM Carrito c
JOIN DetalleCarrito dc ON c.idCarrito = dc.idCarrito
GROUP BY c.idCarrito;

-- Total de devoluciones por estado de solicitud
SELECT estado_solicitud, COUNT(*) AS total_devoluciones
FROM DevolucionCambio
GROUP BY estado_solicitud;

-- Total de productos por categoría
SELECT sc.nombreCategoria, COUNT(p.idProducto) AS total
FROM Categoria sc
JOIN Producto p ON p.idCategoria = sc.idCategoria
GROUP BY sc.nombreCategoria;

-- Total de usuarios por rol
SELECT r.nombreRol, COUNT(u.idUsuario) AS cantidad_usuarios
FROM Rol r
JOIN Usuario u ON u.idRol = r.idRol
GROUP BY r.nombreRol;

-- Total de usuarios por tipo de documento
SELECT td.nombreTipoDeDocumento, COUNT(u.idUsuario) AS total_usuarios
FROM tipoDocumento td
JOIN Usuario u ON u.idtipoDocumento = td.idtipoDocumento
GROUP BY td.nombreTipoDeDocumento;

-- Cantidad de promociones por mes de inicio
SELECT MONTH(fecha_inicio) AS mes, COUNT(*) AS total_promociones
FROM Promocion
GROUP BY MONTH(fecha_inicio);

-- Total de carritos por usuario
SELECT u.nombreUsuario, COUNT(c.idCarrito) AS total_carritos
FROM Usuario u
JOIN Carrito c ON u.idUsuario = c.idUsuario
GROUP BY u.nombreUsuario;

-- Total de promociones usadas en pedidos
SELECT promo.codigo_Promocion, COUNT(p.idPedido) AS total_usos
FROM Promocion promo
JOIN Pedido p ON p.idPromocion = promo.idPromocion
GROUP BY promo.codigo_Promocion;

-- Total de devoluciones por mes
SELECT MONTH(fecha_solicitud) AS mes, COUNT(*) AS total_devoluciones
FROM DevolucionCambio
GROUP BY MONTH(fecha_solicitud);

-- =============================
-- SECCIÓN 3: CONSULTAS AVANZADAS CON SUBCONSULTAS
-- =============================

-- Usuarios que han realizado al menos un pedido
SELECT nombreUsuario
FROM Usuario
WHERE idUsuario IN (
  SELECT DISTINCT idUsuario
  FROM Pedido
);

-- Productos con precio superior al promedio general
SELECT nombreProducto, precio
FROM Producto
WHERE precio > (
  SELECT AVG(precio)
  FROM Producto
);

-- Usuarios que han comprado productos con promociones
SELECT DISTINCT u.nombreUsuario
FROM Usuario u
WHERE u.idUsuario IN (
  SELECT DISTINCT pe.idUsuario
  FROM Pedido pe
  WHERE pe.idPromocion IS NOT NULL
);

-- Productos de la categoría con mayor cantidad de productos
SELECT nombreProducto
FROM Producto
WHERE idCategoria = (
  SELECT idCategoria
  FROM (
    SELECT idCategoria, COUNT(*) AS total
    FROM Producto
    GROUP BY idCategoria
    ORDER BY total DESC
    LIMIT 1
  ) AS sub
);

-- Promociones con duración mayor al promedio
SELECT codigo_Promocion, DATEDIFF(fecha_fin, fecha_inicio) AS duracion_dias
FROM Promocion
WHERE DATEDIFF(fecha_fin, fecha_inicio) > (
  SELECT AVG(DATEDIFF(fecha_fin, fecha_inicio))
  FROM Promocion
);

-- Carritos con más productos que el promedio
SELECT c.idCarrito, SUM(dc.cantidad) AS total_productos
FROM Carrito c
JOIN DetalleCarrito dc ON c.idCarrito = dc.idCarrito
GROUP BY c.idCarrito
HAVING SUM(dc.cantidad) > (
  SELECT AVG(sub.total)
  FROM (
    SELECT SUM(cantidad) AS total
    FROM DetalleCarrito
    GROUP BY idCarrito
  ) AS sub
);

-- Productos en colecciones
SELECT p.nombreProducto
FROM Producto p
WHERE p.idProducto IN (
  SELECT idProducto
  FROM Coleccion
);

-- Usuarios que no han creado ningún carrito
SELECT nombreUsuario
FROM Usuario
WHERE idUsuario NOT IN (
  SELECT DISTINCT idUsuario
  FROM Carrito
);

-- Categorías con precio promedio superior a 150000
SELECT c.nombreCategoria
FROM Categoria c
JOIN Producto p ON c.idCategoria = p.idCategoria
GROUP BY c.idCategoria
HAVING AVG(p.precio) > 150000;

-- Productos comprados en más de 3 pedidos distintos
SELECT p.nombreProducto
FROM Producto p
JOIN DetallePedido dp ON p.idProducto = p.idProducto
GROUP BY p.idProducto
HAVING COUNT(DISTINCT dp.idPedido) > 3;

-- Productos con precio mínimo dentro de su categoría
SELECT p.nombreProducto, p.precio
FROM Producto p
WHERE precio = (
  SELECT MIN(p2.precio)
  FROM Producto p2
  WHERE p2.idCategoria = p.idCategoria
);

-- Usuarios cuyo primer pedido se hizo en 2025
SELECT nombreUsuario
FROM Usuario
WHERE idUsuario IN (
  SELECT idUsuario
  FROM Pedido
  GROUP BY idUsuario
  HAVING MIN(fechaPedido) LIKE '2025%'
);

-- Promociones que terminaron antes del promedio de duración
SELECT codigo_Promocion, fecha_fin
FROM Promocion
WHERE fecha_fin < (
  SELECT ADDDATE(MIN(fecha_inicio), INTERVAL AVG(DATEDIFF(fecha_fin, fecha_inicio)) DAY)
  FROM Promocion
);

-- Productos que han sido devueltos al menos una vez
SELECT DISTINCT p.nombreProducto
FROM Producto p
JOIN DetallesComprobanteDeVenta dc ON p.idProducto = dc.idProducto
JOIN ComprobanteDeVenta cv ON dc.idComprobanteDeVenta = cv.idComprobanteDeVenta
JOIN DevolucionCambio d ON d.idUsuario = cv.idUsuario;
