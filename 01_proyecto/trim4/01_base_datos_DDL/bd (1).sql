USE innovation_fusion_db;

-- Requiere que ya exista TipoProducto con ID = 1
INSERT INTO TipoProducto (idTipoProducto, nombreTipoProducto)
VALUES (1, 'Tipo Genérico')
ON DUPLICATE KEY UPDATE nombreTipoProducto = nombreTipoProducto;

-- CATEGORÍA
INSERT INTO Categoria (idCategoria, nombreCategoria, TipoProducto_idTipoProducto)
VALUES (1, 'Categoría Default', 1)
ON DUPLICATE KEY UPDATE nombreCategoria = nombreCategoria;

-- PROVEEDOR
INSERT INTO Proveedor (idProveedor, nombreProveedor, contacto)
VALUES (1, 'Proveedor Default', 'Sin contacto')
ON DUPLICATE KEY UPDATE nombreProveedor = nombreProveedor;

-- PROMOCIÓN
INSERT INTO Promocion (idPromocion, codigo_Promocion, descuento, fecha_inicio, fecha_fin)
VALUES (1, 'PROMO1', 10, '2025-01-01', '2025-12-31')
ON DUPLICATE KEY UPDATE codigo_Promocion = codigo_Promocion;

-- MARCA
INSERT INTO marca (idmarca, nombreMarca)
VALUES (1, 'Marca Default')
ON DUPLICATE KEY UPDATE nombreMarca = nombreMarca;


select * from producto;
