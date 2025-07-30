USE innovation_fusion;


-- Total de consultas: 22

-- ================================================================================================
-- CONSULTAS BÁSICAS PARA VISUALIZAR TODOS LOS REGISTROS DE CADA TABLA

-- Este script contiene consultas SQL básicas diseñadas para mostrar todos los registros existentes
-- en cada una de las tablas de la base de datos Innovation_Fusion.

-- Permite:
--   - Verificar que los datos se hayan insertado correctamente.
--   - Explorar la estructura general de los datos.
--   - Realizar revisiones iniciales de contenido en etapas de desarrollo o prueba.

-- Todas las consultas utilizan SELECT * FROM <tabla>; para retornar el contenido completo.
-- ================================================================================================


-- Tabla: usuario
	SELECT * 
	FROM usuario;

-- Tabla: telefono
	SELECT * 
	FROM telefono;

-- Tabla: rol
	SELECT * 
	FROM rol;

-- Tabla: producto
	SELECT * 
	FROM producto;
    
-- Tabla: categoria
	SELECT * 
	FROM categoria;

-- Tabla: coleccion
	SELECT * 
	FROM coleccion;

-- Tabla: tipoproducto
	SELECT * 
	FROM tipoproducto;

-- Tabla: inventario
	SELECT * 
	FROM stock;

-- Tabla: promocion
	SELECT * 
	FROM promocion;

-- Tabla: carrito
	SELECT * 
	FROM carrito;

-- Tabla: detallecarrito
	SELECT * 
	FROM detallecarrito;

-- Tabla: pedido
	SELECT * 
	FROM pedido;

-- Tabla: detallepedido
	SELECT * 
	FROM detallepedido;

-- Tabla: comprobantedeventa
	SELECT * 
	FROM comprobantedeventa;

-- Tabla: detallescomprobantedeventa
	SELECT * 
	FROM detallescomprobantedeventa;

-- Tabla: devolucioncambio
	SELECT * 
	FROM devolucioncambio;

-- Tabla: estadopedido
	SELECT * 
	FROM estadopedido;

-- Tabla: seguimientopedido
	SELECT * 
	FROM seguimientopedido;

-- Tabla: metodopago
	SELECT * 
	FROM metodopago;

-- Tabla: proveedor
	SELECT * 
	FROM proveedor;

