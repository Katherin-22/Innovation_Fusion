USE innovation_fusion;

-- Total de consultas por sección: WHERE = 13, ORDER BY = 14, LIMIT = 12

-- ================================================================================================
-- CONSULTAS INTERMEDIAS CON WHERE, ORDER BY Y LIMIT

-- Este script contiene consultas SQL de nivel intermedio sobre la base de datos Innovation_Fusion.

-- Incluye sentencias que permiten:
--   - Filtrar datos mediante condiciones específicas con WHERE.
--   - Ordenar resultados de forma ascendente o descendente con ORDER BY.
--   - Limitar la cantidad de resultados devueltos usando LIMIT.

-- Estas consultas son útiles para obtener subconjuntos de información como:
--   - Usuarios según estado o dominio de correo.
--   - Productos en rangos de precio o en ciertas categorías.
--   - Inventarios con bajo stock.

-- Se enfocan en extraer información relevante aplicando filtros y criterios concretos.
-- ================================================================================================

-- =============================
-- SECCIÓN 1: CONSULTAS CON WHERE
-- =============================

-- Usuarios con rol administrador
SELECT nombreUsuario
FROM Usuario
WHERE idRol = 2;

-- Usuarios con correo @gmail.com
SELECT nombreUsuario, correoElectronico
FROM Usuario
WHERE correoElectronico LIKE '%@gmail.com';

-- Usuarios con nombres que contienen "Carlos"
SELECT nombreUsuario
FROM Usuario
WHERE nombreUsuario LIKE '%Carlos%';

-- Productos disponibles en categoría 3
SELECT nombreProducto, precio
FROM Producto
WHERE idCategoria = 3;

-- Productos con precio mayor a 100000
SELECT nombreProducto, precio
FROM Producto
WHERE precio > 100000;

-- Productos con precio entre 100000 y 200000
SELECT nombreProducto, precio
FROM Producto
WHERE precio BETWEEN 100000 AND 200000;

-- Productos de tipo bolso
SELECT nombreProducto
FROM Producto
WHERE idTipoProducto = 2;

-- Productos de tipo calzado
SELECT nombreProducto
FROM Producto
WHERE idTipoProducto = 1;

-- Productos que no son de categoría 1
SELECT nombreProducto
FROM Producto
WHERE idCategoria != 1;

-- Proveedores cuyo nombre contiene "moda"
SELECT nombreProveedor
FROM Proveedor
WHERE nombreProveedor LIKE '%moda%';

-- Pedidos con pagos superiores a 200000
SELECT idPago
FROM Pago
WHERE cantidad > 200000;

-- Carritos creados en 2025
SELECT fechaCreacion
FROM Carrito
WHERE fechaCreacion LIKE '2025%';

-- Carritos creados en enero
SELECT fechaCreacion
FROM Carrito
WHERE fechaCreacion LIKE '2025-01%';

-- =============================
-- SECCIÓN 2: CONSULTAS CON ORDER BY
-- =============================

-- Productos ordenados por precio ascendente
SELECT nombreProducto, precio
FROM Producto
ORDER BY precio ASC;

-- Productos ordenados por precio descendente
SELECT nombreProducto, precio
FROM Producto
ORDER BY precio DESC;

-- Productos ordenados por nombre A-Z
SELECT nombreProducto, precio
FROM Producto
ORDER BY nombreProducto ASC;

-- Productos ordenados por nombre Z-A
SELECT nombreProducto, precio
FROM Producto
ORDER BY nombreProducto DESC;

-- Productos ordenados por fecha de creación más reciente
SELECT nombreProducto, fechaCreacion
FROM Producto
ORDER BY fechaCreacion DESC;

-- Usuarios ordenados alfabéticamente
SELECT nombreUsuario, correoElectronico
FROM Usuario
ORDER BY nombreUsuario ASC;

-- Usuarios ordenados por rol
SELECT nombreUsuario, idRol
FROM Usuario
ORDER BY idRol ASC;

-- Usuarios por correo electrónico
SELECT nombreUsuario, correoElectronico
FROM Usuario
ORDER BY correoElectronico ASC;

-- Pedidos ordenados por fecha más reciente
SELECT fechaPedido, idUsuario
FROM Pedido
ORDER BY fechaPedido DESC;

-- Categorías por nombre
SELECT nombreCategoria
FROM Categoria
ORDER BY nombreCategoria ASC;

-- Carritos ordenados por fecha
SELECT idUsuario, fechaCreacion
FROM Carrito
ORDER BY fechaCreacion DESC;

-- Métodos de pago por nombre
SELECT nombreMetodoPago
FROM MetodoPago
ORDER BY nombreMetodoPago ASC;

-- Métodos de pago por ID descendente
SELECT nombreMetodoPago
FROM MetodoPago
ORDER BY idMetodoPago DESC;

-- Seguimiento de pedido por fecha más reciente
SELECT idPedido, fechaEstado
FROM SeguimientoPedido
ORDER BY fechaEstado DESC;

-- =============================
-- SECCIÓN 3: CONSULTAS CON LIMIT
-- =============================

-- Últimos 10 pedidos registrados
SELECT idPedido, idUsuario, fechaPedido
FROM Pedido
ORDER BY fechaPedido DESC
LIMIT 10;

-- Primeros 5 usuarios registrados (por ID)
SELECT idUsuario, nombreUsuario, correoElectronico
FROM Usuario
ORDER BY idUsuario ASC
LIMIT 5;

-- Productos más caros (Top 3)
SELECT idProducto, nombreProducto, precio, idCategoria
FROM Producto
ORDER BY precio DESC
LIMIT 3;

-- Últimas 5 promociones (por fecha de inicio más reciente)
SELECT idPromocion, codigo_Promocion, descuento, fecha_inicio, fecha_fin
FROM Promocion
ORDER BY fecha_inicio DESC
LIMIT 5;

-- Últimos 8 productos agregados (por ID)
SELECT idProducto, nombreProducto, fechaCreacion, precio
FROM Producto
ORDER BY idProducto DESC
LIMIT 8;

-- Primeras 5 categorías registradas
SELECT idCategoria, nombreCategoria
FROM Categoria
ORDER BY idCategoria ASC
LIMIT 5;

-- Últimos 6 carritos creados
SELECT idCarrito, idUsuario, fechaCreacion
FROM Carrito
ORDER BY fechaCreacion DESC
LIMIT 6;

-- Top 5 productos con precio más bajo
SELECT idProducto, nombreProducto, precio
FROM Producto
ORDER BY precio ASC
LIMIT 5;

-- Top 10 pedidos más antiguos
SELECT idPedido, idUsuario, fechaPedido
FROM Pedido
ORDER BY fechaPedido ASC
LIMIT 10;

-- 5 usuarios más recientes (por ID)
SELECT idUsuario, nombreUsuario
FROM Usuario
ORDER BY idUsuario DESC
LIMIT 5;

-- Primeros 3 proveedores registrados
SELECT idProveedor, nombreProveedor, contacto
FROM Proveedor
ORDER BY idProveedor ASC
LIMIT 3;

-- Últimos 10 seguimientos de pedido
SELECT idSeguimiento, idPedido, fechaEstado
FROM SeguimientoPedido
ORDER BY fechaEstado DESC
LIMIT 10;