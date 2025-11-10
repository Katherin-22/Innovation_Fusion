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
INSERT INTO Variacion (nombre, tipo) VALUES ("35", "Talla_Calzado");
INSERT INTO Variacion (nombre, tipo) VALUES ("37", "Talla_Calzado");
INSERT INTO Variacion (nombre, tipo) VALUES ("Pequeño", "Tamano_Bolso");
INSERT INTO Variacion (nombre, tipo) VALUES ("Grande", "Tamano_Bolso");

-- Stock
INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto) 
VALUES (5, 20, 1, 1, 1);

INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto) 
VALUES (5, 15, 2, 2, 1);

INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto) 
VALUES (2, 10, 2, 3, 2);

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


