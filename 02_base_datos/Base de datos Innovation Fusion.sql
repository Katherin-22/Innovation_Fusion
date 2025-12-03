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