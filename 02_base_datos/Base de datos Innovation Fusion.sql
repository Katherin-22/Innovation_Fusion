-- Crear la base de datos
DROP DATABASE IF EXISTS Innovation_Fusion;
Create database Innovation_Fusion;
USE Innovation_Fusion;

-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE USUARIOS
-- -----------------------------------------------------

-- Tabla tipo_de_documento
CREATE TABLE tipo_de_documento (
idTipoDeDocumento INT AUTO_INCREMENT NOT NULL ,
nombreTipoDeDocumento VARCHAR(45) NOT NULL,

PRIMARY KEY (idTipoDeDocumento)
);

-- Tabla rol
CREATE TABLE rol (
  idRol INT AUTO_INCREMENT NOT NULL,
  nombreRol ENUM("cliente","administrador") NOT NULL,
  
  PRIMARY KEY(idRol)
) ;

-- Tabla estado_usuario
CREATE TABLE estado_usuario (
  idestado_usuario INT AUTO_INCREMENT NOT NULL,
  nombre_Estado_usuario VARCHAR(45) NOT NULL,
  
  PRIMARY KEY(idestado_usuario)
) ;

-- Tabla usuario
CREATE TABLE Usuario (
  idUsuario INT AUTO_INCREMENT NOT NULL,
  numeroDocumento INT NOT NULL,
  nombreUsuario VARCHAR(45) NOT NULL,
  primerApellido VARCHAR(45) NOT NULL,
  segundoApellido VARCHAR(45) NULL,
  telefono VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  correoElectronico VARCHAR(45) NOT NULL,
  Direccion VARCHAR(45) NOT NULL,
  idRol INT NOT NULL,
  idTipoDeDocumento INT NOT NULL,
  idestado_usuario INT NOT NULL,
  
  PRIMARY KEY(idUsuario),
  FOREIGN KEY (idRol) REFERENCES rol( idRol),
  FOREIGN KEY (idTipoDeDocumento) REFERENCES tipo_de_documento(idTipoDeDocumento),
  FOREIGN KEY (idestado_usuario) REFERENCES estado_usuario(idestado_usuario)
  
) ;
-- -----------------------------------------------------
-- MÓDULO DE PROMOCIONES Y DESCUENTOS            			1.1
-- -----------------------------------------------------

CREATE TABLE Promocion(
idPromocion INT AUTO_INCREMENT NOT NULL,
nombrePromocion VARCHAR(50) NOT NULL,
codigo_Promocion VARCHAR(45) NOT NULL,
descuento INT NOT NULL,
descripcion VARCHAR(200) NOT NULL,
fecha_inicio DATE NOT NULL,
fecha_fin DATE NOT NULL,
estadoPromocion ENUM('Activo','Inactivo') NOT NULL,

PRIMARY KEY (idPromocion)
);
-- -----------------------------------------------------
-- MÓDULO DE ADMINISTRADOR
-- -----------------------------------------------------
-- Tabla TipoProducto
CREATE TABLE TipoProducto (
  idTipoProducto  INT AUTO_INCREMENT NOT NULL,
  nombreTipoProducto  VARCHAR(45) NOT NULL,
  
  PRIMARY KEY(idTipoProducto)
) ;

-- Tabla Categoria
CREATE TABLE Categoria (
  idCategoria INT AUTO_INCREMENT NOT NULL,
  nombreCategoria  VARCHAR(45) NOT NULL,
  idTipoProducto INT NOT NULL,

  PRIMARY KEY (idCategoria),
  FOREIGN KEY (idTipoProducto) REFERENCES TipoProducto(idTipoProducto)

) ;

CREATE TABLE Marca (
  idMarca INT AUTO_INCREMENT NOT NULL,
  nombreMarca VARCHAR(45) NOT NULL,
  PRIMARY KEY (idMarca)
) ;


CREATE TABLE Material (
  idMaterial INT AUTO_INCREMENT NOT NULL,
  nombreMaterial VARCHAR(45) NOT NULL,

  PRIMARY KEY (idMaterial)
) ;

CREATE TABLE TipoPublico (
  idPublico INT AUTO_INCREMENT NOT NULL,
  nombrePublico VARCHAR(45) NOT NULL,

  PRIMARY KEY (idPublico)
) ;

-- Tabla producto
CREATE TABLE Producto (
  idProducto INT AUTO_INCREMENT NOT NULL,
  nombreProducto VARCHAR(45) NOT NULL, 
  codigoReferencia VARCHAR(20) NOT NULL,
  descripcion VARCHAR(200) NOT NULL,
  precio DOUBLE NOT NULL, 
  fechaCreacion DATE NOT NULL,
  fechaModificacion DATE NOT NULL,
  estadoProducto ENUM('Activo', 'Inactivo', 'Descontinuado') NOT NULL,
  idCategoria INT NOT NULL,
  idMarca INT NOT NULL ,
  idMaterial INT NOT NULL,
  idPublico INT NOT NULL,
  idPromocion INT NULL,
  

  PRIMARY KEY (idProducto),
  FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria),
  FOREIGN KEY (idMarca) REFERENCES Marca(idMarca),
  FOREIGN KEY (idMaterial) REFERENCES Material(idMaterial),
  FOREIGN KEY (idPublico) REFERENCES TipoPublico(idPublico),
  FOREIGN KEY (idPromocion) REFERENCES Promocion(idPromocion)
) ;

-- Tabla proveedor
CREATE TABLE Color (
  idColor INT AUTO_INCREMENT NOT NULL,
  nombreColor VARCHAR(45) NOT NULL,

  PRIMARY KEY (idColor)
) ;

-- Tabla proveedor
CREATE TABLE Variacion (
  idVariacion INT AUTO_INCREMENT NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  tipo ENUM('Talla_Calzado', 'Tamano_Bolso') NOT NULL,

  PRIMARY KEY (idVariacion)
) ;

-- Tabla Inventario
CREATE TABLE Stock (
  idStock INT AUTO_INCREMENT NOT NULL,
  stockMinimo INT NOT NULL DEFAULT 1,
  stockActual INT NOT NULL DEFAULT 0,
  idColor INT NULL,
  idVariacion INT NULL,
  idProducto INT NOT NULL,
  
  PRIMARY KEY (idStock),
  FOREIGN KEY (idColor) REFERENCES Color(idColor),
  FOREIGN KEY (idVariacion) REFERENCES Variacion(idVariacion),
  FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
) ;

-- Tabla imagen
CREATE TABLE Imagen(
	idImagen INT AUTO_INCREMENT NOT NULL, 
    urlImagen VARCHAR(255) NOT NULL,
    idProducto INT NOT NULL,   -- asociamos directamente al producto
    
    PRIMARY KEY (idImagen),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON DELETE CASCADE
);

CREATE TABLE Banner (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion VARCHAR(500),
    imagenUrl VARCHAR(255),
    fileName VARCHAR(255),
    url VARCHAR(500)
);


-- Tabla Mensajes del inbox
CREATE TABLE mensajes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL,
    tipo ENUM('RECLAMO', 'SOLICITUD_CAMBIO', 'PREGUNTA', 'SUGERENCIA') NOT NULL,
    contenido TEXT NOT NULL,
    respuesta TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP NULL
);

-- -----------------------------------------------------
-- MÓDULO DE GESTION DE COMPRAS								PARTE 1.1
-- -----------------------------------------------------
-- Tabla carrito
CREATE TABLE Carrito (
  idCarrito INT AUTO_INCREMENT NOT NULL ,
  fechaCreacion VARCHAR(45) NOT NULL,
  idUsuario INT,
  
  PRIMARY KEY (idCarrito),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
) ;

-- Tabla MetodoPago
CREATE TABLE MetodoPago (
    idMetodoPago INT AUTO_INCREMENT NOT NULL,
    nombreMetodoPago VARCHAR(45) NOT NULL,
    
    PRIMARY KEY (idMetodoPago)
);


-- Tabla DetalleCarrito 
CREATE TABLE DetalleCarrito (
  idProducto INT NOT NULL,
  idCarrito INT NOT NULL,
  cantidad INT NOT NULL,
  idUsuario INT NOT NULL,
  
  PRIMARY KEY (idProducto,idCarrito),
  FOREIGN KEY (idProducto) REFERENCES producto(idProducto),
  FOREIGN KEY (idCarrito) REFERENCES Carrito(idCarrito)
) ;



-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE PEDIDOS											PARTE 1.1
-- -----------------------------------------------------

-- Tabla Pedido
CREATE TABLE Pedido (
  idPedido INT AUTO_INCREMENT NOT NULL,
  fechaPedido DATE NOT NULL, 
  idUsuario INT NOT NULL,
  idCarrito INT NOT NULL,
  idPromocion INT NOT NULL,
  idMetodoPago INT NOT NULL,
  
  PRIMARY KEY(idPedido),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idCarrito) REFERENCES Carrito (idCarrito),
  FOREIGN KEY (idPromocion) REFERENCES Promocion (idPromocion),
  FOREIGN KEY (idMetodoPago) REFERENCES MetodoPago(idMetodoPago)
) ;

-- Tabla detallePedido
CREATE TABLE DetallePedido (
  idDetallePedido INT AUTO_INCREMENT NOT NULL,
  idPedido INT NOT NULL,
  talla INT NOT NULL, 
  cantidad INT NOT NULL,
  precioUnitario DOUBLE NOT NULL,

  PRIMARY KEY(idDetallePedido),
  FOREIGN KEY (idPedido) REFERENCES pedido(idPedido)
) ;

CREATE TABLE DetallePedido_has_Pedido(
  idDetallePedido INT NOT NULL,
  idPedido INT NOT NULL,
  
  PRIMARY KEY(idDetallePedido, idPedido),
  FOREIGN KEY (idDetallePedido) REFERENCES DetallePedido(idDetallePedido),
  FOREIGN KEY (idPedido) REFERENCES pedido(idPedido)
);
-- -----------------------------------------------------
-- MÓDULO DE GESTION DE COMPRAS									PARTE 1.2
-- -----------------------------------------------------
-- Tabla ComprobanteDeVenta
CREATE TABLE ComprobanteDeVenta (
  idComprobanteDeVenta INT AUTO_INCREMENT NOT NULL,
  idPedido INT NOT NULL,
  idUsuario INT NOT NULL,
  fechaEmision DATETIME NOT NULL,
  nombreUsuario VARCHAR (45) NOT NULL,
  primerApellidoUsuario VARCHAR(45) NOT NULL, 
  segundoApellidoUsuario VARCHAR(45) NOT NULL,

  PRIMARY KEY (idComprobanteDeVenta),
  FOREIGN KEY (idPedido) REFERENCES Pedido (idPedido),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
) ;

-- Tabla DetallesComprobanteDeVenta 
CREATE TABLE DetallesComprobanteDeVenta (
  idDetallesComprobanteDeVenta INT AUTO_INCREMENT NOT NULL,
  idComprobanteDeVenta INT NOT NULL,
  idDetallePedido INT NOT NULL, 
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DOUBLE NOT NULL,


  PRIMARY KEY (idDetallesComprobanteDeVenta),
  FOREIGN KEY (idComprobanteDeVenta) REFERENCES ComprobanteDeVenta(idComprobanteDeVenta),
  FOREIGN KEY (idDetallePedido) REFERENCES DetallePedido (idDetallePedido),
  FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)

) ;
-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE PEDIDOS 							PARTE 1.2
-- -----------------------------------------------------
-- Tabla estadoPedido
CREATE TABLE EstadoPedido (
  idEstadoPedido INT AUTO_INCREMENT NOT NULL,
  nombreEstado VARCHAR(45) NOT NULL,
  
  PRIMARY KEY (idEstadoPedido)
) ;

-- Tabla seguimientoPedido
CREATE TABLE SeguimientoPedido (
  idSeguimiento INT NOT NULL AUTO_INCREMENT,
  fechaEstado DATE NOT NULL,
  comentario VARCHAR(45) NULL,
  idPedido INT,
  idEstadoPedido INT,
  
  PRIMARY KEY (idSeguimiento),
  FOREIGN KEY (idPedido) REFERENCES pedido(idPedido),
  FOREIGN KEY (idEstadoPedido) REFERENCES EstadoPedido(idEstadoPedido)
) ;


-- Tabla devoluciones_Cambios
CREATE TABLE devoluciones_Cambios (
  id_devolucion INT AUTO_INCREMENT NOT NULL,
  motivo VARCHAR(255) NOT NULL, 
  tipo_solicitud VARCHAR(200) NOT NULL, 
  estado_solicitud VARCHAR(45) NOT NULL,
  fecha_solicitud VARCHAR(40) NOT NULL,
  fecha_respuesta VARCHAR(45) NULL, 
  idUsuario INT NOT NULL,

  PRIMARY KEY (id_devolucion),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
) ;

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
(10000010, "diana", "Morales", "Sanchez","Antonio Nariño, Carrera 24 #17-50 Sur", "3147788990","diana111", "dianam@gmail.com",1, 1, 3);

-- -----------------------------------------------------
-- MÓDULO DE PROMOCIONES Y DESCUENTOS						1.1
-- -----------------------------------------------------
-- Promociones
INSERT INTO Promocion (nombrePromocion, codigo_Promocion, descuento, descripcion, fecha_inicio, fecha_fin, estadoPromocion) 
VALUES ("Promo Verano", "VER2025", 15.50, "Descuento especial de verano", "2025-06-01", "2025-06-30", "Activo");

INSERT INTO Promocion (nombrePromocion, codigo_Promocion, descuento, descripcion, fecha_inicio, fecha_fin, estadoPromocion) 
VALUES ("Black Friday", "BF2025", 30.00, "Ofertas por Black Friday", "2025-11-25", "2025-11-30", "Activo");

-- -----------------------------------------------------
-- MÓDULO DE ADMINISTRADOR
-- -----------------------------------------------------
-- TipoProducto
INSERT INTO TipoProducto (nombreTipoProducto) VALUES ("Calzado");
INSERT INTO TipoProducto (nombreTipoProducto) VALUES ("Bolso");

-- Categorías
INSERT INTO Categoria (nombreCategoria, idTipoProducto) VALUES ("Running", 1);
INSERT INTO Categoria (nombreCategoria, idTipoProducto) VALUES ("Bandolera", 2);

-- Marca
INSERT INTO Marca (nombreMarca) VALUES ("Nike");
INSERT INTO Marca (nombreMarca) VALUES ("Adidas");

-- Material
INSERT INTO Material (nombreMaterial) VALUES ("Cuero");
INSERT INTO Material (nombreMaterial) VALUES ("Sintético");

-- TipoPublico
INSERT INTO TipoPublico (nombrePublico) VALUES ("Hombre");
INSERT INTO TipoPublico (nombrePublico) VALUES ("Mujer");
INSERT INTO TipoPublico (nombrePublico) VALUES ("Unisex");

-- Productos
INSERT INTO Producto (nombreProducto, codigoReferencia, descripcion, precio,  fechaCreacion, fechaModificacion,estadoProducto, idCategoria, idMarca, idMaterial, idPublico, idPromocion) 
VALUES ("Nike Running Air", "NR001", "Zapatillas deportivas de running", 299000, "2025-09-01", "2025-09-02","Activo", 1, 1, 2, 1, 1);

INSERT INTO Producto (nombreProducto, codigoReferencia, descripcion, precio, fechaCreacion, fechaModificacion,estadoProducto, idCategoria, idMarca, idMaterial, idPublico, idPromocion) 
VALUES ("Bandolera Casual", "BD001", "Bolso bandolera casual", 159000, "2025-09-01", "2025-09-02","Activo", 2, 2, 1, 2, NULL);

-- Colores
INSERT INTO Color (nombreColor) VALUES ("Rojo");
INSERT INTO Color (nombreColor) VALUES ("Negro");

-- Variaciones (tallas y tamaños)
INSERT INTO Variacion (nombre, tipo) VALUES 
("Pequeño", "Tamano_Bolso"),
("Mediano", "Tamano_Bolso"),
("Grande", "Tamano_Bolso"),
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
("44", "Talla_Calzado");


-- Stock
INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto) 
VALUES (5, 20, 1, 1, 1);

INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto) 
VALUES (5, 15, 2, 2, 1);

INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto) 
VALUES (2, 10, 2, 3, 2);


-- -----------------------------------------------------
-- MÓDULO DE GESTION DE COMPRAS								PARTE 1.1
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

-- Tabla MetodoPago
INSERT INTO MetodoPago (nombreMetodoPago)
 VALUES
("PSE");

-- Tabla DetalleCarrito 
INSERT INTO DetalleCarrito (idProducto, idCarrito, cantidad, idUsuario) 
VALUES
(1, 1, 2, 4),
(2, 2, 3, 5),
(3, 3, 1, 6),
(4, 4, 2, 7),
(5, 5, 2, 8),
(6, 6, 3, 9),
(7, 7, 1, 10),
(8, 8, 2, 11),
(8, 9, 3, 12),
(10, 10, 2, 13);


-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE PEDIDOS											PARTE 1.1
-- -----------------------------------------------------

-- Tabla Pedido
INSERT INTO Pedido (fechaPedido, idUsuario, idCarrito, idPromocion, idMetodoPago)
 VALUES
("2025-07-01", 4, 1, 1, 1),
("2025-07-01", 5, 2, 2, 1),
("2025-07-02", 6, 3, 3, 1),
("2025-07-02", 7, 4, 4, 1),
("2025-07-03", 8, 5, 5, 1),
("2025-07-03", 9, 6, 6, 1),
("2025-07-04", 10, 7, 7, 1),
("2025-07-04", 11, 8, 8, 1),
("2025-07-05", 12, 9, 9, 1),
("2025-07-05", 13, 10, 10, 1);

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
-- MÓDULO DE GESTION DE COMPRAS									PARTE 1.2
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
(1, 1, 3, 1, 98500),
(2, 2, 2,1, 235000),
(2, 4, 4,3, 120000),
(3, 4, 5,2, 56000),
(3, 7, 6,1, 300000),
(4, 7, 9,1, 175000),
(4, 6, 7,2, 450000),
(5, 5, 10,2, 210000),
(5, 10, 8,1, 89000),
(1, 3, 1,2, 150000),
(1, 8, 3,1, 98500),
(2, 8, 2,1, 235000),
(2, 9, 4,3, 120000);

-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE PEDIDOS 							PARTE 1.2
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


