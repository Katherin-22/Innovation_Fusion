-- DML: Insert - Insertar registros de las tablas:
-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE USUARIOS
-- -----------------------------------------------------

-- Tabla tipoDocumento
INSERT INTO tipo_de_documento  (nombreTipoDeDocumento)
VALUES
("Cédula de Ciudadanía"),
("Cédula de Extranjería"),
("Permiso Especial de Permanencia");

-- Tabla rol
INSERT INTO rol (nombreRol)
VALUES
("cliente"),
("administrador");


-- Tabla estado_usuario
INSERT INTO estado_usuario (nombre_Estado_usuario)
VALUES
("Activo"),
("Inactivo");


-- Tabla Usuario 
INSERT INTO Usuario 
(numeroDocumento, nombreUsuario, primerApellido, segundoApellido,Direccion,telefono,password, 
 correoElectronico,idestado_usuario, idRol, idTipoDeDocumento) 
VALUES
(103347235,"Katherin","Morcillo","Quiroga","Chapinero, Calle 45 #7-89", "3124567890","Contraseña12345","katherinquiroga@gmail.com",1,2,1),
(159350145,"Jhonatan","Carvajal","Bonilla","Usaquén, Carrera 15 #104-22", "3209876543","soyAdmi123","Jhonatan_Bonilla@gmail.com",1,2,1),
(103353635,"Daniela","Bohorquez","Diaz","Suba, Calle 127 #71B-10", "3012345678","Lorena456","DanielaBoDiaz@gmail.com",1,2,1),
(10000001, "carlos", "Martínez", "López","Engativá, Avenida Boyacá #52A-34", "3112233445","pass123", "carlosm@gmail.com",1, 1, 1),
(10000002, "laura", "Gómez", "Ramírez","Fontibón, Carrera 96 #16-20", "3159988776","laura456", "laurag@gmail.com",1, 1, 1),
(10000003, "andres", "Rodríguez", "Torres","Kennedy,Carrera 74 #42 Sur-15", "3161122334", "andres789", "andresr@gmail.com",1, 1, 1),
(10000004, "julian", "Pérez", "García", "Bosa, Calle 63 Sur #79-12", "3185566778","julian321", "julianp@gmail.com",1, 1, 2),
(10000005, "maria", "Castaño", "Londoño", "San Cristóbal, Carrera 4 Este #32B-11", "3223344556","maria654", "mariac@gmail.com",1, 1, 1),
(10000006, "diego", "Alvarez", "Peña","Rafael Uribe Uribe, Calle 36 Sur #21-08", "3194433221", "diego000", "diegoa@gmail.com",1, 1, 3),
(10000007, "paula", "Ríos", "Moreno", "Ciudad Bolívar, Diagonal 62 Sur #18C-55", "3177766554","paula321", "paular@gmail.com",1, 1, 2),
(10000008, "sebastian", "González", "Martínez","Teusaquillo, Carrera 24 #39A-10", "3136677889","sebas888", "sebastiang@gmail.com",1, 1, 1),
(10000009, "camila", "Ruiz", "Sánchez","Tunjuelito, Carrera 53 #49B-67 Sur", "3001112233", "camila777", "camilar@gmail.com",1, 1, 1),
(10000010, "diana", "Morales", "Sanchez","Antonio Nariño, Carrera 24 #17-50 Sur", "3147788990","diana111", "dianam@gmail.com",1, 1, 3),

-- =================================================================================================================================== 
-- si vas a sacar de la base de datos no copiar y pegar la contraseña si no se debe tener la contraseña sin encriptar
-- =================================================================================================================================== 

-- contraseña : sebas789
(10000012, 'sebastian', 'martinez', 'lopez', 'Calle 9 #45-67', '3006547891', '$2a$10$WFBZmXWRz/J6BePxjfskT.FzkPDMc9j0CdyhmPATDqs.cILwWlWoi', 'sebastian.martinez@example.com', 1, 2, 1)
;

-- -----------------------------------------------------
-- MÓDULO DE PROMOCIONES Y DESCUENTOS
-- -----------------------------------------------------
-- Promociones (MÁS PROMOCIONES AGREGADAS)
INSERT INTO Promocion (nombrePromocion, codigo_Promocion, descuento, descripcion, fecha_inicio, fecha_fin, estadoPromocion) 
VALUES 
("Promo Verano", "VER2025", 15.50, "Descuento especial de verano", "2025-06-01", "2025-06-30", "Activo"),
("Black Friday", "BF2025", 30.00, "Ofertas por Black Friday", "2025-11-25", "2025-11-30", "Activo"),
("Cyber Monday", "CYB2025", 25.00, "Ofertas exclusivas online", "2025-12-01", "2025-12-02", "Activo"),
("Día del Padre", "DDP2025", 20.00, "Descuento para el día del padre", "2025-06-15", "2025-06-20", "Inactivo"),
("Back to School", "BTS2025", 15.00, "Vuelta a clases", "2025-01-15", "2025-02-15", "Inactivo"),
("Navidad", "NAV2025", 35.00, "Promoción navideña", "2025-12-15", "2025-12-25", "Activo"),
("Año Nuevo", "AN2026", 10.00, "Comienza bien el año", "2025-12-26", "2026-01-10", "Activo"),
("Primavera", "PRI2025", 12.00, "Descuento de primavera", "2025-09-21", "2025-10-05", "Activo");

-- -----------------------------------------------------
-- MÓDULO DE ADMINISTRADOR
-- -----------------------------------------------------
-- TipoProducto
INSERT INTO TipoProducto (nombreTipoProducto) VALUES ("Calzado");
INSERT INTO TipoProducto (nombreTipoProducto) VALUES ("Bolso");

-- Categorías (MÁS CATEGORÍAS AGREGADAS)
INSERT INTO Categoria (nombreCategoria, idTipoProducto) VALUES 
("Running", 1),
("Bandolera", 2),
("Casual", 1),
("Formal", 1),
("Deportivo", 1),
("Sandalia", 1),
("Botas", 1),
("Tenis", 1),
("Mochila", 2),
("Cartera", 2),
("Riñonera", 2),
("Maletín", 2);

-- Marca (MÁS MARCAS AGREGADAS)
INSERT INTO Marca (nombreMarca) VALUES 
("Nike"),
("Adidas"),
("Puma"),
("Reebok"),
("Converse"),
("Vans"),
("Skechers"),
("Timberland"),
("Steve Madden"),
("Michael Kors"),
("Calvin Klein"),
("Fila"),
("New Balance");

-- Material (MÁS MATERIALES AGREGADOS)
INSERT INTO Material (nombreMaterial) VALUES 
("Cuero"),
("Sintético"),
("Lona"),
("Gamuza"),
("Cuero sintético"),
("Malla"),
("Poliéster"),
("Nylon"),
("Tela"),
("Ante"),
("Caucho"),
("Plástico");

-- TipoPublico
INSERT INTO TipoPublico (nombrePublico) VALUES 
("Hombre"),
("Mujer"),
("Unisex");

-- Productos (MUCHOS MÁS PRODUCTOS AGREGADOS)
INSERT INTO Producto (nombreProducto, codigoReferencia, descripcion, precio, fechaCreacion, fechaModificacion, estadoProducto, idCategoria, idMarca, idMaterial, idPublico, idPromocion) 
VALUES 
-- ZAPATOS RUNNING
("Nike Running Air", "NR001", "Zapatillas deportivas de running con tecnología Air", 299000, "2025-09-01", "2025-09-02", "Activo", 1, 1, 2, 1, 1),
("Adidas Ultraboost", "AU002", "Zapatillas running con amortiguación Boost", 349000, "2025-09-05", "2025-09-06", "Activo", 1, 2, 2, 2, 2),
("New Balance Fresh Foam", "NBF003", "Zapatillas running con Fresh Foam", 279000, "2025-09-10", "2025-09-11", "Activo", 1, 13, 2, 3, 3),
("Puma Velocity Nitro", "PVN004", "Zapatillas running de alto rendimiento", 259000, "2025-09-15", "2025-09-16", "Activo", 1, 3, 2, 1, 4),

-- ZAPATOS CASUAL
("Vans Old Skool", "VOS005", "Zapatillas casual clásicas", 189000, "2025-08-20", "2025-08-21", "Activo", 3, 6, 3, 3, 5),
("Converse Chuck Taylor", "CCT006", "Zapatillas de lona icónicas", 179000, "2025-08-22", "2025-08-23", "Activo", 3, 5, 3, 3, 6),
("Adidas Stan Smith", "ASS007", "Zapatillas casual de cuero", 229000, "2025-08-25", "2025-08-26", "Activo", 3, 2, 1, 2, 7),
("Nike Air Force 1", "NAF008", "Zapatillas deportivas clásicas", 259000, "2025-08-28", "2025-08-29", "Activo", 3, 1, 1, 1, 8),

-- ZAPATOS FORMALES
("Steve Madden Oxford", "SMO009", "Zapatos formales Oxford de cuero", 329000, "2025-09-05", "2025-09-06", "Activo", 4, 9, 1, 1, 1),
("Calvin Klein Formal", "CKF010", "Zapatos formales elegantes", 359000, "2025-09-10", "2025-09-11", "Activo", 4, 11, 1, 2, 2),

-- BOTAS
("Timberland Premium", "TPR011", "Botas resistentes al agua", 459000, "2025-09-01", "2025-09-02", "Activo", 7, 8, 1, 1, 3),
("Nike ACG Mountain", "NAM012", "Botas para montaña", 399000, "2025-09-05", "2025-09-06", "Activo", 7, 1, 2, 3, 4),

-- ZAPATOS TENIS
("Nike Court Air Zoom", "NCA013", "Zapatillas para tenis profesional", 379000, "2025-09-10", "2025-09-11", "Activo", 8, 1, 2, 1, 5),
("Adidas Courtjam Bounce", "ACB014", "Zapatillas tenis con bounce", 289000, "2025-09-15", "2025-09-16", "Activo", 8, 2, 2, 2, 6),

-- SANDALIAS
("Skechers Relaxed Fit", "SRF015", "Sandalias cómodas para caminar", 159000, "2025-08-20", "2025-08-21", "Activo", 6, 7, 11, 2, 7),
("Adidas Adilette", "AAD016", "Sandalias deportivas", 129000, "2025-08-25", "2025-08-26", "Activo", 6, 2, 11, 1, 8),

-- BOLSOS BANDOLERA
("Bandolera Casual Adidas", "BCA017", "Bolso bandolera casual deportivo", 159000, "2025-09-01", "2025-09-02", "Activo", 2, 2, 1, 2, NULL),
("Bandolera Nike Heritage", "BNH018", "Bandolera estilo retro", 179000, "2025-09-05", "2025-09-06", "Activo", 2, 1, 5, 1, 1),
("Bandolera Michael Kors", "BMK019", "Bandolera de cuero genuino", 299000, "2025-09-10", "2025-09-11", "Activo", 2, 10, 1, 2, 2),

-- MOCHILAS
("Mochila Nike Sport", "MNS020", "Mochila deportiva con múltiples bolsillos", 189000, "2025-08-15", "2025-08-16", "Activo", 9, 1, 7, 3, 3),
("Mochila Adidas Tiro", "MAT021", "Mochila para entrenamiento", 169000, "2025-08-20", "2025-08-21", "Activo", 9, 2, 7, 3, 4),
("Mochila Puma Urban", "MPU022", "Mochila urbana moderna", 149000, "2025-08-25", "2025-08-26", "Activo", 9, 3, 7, 3, 5),

-- CARTERAS
("Cartera Calvin Klein", "CCK023", "Cartera elegante de cuero", 259000, "2025-09-05", "2025-09-06", "Activo", 10, 11, 1, 2, 6),
("Cartera Steve Madden", "CSM024", "Cartera con múltiples compartimentos", 229000, "2025-09-10", "2025-09-11", "Activo", 10, 9, 1, 2, 7),

-- RIÑONERAS
("Riñonera Nike Swoosh", "RNS025", "Riñonera deportiva ajustable", 89000, "2025-08-20", "2025-08-21", "Activo", 11, 1, 7, 3, 8),
("Riñonera Adidas Essentials", "RAE026", "Riñonera básica para deporte", 79000, "2025-08-25", "2025-08-26", "Activo", 11, 2, 7, 3, 1),

-- MALETINES
("Maletín Formal Michael Kors", "MFM027", "Maletín ejecutivo de cuero", 389000, "2025-09-01", "2025-09-02", "Activo", 12, 10, 1, 1, 2),
("Maletín Calvin Klein", "MCK028", "Maletín profesional elegante", 349000, "2025-09-05", "2025-09-06", "Activo", 12, 11, 1, 1, 3);

-- Colores (MÁS COLORES AGREGADOS)
INSERT INTO Color (nombreColor) VALUES 
("Rojo"),
("Negro"),
("Blanco"),
("Azul"),
("Gris"),
("Verde"),
("Amarillo"),
("Rosa"),
("Morado"),
("Naranja"),
("Marrón"),
("Beige"),
("Multicolor"),
("Plateado"),
("Dorado");

-- Variaciones (tallas y tamaños - MÁS VARIACIONES)
INSERT INTO Variacion (nombre, tipo) VALUES 
-- Tamaños de bolso
("Pequeño", "Tamano_Bolso"),
("Mediano", "Tamano_Bolso"),
("Grande", "Tamano_Bolso"),
("Extra Grande", "Tamano_Bolso"),

-- Tallas de calzado para niños
("21", "Talla_Calzado"),
("22", "Talla_Calzado"),
("23", "Talla_Calzado"),
("24", "Talla_Calzado"),
("25", "Talla_Calzado"),
("26", "Talla_Calzado"),
("27", "Talla_Calzado"),
("28", "Talla_Calzado"),
("29", "Talla_Calzado"),
("30", "Talla_Calzado"),
("31", "Talla_Calzado"),
("32", "Talla_Calzado"),
("33", "Talla_Calzado"),

-- Tallas de calzado para adultos
("34", "Talla_Calzado"),
("35", "Talla_Calzado"),
("36", "Talla_Calzado"),
("37", "Talla_Calzado"),
("38", "Talla_Calzado"),
("39", "Talla_Calzado"),
("40", "Talla_Calzado"),
("41", "Talla_Calzado"),
("42", "Talla_Calzado"),
("43", "Talla_Calzado"),
("44", "Talla_Calzado"),
("45", "Talla_Calzado"),
("46", "Talla_Calzado");

-- Stock (MUCHOS MÁS REGISTROS DE STOCK)
INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto) 
VALUES 
-- Producto 1 - Nike Running Air (diferentes colores y tallas)
(5, 25, 1, 17, 1),  -- Rojo, talla 36
(5, 20, 2, 18, 1),  -- Negro, talla 37
(5, 18, 3, 19, 1),  -- Blanco, talla 38
(5, 15, 4, 20, 1),  -- Azul, talla 39
(5, 12, 2, 21, 1),  -- Negro, talla 40

-- Producto 2 - Bandolera Casual (diferentes colores y tamaños)
(3, 15, 2, 1, 2),   -- Negro, Pequeño
(3, 12, 3, 2, 2),   -- Blanco, Mediano
(3, 10, 1, 3, 2),   -- Rojo, Grande
(3, 8, 4, 4, 2),    -- Azul, Extra Grande

-- Producto 3 - Adidas Ultraboost
(4, 20, 2, 18, 3),  -- Negro, talla 37
(4, 18, 3, 19, 3),  -- Blanco, talla 38
(4, 16, 5, 20, 3),  -- Gris, talla 39
(4, 14, 6, 21, 3),  -- Verde, talla 40

-- Producto 4 - New Balance Fresh Foam
(3, 15, 3, 19, 4),  -- Blanco, talla 38
(3, 12, 2, 20, 4),  -- Negro, talla 39
(3, 10, 4, 21, 4),  -- Azul, talla 40
(3, 8, 5, 22, 4),   -- Gris, talla 41

-- Producto 5 - Vans Old Skool
(4, 22, 2, 17, 5),  -- Negro, talla 36
(4, 20, 3, 18, 5),  -- Blanco, talla 37
(4, 18, 1, 19, 5),  -- Rojo, talla 38
(4, 16, 4, 20, 5),  -- Azul, talla 39

-- Producto 6 - Converse Chuck Taylor
(3, 18, 3, 19, 6),  -- Blanco, talla 38
(3, 16, 2, 20, 6),  -- Negro, talla 39
(3, 14, 4, 21, 6),  -- Azul, talla 40
(3, 12, 1, 22, 6),  -- Rojo, talla 41

-- Producto 7 - Adidas Stan Smith
(5, 20, 3, 18, 7),  -- Blanco, talla 37
(5, 18, 2, 19, 7),  -- Negro, talla 38
(5, 15, 5, 20, 7),  -- Gris, talla 39
(5, 12, 4, 21, 7),  -- Azul, talla 40

-- Producto 8 - Nike Air Force 1
(4, 25, 3, 19, 8),  -- Blanco, talla 38
(4, 22, 2, 20, 8),  -- Negro, talla 39
(4, 20, 4, 21, 8),  -- Azul, talla 40
(4, 18, 5, 22, 8),  -- Gris, talla 41

-- Producto 9 - Steve Madden Oxford
(3, 12, 2, 20, 9),  -- Negro, talla 39
(3, 10, 11, 21, 9), -- Marrón, talla 40
(3, 8, 2, 22, 9),   -- Negro, talla 41
(3, 6, 11, 23, 9),  -- Marrón, talla 42

-- Producto 10 - Calvin Klein Formal
(2, 10, 2, 17, 10), -- Negro, talla 36
(2, 8, 3, 18, 10),  -- Blanco, talla 37
(2, 6, 2, 19, 10),  -- Negro, talla 38
(2, 4, 11, 20, 10), -- Marrón, talla 39

-- Producto 11 - Timberland Premium
(2, 8, 11, 20, 11), -- Marrón, talla 39
(2, 6, 2, 21, 11),  -- Negro, talla 40
(2, 4, 11, 22, 11), -- Marrón, talla 41
(2, 3, 2, 23, 11),  -- Negro, talla 42

-- Producto 12 - Nike ACG Mountain
(3, 10, 6, 20, 12), -- Verde, talla 39
(3, 8, 11, 21, 12), -- Marrón, talla 40
(3, 6, 2, 22, 12),  -- Negro, talla 41
(3, 4, 5, 23, 12),  -- Gris, talla 42

-- Producto 13 - Nike Court Air Zoom
(2, 12, 3, 20, 13), -- Blanco, talla 39
(2, 10, 4, 21, 13), -- Azul, talla 40
(2, 8, 2, 22, 13),  -- Negro, talla 41
(2, 6, 3, 23, 13),  -- Blanco, talla 42

-- Producto 14 - Adidas Courtjam Bounce
(3, 15, 4, 18, 14), -- Azul, talla 37
(3, 12, 2, 19, 14), -- Negro, talla 38
(3, 10, 3, 20, 14), -- Blanco, talla 39
(3, 8, 1, 21, 14),  -- Rojo, talla 40

-- Producto 15 - Skechers Relaxed Fit
(4, 20, 2, 17, 15), -- Negro, talla 36
(4, 18, 3, 18, 15), -- Blanco, talla 37
(4, 16, 5, 19, 15), -- Gris, talla 38
(4, 14, 4, 20, 15), -- Azul, talla 39

-- Producto 16 - Adidas Adilette
(5, 25, 3, 18, 16), -- Blanco, talla 37
(5, 22, 2, 19, 16), -- Negro, talla 38
(5, 20, 4, 20, 16), -- Azul, talla 39
(5, 18, 5, 21, 16), -- Gris, talla 40

-- Producto 17 - Bandolera Casual Adidas
(3, 15, 2, 1, 17),  -- Negro, Pequeño
(3, 12, 3, 2, 17),  -- Blanco, Mediano
(3, 10, 4, 3, 17),  -- Azul, Grande
(3, 8, 1, 4, 17),   -- Rojo, Extra Grande

-- Producto 18 - Bandolera Nike Heritage
(2, 12, 2, 1, 18),  -- Negro, Pequeño
(2, 10, 5, 2, 18),  -- Gris, Mediano
(2, 8, 11, 3, 18),  -- Marrón, Grande
(2, 6, 2, 4, 18),   -- Negro, Extra Grande

-- Producto 19 - Bandolera Michael Kors
(1, 8, 2, 2, 19),   -- Negro, Mediano
(1, 6, 11, 3, 19),  -- Marrón, Grande
(1, 4, 12, 4, 19),  -- Beige, Extra Grande
(1, 3, 15, 2, 19);  -- Dorado, Mediano

-- -----------------------------------------------------
-- MÓDULO DE GESTION DE COMPRAS
-- -----------------------------------------------------
-- Tabla carrito
INSERT INTO Carrito (fechaCreacion, idUsuario) 
VALUES
("2025-11-02", 4),
("2025-12-03", 5),
("2025-04-03", 6),
("2025-01-04", 7),
("2025-02-04", 8),
("2025-04-05", 9),
("2025-02-05", 10),
("2025-03-01", 11),
("2025-10-01", 12),
("2025-08-01", 13);

-- Tabla MetodoPago (MÁS MÉTODOS DE PAGO)
INSERT INTO MetodoPago (nombreMetodoPago) VALUES
("PSE"),
("Tarjeta de Crédito"),
("Tarjeta de Débito"),
("Efectivo"),
("Transferencia Bancaria");

-- Tabla DetalleCarrito (MÁS DETALLES DE CARRITO)
INSERT INTO DetalleCarrito (idProducto, idCarrito, cantidad, idUsuario) 
VALUES
(1, 1, 2, 4),
(2, 2, 3, 5),
(1, 3, 1, 6),
(2, 4, 2, 7),
(1, 5, 2, 8),
(1, 6, 3, 9),
(2, 7, 1, 10),
(1, 8, 2, 11),
(2, 9, 3, 12),
(1, 10, 2, 13),
(3, 1, 1, 4),
(4, 2, 2, 5),
(5, 3, 1, 6),
(6, 4, 3, 7),
(7, 5, 2, 8),
(8, 6, 1, 9),
(9, 7, 2, 10),
(10, 8, 1, 11),
(11, 9, 1, 12),
(12, 10, 2, 13);


-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE PEDIDOS
-- -----------------------------------------------------

-- Tabla Pedido
INSERT INTO Pedido (fechaPedido, idUsuario, idCarrito, idPromocion, idMetodoPago)
 VALUES
("2025-07-01", 4, 1, 1, 1),
("2025-07-01", 5, 2, 2, 1),
("2025-07-02", 6, 3, 1, 1),
("2025-07-02", 7, 4, 2, 1),
("2025-07-03", 8, 5, 1, 1),
("2025-07-03", 9, 6, 2, 1),
("2025-07-04", 10, 7, 1, 1),
("2025-07-04", 11, 8, 2, 1),
("2025-07-05", 12, 9, 1, 1),
("2025-07-05", 13, 10, 2, 1);

-- Tabla detallePedido
INSERT INTO DetallePedido (idPedido , talla, cantidad, precioUnitario) 
VALUES
(1, 38, 2, 75000),
(2, 42, 1, 235000),
(3, 40, 3, 320000),
(4, 36, 1, 120000),
(5, 37, 2, 28000),
(6, 43, 1, 30000),
(7, 39, 2, 225000),
(8, 38, 1, 89000),
(9, 41, 1, 175000),
(10, 44, 2, 105000);


INSERT INTO DetallePedido_has_Pedido
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,7),
(8,8),
(9,9),
(10,10);

-- -----------------------------------------------------
-- MÓDULO DE GESTION DE COMPRAS
-- -----------------------------------------------------
-- Tabla ComprobanteDeVenta
INSERT INTO ComprobanteDeVenta 
(idPedido, idUsuario, fechaEmision, nombreUsuario, primerApellidoUsuario, segundoApellidoUsuario) 
VALUES
(1, 4, "2025-07-01 10:30:00","carlos", "Martínez", "López"),
(2, 5, "2025-07-01 11:45:00","laura", "Gómez", "Ramírez"),
(3, 6, "2025-07-02 09:50:00","andres", "Rodríguez", "Torres"),
(4, 7, "2025-07-02 15:00:00","julian", "Pérez", "García"),
(5, 8, "2025-07-03 08:40:00", "maria", "Castaño", "Londoño"),
(6, 9, "2025-07-03 17:20:00", "diego", "Alvarez", "Peña"),
(7, 10, "2025-07-04 13:10:00", "paula", "Ríos", "Moreno"),
(8, 11, "2025-07-04 18:45:00", "sebastian", "González", "Martínez"),
(9, 12, "2025-07-05 08:25:00", "camila", "Ruiz", "Sánchez"),
(10, 13, "2025-07-05 22:10:00", "diana", "Morales", "Sanchez");

-- Tabla DetallesComprobanteDeVenta 
INSERT INTO DetallesComprobanteDeVenta 
(idComprobanteDeVenta, idDetallePedido, idProducto, cantidad, precio_unitario)
VALUES 
(1, 1, 1, 2, 150000),
(1, 1, 2, 1, 98500),
(2, 2, 1,1, 235000),
(2, 4, 2,3, 120000),
(3, 4, 1,2, 56000),
(3, 7, 2,1, 300000),
(4, 7, 1,1, 175000),
(4, 6, 2,2, 450000),
(5, 5, 1,2, 210000),
(5, 10, 2,1, 89000),
(1, 3, 1,2, 150000),
(1, 8, 1,1, 98500),
(2, 8, 2,1, 235000),
(2, 9, 1,3, 120000);

-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE PEDIDOS
-- -----------------------------------------------------

-- Tabla estadoPedido
INSERT INTO EstadoPedido (nombreEstado)
VALUES 
("En terminal de origen"),
("En transporte"),
("En terminal destino"),
("En reparto"),
("Entregado"),
("Cancelado"),
("Devuelto");

-- Tabla seguimientoPedido
INSERT INTO SeguimientoPedido (fechaEstado, comentario, idPedido, idEstadoPedido)
VALUES
("2025-06-25", "Pedido recibido", 1, 7),
("2025-06-26", "Confirmado por el sistema", 2, 6),
("2025-06-26", "Cocinando", 3, 3),
("2025-06-27", "Va en camino", 4, 4),
("2025-06-27", "Cliente recibió el pedido", 5, 5),
("2025-06-27", "Cancelado por cliente", 6, 4),
("2025-06-28", "Producto defectuoso", 7, 3),
("2025-06-28", "Se cambió la fecha", 8, 2),
("2025-06-28", "Problema con tarjeta", 9, 1),
("2025-06-29", "Esperando recogida", 10, 7);

-- Tabla DevolucionCambio
INSERT INTO devoluciones_Cambios 
(motivo, tipo_solicitud, estado_solicitud, fecha_solicitud, fecha_respuesta, idUsuario)
VALUES
("Producto defectuoso al recibirlo", "Devolución", "Aprobada", "2025-06-20", "2025-06-22", 1),
("Talla incorrecta enviada", "Cambio", "En proceso", "2025-06-21", NULL, 2),
("No era lo que esperaba", "Devolución", "Rechazada", "2025-06-22", "2025-06-24", 1),
("Producto llegó incompleto", "Devolución", "Aprobada", "2025-06-23", "2025-06-25", 2),
("Color distinto al solicitado", "Cambio", "Pendiente", "2025-06-24", NULL, 1),
("No me quedó bien", "Cambio", "Rechazada", "2025-06-24", "2025-06-26", 2),
("No quede satisfecho con el Producto ", "Devolución", "Aprobada", "2025-06-25", "2025-06-27", 1),
("Error en el modelo recibido", "Cambio", "En proceso", "2025-06-26", NULL,  2 ),
("Me equivoqué en el pedido", "Devolución", "Rechazada", "2025-06-26", "2025-06-28",  1),
("La talla no me queda", "Devolución", "Aprobada", "2025-06-26", "2025-06-28", 2);