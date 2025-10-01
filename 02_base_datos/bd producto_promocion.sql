-- Crear la base de datos
DROP DATABASE IF EXISTS Innovation_Fusion;
Create database Innovation_Fusion;
USE Innovation_Fusion;

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
  idMarca INT NOT NULL,
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
  stockMinimo INT NOT NULL,
  stockActual INT NOT NULL,
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


-- trigger para que cuando se cree un producto, se guarde en un stoc vacio
DELIMITER $$

CREATE TRIGGER trg_producto_after_insert
AFTER INSERT ON Producto
FOR EACH ROW
BEGIN
    INSERT INTO Stock (stockMinimo, stockActual, idColor, idVariacion, idProducto)
    VALUES (0, 0, NULL, NULL, NEW.idProducto);
END$$

DELIMITER ;

-- Insert
-- Promociones
INSERT INTO Promocion (nombrePromocion, codigo_Promocion, descuento, descripcion, fecha_inicio, fecha_fin, estadoPromocion) 
VALUES ("Promo Verano", "VER2025", 15.50, "Descuento especial de verano", "2025-06-01", "2025-06-30", "Activo");

INSERT INTO Promocion (nombrePromocion, codigo_Promocion, descuento, descripcion, fecha_inicio, fecha_fin, estadoPromocion) 
VALUES ("Black Friday", "BF2025", 30.00, "Ofertas por Black Friday", "2025-11-25", "2025-11-30", "Activo");

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

-- TipoPublico
INSERT INTO Imagen (urlImagen, idProducto) VALUES ("eje de link imagen",1);
