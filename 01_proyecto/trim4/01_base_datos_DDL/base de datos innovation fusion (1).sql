-- Crear la base de datos
DROP DATABASE IF EXISTS Innovation_Fusion;
Create database Innovation_Fusion;
USE Innovation_Fusion;

-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE USUARIOS
-- -----------------------------------------------------

-- Tabla tipoDocumento
CREATE TABLE tipoDocumento (
idtipoDocumento INT AUTO_INCREMENT NOT NULL ,
nombreTipoDeDocumento VARCHAR(45) NOT NULL,

PRIMARY KEY (idtipoDocumento)
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
  nombre VARCHAR(45) NOT NULL,
  
  PRIMARY KEY(idestado_usuario)
) ;

-- Tabla usuario
CREATE TABLE Usuario (
  idUsuario INT AUTO_INCREMENT NOT NULL,
  numeroDocumento INT NOT NULL,
  nombreUsuario VARCHAR(45) NOT NULL,
  primerApellido VARCHAR(45) NOT NULL,
  segundoApellido VARCHAR(45) NULL,
  contraseña VARCHAR(45) NULL,
  correoElectronico VARCHAR(45) NOT NULL,
  idRol INT NOT NULL,
  idtipoDocumento INT NOT NULL,
  idestado_usuario INT NOT NULL,
  
  PRIMARY KEY(idUsuario),
  FOREIGN KEY (idRol) REFERENCES rol( idRol),
  FOREIGN KEY (idtipoDocumento) REFERENCES tipoDocumento(idtipoDocumento),
  FOREIGN KEY (idestado_usuario) REFERENCES estado_usuario(idestado_usuario)
) ;

-- Tabla localidad
CREATE TABLE Localidad(
idLocalidad INT AUTO_INCREMENT NOT NULL,
nombre VARCHAR (45) NOT NULL, 

PRIMARY KEY (idLocalidad)
);

-- Tabla Barrio
CREATE TABLE Barrio(
idBarrio INT AUTO_INCREMENT NOT NULL,
nombre VARCHAR (200) NOT NULL,
idLocalidad INT NOT NULL,

PRIMARY KEY (idBarrio),
FOREIGN KEY (idLocalidad) REFERENCES Localidad (idLocalidad)
);

CREATE TABLE TipoVia(
idTipoVia INT AUTO_INCREMENT NOT NULL,
nombre VARCHAR (45) NOT NULL, 

PRIMARY KEY (idTipoVia)
);

CREATE TABLE Direccion(
idDireccion INT AUTO_INCREMENT NOT NULL,
idUsuario INT NOT NULL,
idTipoVia INT NOT NULL, 
vía_principal INT NOT NULL,
vía_secundaria VARCHAR (45) NULL,
Complemento_adicional VARCHAR (45) NULL,
idBarrio INT NOT NULL,

PRIMARY KEY (idDireccion),
FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
FOREIGN KEY (idTipoVia) REFERENCES TipoVia (idTipoVia),
FOREIGN KEY (idBarrio) REFERENCES Barrio(idBarrio)
);

CREATE TABLE TipoTelefono(
idTipoTelefono INT AUTO_INCREMENT NOT NULL,
nombre VARCHAR (45) NOT NULL,

PRIMARY KEY (idTipoTelefono)
);

CREATE TABLE Telefono(
idTelefono INT NOT NULL,
idTipoTelefono INT NOT NULL,
idUsuario INT NOT NULL,
numero  VARCHAR(20) NOT NULL,

PRIMARY KEY (idTelefono),
FOREIGN KEY (idTipoTelefono) REFERENCES TipoTelefono(idTipoTelefono),
FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario)
);

-- -----------------------------------------------------
-- MÓDULO DE ADMINISTRADOR
-- -----------------------------------------------------

-- Tabla Categoria
CREATE TABLE Categoria (
  idCategoria INT AUTO_INCREMENT NOT NULL,
  nombreCategoria  VARCHAR(45) NOT NULL,
  
  PRIMARY KEY (idCategoria)
) ;

-- Tabla subCategoria
CREATE TABLE subCategoria (
  idSubCategoria INT AUTO_INCREMENT NOT NULL,
  nombreSubCategoria VARCHAR(45) NOT NULL,
  idCategoria INT,
  
  PRIMARY KEY(idSubCategoria),
  FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
) ;

-- Tabla TipoProducto
CREATE TABLE TipoProducto (
  idTipoProducto INT AUTO_INCREMENT NOT NULL,
  nombreTipoProducto VARCHAR(45) NOT NULL,
  
  PRIMARY KEY(idTipoProducto)
) ;


-- Tabla proveedor
CREATE TABLE Proveedor (
  idProveedor INT AUTO_INCREMENT NOT NULL,
  nombreProveedor VARCHAR(45) NOT NULL,
  contacto VARCHAR(45) NULL,

  PRIMARY KEY (idProveedor)
) ;

CREATE TABLE Estado (
	idEstado INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR (45) NOT NULL,
    
    PRIMARY KEY (idEstado)
);

-- Tabla producto
CREATE TABLE Producto (
  idProducto INT AUTO_INCREMENT NOT NULL,
  nombreProducto VARCHAR(45) NOT NULL, 
  descripcion VARCHAR(45) NOT NULL, 
  urlImagen VARCHAR(45) NOT NULL,
  precio DOUBLE NOT NULL, 
  marca VARCHAR(45) NULL,
  fechaCreacion DATE NOT NULL,
  fechaModificacion DATE NULL,
  idCategoria INT NOT NULL,
  idTipoProducto INT NOT NULL,
  idProveedor INT NULL,
  idEstado INT NOT NULL,

  PRIMARY KEY (idProducto),
  FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria),
  FOREIGN KEY (idTipoProducto) REFERENCES TipoProducto(idTipoProducto),
  FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor),
  FOREIGN KEY (idEstado) REFERENCES Estado(idEstado)
) ;


-- Tabla Inventario
CREATE TABLE Inventario (
  idInventario INT AUTO_INCREMENT NOT NULL,
  color VARCHAR(45) NOT NULL, 
  talla VARCHAR(45) NOT NULL,
  cantidad VARCHAR(45) NOT NULL,
  idProducto INT NOT NULL,
  
  PRIMARY KEY (idInventario),
  FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
) ;

-- -----------------------------------------------------
-- MÓDULO DE PROMOCIONES Y DESCUENTOS
-- -----------------------------------------------------

CREATE TABLE Promocion(
idPromocion INT AUTO_INCREMENT NOT NULL,
codigo_Promocion VARCHAR(45) NOT NULL,
descuento INT NOT NULL,
fecha_inicio DATE NOT NULL,
fecha_fin DATE NOT NULL,

PRIMARY KEY (idPromocion)
);

-- Tabla colección
CREATE TABLE Coleccion (
  idColeccion INT NOT NULL AUTO_INCREMENT,
  idProducto INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  descripción  VARCHAR(45) NOT NULL,
  fechaCreacion DATE NULL,
  idUsuario INT NOT NULL,
  idPromocion INT NOT NULL,
  
  PRIMARY KEY (idcoleccion),
  FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idpromocion) REFERENCES promocion (idpromocion)
) ;

-- Tabla producto_promocion
CREATE TABLE producto_promocion (
  idProducto INT,
  idPromocion INT,
  PRIMARY KEY (idProducto,idPromocion),
  FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
  FOREIGN KEY (idPromocion) REFERENCES Promocion(idPromocion)
) ;

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
) ;

-- Tabla pago
CREATE TABLE Pago (
  idPago INT NOT NULL AUTO_INCREMENT,
  cantidad VARCHAR(45) NOT NULL,
  idMetodoPago INT NOT NULL,
  
  PRIMARY KEY(idPago),
  FOREIGN KEY (idMetodoPago) REFERENCES MetodoPago(idMetodoPago)
) ;

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
  idDireccion INT NOT NULL,
  idPago INT NOT NULL,
  idMetodoPago INT NOT NULL,
  
  PRIMARY KEY(idPedido),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idCarrito) REFERENCES Carrito (idCarrito),
  FOREIGN KEY (idPromocion) REFERENCES Promocion (idPromocion),
  FOREIGN KEY (idDireccion) REFERENCES Direccion (idDireccion),
  FOREIGN KEY (idPago) REFERENCES Pago(idPago),
  FOREIGN KEY (idMetodoPago) REFERENCES MetodoPago(idMetodoPago)
) ;

-- Tabla detallePedido
CREATE TABLE DetallePedido (
  idDetallePedido INT AUTO_INCREMENT NOT NULL,
  idPedido INT NOT NULL,
  idUsuario INT NOT NULL,
  talla INT NOT NULL, 
  cantidad INT NOT NULL,
  precioUnitario DOUBLE NOT NULL,

  
  PRIMARY KEY(idDetallePedido),
  FOREIGN KEY (idPedido) REFERENCES pedido(idPedido),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
) ;
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
  idPago INT NOT NULL,

  PRIMARY KEY (idComprobanteDeVenta),
  FOREIGN KEY (idPedido) REFERENCES Pedido (idPedido),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idPago) REFERENCES Pago(idPago)
) ;

-- Tabla DetallesComprobanteDeVenta 
CREATE TABLE DetallesComprobanteDeVenta (
  idDetallesComprobanteDeVenta INT AUTO_INCREMENT NOT NULL,
  idComprobanteDeVenta INT NOT NULL,
  idDetallePedido INT NOT NULL, 
  idPedido INT NOT NULL,
  idProducto INT NOT NULL,
  precio_unitario DOUBLE NOT NULL,
  cantidad INT NOT NULL,

  PRIMARY KEY (idDetallesComprobanteDeVenta),
  FOREIGN KEY (idComprobanteDeVenta) REFERENCES ComprobanteDeVenta(idComprobanteDeVenta),
  FOREIGN KEY (idDetallePedido) REFERENCES DetallePedido (idDetallePedido),
  FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido),
  FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
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


-- Tabla DevolucionCambio
CREATE TABLE DevolucionCambio (
  idDevolucionCambio INT AUTO_INCREMENT NOT NULL,
  motivo VARCHAR(255) NOT NULL, 
  tipo_solicitud VARCHAR(200) NOT NULL, 
  estado_solicitud VARCHAR(45) NOT NULL,
  fecha_solicitud VARCHAR(40) NOT NULL,
  fecha_respuesta VARCHAR(45) NULL, 
  idUsuario INT NOT NULL,

  PRIMARY KEY (idDevolucionCambio),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
) ;





								-- DML: Insert - Insertar registros de las tablas:
-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE USUARIOS
-- -----------------------------------------------------

-- Tabla tipoDocumento
INSERT INTO tipoDocumento (nombreTipoDeDocumento)
VALUES
("Cédula de Ciudadanía"),
("Cédula de Extranjería"),
("Permiso Especial de Permanencia");

-- Tabla rol
INSERT INTO rol (nombreRol)
VALUES
("administrador"),
("cliente");

-- Tabla estado_usuario
INSERT INTO estado_usuario (nombre)
VALUES 
("Activo"),
("Inactivo");

-- Tabla Usuario 
INSERT INTO Usuario 
(numeroDocumento, nombreUsuario, primerApellido, segundoApellido,contraseña, 
 correoElectronico, idRol, idtipoDocumento, idestado_usuario) 
VALUES
(103347235,"Katherin","Morcillo","Quiroga","Contraseña12345","katherinquiroga@gmail.com",2,1,1),
(159350145,"Jhonatan","Carvajal","Bonilla","soyAdmi123","Jhonatan_Bonilla@gmail.com",2,1,1),
(103353635,"Daniela","Bohorquez","Diaz","Lorena456","DanielaBoDiaz@gmail.com",2,1,1),
(10000001, "carlos", "Martínez", "López", "pass123", "carlosm@gmail.com", 1, 1, 1),
(10000002, "laura", "Gómez", "Ramírez", "laura456", "laurag@gmail.com", 1, 1, 1),
(10000003, "andres", "Rodríguez", "Torres", "andres789", "andresr@gmail.com", 1, 1, 1),
(10000004, "julian", "Pérez", "García", "julian321", "julianp@gmail.com", 1, 2, 2),
(10000005, "maria", "Castaño", "Londoño", "maria654", "mariac@gmail.com", 1, 1, 1),
(10000006, "diego", "Alvarez", "Peña", "diego000", "diegoa@gmail.com", 1, 3, 1),
(10000007, "paula", "Ríos", "Moreno", "paula321", "paular@gmail.com", 1, 2, 2),
(10000008, "sebastian", "González", "Martínez", "sebas888", "sebastiang@gmail.com", 1, 1, 1),
(10000009, "camila", "Ruiz", "Sánchez", "camila777", "camilar@gmail.com", 1, 1, 1),
(10000010, "diana", "Morales", "Sanchez", "diana111", "dianam@gmail.com", 1, 3, 1);

-- Tabla Localidad
INSERT INTO Localidad (nombre)
VALUES 
("Usaquén"),
("Chapinero"),
("Santa Fe"),
("San Cristóbal"),
("Usme"),
("Tunjuelito"),
("Bosa"),
("Kennedy"),
("Fontibón"),
("Engativá"),
("Suba"),
("Barrios Unidos"),
("Teusaquillo"),
("Los Mártires"),
("Antonio Nariño"),
("Puente Aranda"),
("La Candelaria"),
("Rafael Uribe Uribe"),
("Ciudad Bolívar"),
("Sumapaz");

-- Tabla Barrio
INSERT INTO Barrio (nombre, idLocalidad)
VALUES
("CANAIMA", 1),
("LA FLORESTA DE LA SABANA", 1),
("TORCA 1", 1),
("TORCA 2", 1),
("TORCA RURAL 1", 1),
("TORCA RURAL 2", 1),
("ALTO DE SERREZUELA", 1),
("BALCONES DE VISTA HERMOSA", 1),
("BALMORAL NORTE", 1),
("BUENAVISTA", 1),
("CHAPARRAL", 1),
("EL CODITO", 1),
("EL REFUGIO DE SAN ANTONIO", 1),
("EL VERBENAL", 1),
("HORIZONTES", 1),
("LA ESTRELLITA", 1),
("LA FRONTERA", 1),
("LA LLANURITA", 1),
("LOS CONSUELOS", 1),
("MARANTA", 1),
("MATURIN", 1),
("MEDELLIN", 1),
("MIRADOR DEL NORTE", 1),
("NUEVO HORIZONTE", 1),
("SAN ANTONIO NORTE", 1),
("SANTA FELISA", 1),
("SANTANDERSITO", 1),
("TIBABITA", 1),
("VIÑA DEL MAR", 1),
("BOSQUE DE SAN ANTONIO", 1),
("CONJUNTO CAMINO DEL PALMAR", 1),
("EL PITE", 1),
("EL REDIL", 1),
("LA CITA", 1),
("LA GRANJA NORTE", 1),
("LA URIBE", 1),
("LOS NARANJOS", 1),
("SAN JUAN BOSCO", 1),
("URBANIZACION LOS LAURELES", 1),
("AINSUCA", 1),
("ALTABLANCA", 1),
("BARRANCAS", 1),
("CALIFORNIA", 1),
("CERRO NORTE", 1),
("DANUBIO", 1),
("DON BOSCO", 1),
("LA PERLA ORIENTAL", 1),
("LAS ARENERAS", 1),
("MILAN (BARRANCAS)", 1),
("SAN CRISTOBAL NORTE", 1),
("SANTA CECILIA NORTE PARTE ALTA", 1),
("SANTA CECILIA PARTE BAJA", 1),
("SANTA TERESA", 1),
("SORATAMA", 1),
("TORCOROMA", 1),
("VILLA NYDIA", 1),
("VILLA OLIVA", 1),
("EL TOBERIN", 1),
("BABILONIA", 1),
("DARDANELOS", 1),
("ESTRELLA DEL NORTE", 1),
("GUANOA", 1),
("JARDIN NORTE", 1),
("LA LIBERIA", 1),
("LA PRADERA NORTE", 1),
("LAS ORQUIDEAS", 1),
("PANTANITOS", 1),
("SANTA MONICA", 1),
("VILLA MAGDALA", 1),
("VILLAS DE ARANJUEZ", 1),
("VILLAS DEL MEDITERRANEO", 1),
("ZARAGOZA", 1),
("ACACIAS", 1),
("ANTIGUA", 1),
("BELMIRA", 1),
("BOSQUE DE PINOS", 1),
("CAOBOS SALAZAR", 1),
("CAPRI", 1),
("CEDRITOS", 1),
("CEDRO BOLIVAR", 1),
("CEDRO GOLF", 1),
("CEDRO MADEIRA", 1),
("CEDRO NARVAEZ", 1),
("CEDRO SALAZAR", 1),
("EL CONTADOR", 1),
("EL RINCON DE LAS MARGARITAS", 1),
("LA SONORA", 1),
("LAS MARGARITAS", 1),
("LISBOA", 1),
("LOS CEDROS", 1),
("LOS CEDROS ORIENTALES", 1),
("MONTEARROYO", 1),
("NUEVA AUTOPISTA", 1),
("NUEVO COUNTRY", 1),
("SIERRAS DEL MORAL", 1),
("BELLA SUIZA", 1),
("BELLAVISTA", 1),
("BOSQUE MEDINA", 1),
("EL PAÑUELITO", 1),
("EL PEDREGAL", 1),
("ESCUELA DE CABALLERÍA", 1),
("ESCUELA DE INFANTERÍA", 1),
("FRANCISCO MIRANDA", 1),
("GINEBRA", 1),
("LA ESPERANZA", 1),
("LA GLORIETA", 1),
("LAS DELICIAS DEL CARMEN", 1),
("SAGRADO CORAZÓN", 1),
("SAN GABRIEL", 1),
("SANTA ANA", 1),
("SANTA ANA OCCIDENTAL", 1),
("SANTA BÁRBARA", 1),
("SANTA BÁRBARA ALTA", 1),
("SANTA BÁRBARA ORIENTAL", 1),
("UNICERROS", 1),
("USAQUÉN", 1),
("COUNTRY CLUB", 1),
("LA CALLEJA", 1),
("LA CAROLINA", 1),
("LA CRISTALINA", 1),
("PRADOS DEL COUNTRY", 1),
("RECODO DEL COUNTRY", 1),
("SANTA COLOMA", 1),
("SOATAMA", 1),
("TOLEDO", 1),
("TORRES DEL COUNTRY", 1),
("VERGEL DEL COUNTRY", 1),
("CAMPO ALEGRE", 1),
("MOLINOS DEL NORTE", 1),
("MULTICENTRO", 1),
("NAVARRA", 1),
("RINCÓN DEL CHICÓ", 1),
("SAN PATRICIO", 1),
("SANTA BÁRBARA CENTRAL", 1),
("SANTA BÁRBARA OCCIDENTAL", 1),
("SANTA BIBIANA", 1),
("SANTA PAULA", 1),
("CHICO RESERVADO", 2),
("BELLAVISTA", 2),
("CHICO ALTO", 2),
("EL NOGAL", 2),
("EL REFUGIO", 2),
("LA CABRERA", 2),
("LOS ROSALES", 2),
("SEMINARIO", 2),
("TOSCANA", 2),
("LA ESPERANZA NORORIENTAL", 2),
("LA SUREÑA", 2),
("SAN ISIDRO", 2),
("SAN LUIS ALTOS DEL CABO", 2),
("BOSQUE CALDERÓN", 2),
("BOSQUE CALDERÓN TEJADA", 2),
("CHAPINERO ALTO", 2),
("EL CASTILLO", 2),
("EL PARAISO", 2),
("EMAUS", 2),
("GRANADA", 2),
("INGEMAR", 2),
("JUAN XXIII", 2),
("LA SALLE", 2),
("LAS ACACIAS", 2),
("LOS OLIVOS", 2),
("MARIA CRISTINA", 2),
("MARISCAL SUCRE", 2),
("NUEVA GRANADA", 2),
("EL PALOMAR", 2),
("PARDO RUBIO", 2),
("SAN MARTIN DE PORRES", 2),
("VILLA ANITA", 2),
("VILLA DEL CERRO", 2),
("ANTIGUO COUNTRY", 2),
("CHICO NORTE", 2),
("CHICO NORTE II", 2),
("CHICO NORTE III", 2),
("CHICO OCCIDENTAL", 2),
("EL CHICO", 2),
("EL RETIRO", 2),
("ESPARTILLAL", 2),
("LAGO GAITAN", 2),
("LA PORCIUNCULA", 2),
("QUINTA CAMACHO", 2),
("CATALUÑA", 2),
("CHAPINERO CENTRAL", 2),
("CHAPINERO NORTE", 2),
("MARLY", 2),
("SUCRE", 2),
("LA MERCED", 3),
("PARQUE CENTRAL BAVARIA", 3),
("SAGRADO CORAZON", 3),
("SAN DIEGO", 3),
("SAN MARTIN", 3),
("TORRES DEL PARQUE", 3),
("BOSQUE IZQUIERDO", 3),
("GERMANIA", 3),
("LA MACARENA", 3),
("LA PAZ CENTRO", 3),
("LA PERSEVERANCIA", 3),
("LA ALAMEDA", 3),
("LA CAPUCHINA", 3),
("LA VERACRUZ", 3),
("LAS NIEVES", 3),
("SANTA INES", 3),
("LAS CRUCES", 3),
("SAN BERNARDO", 3),
("ATANASIO GIRADOT", 3),
("CARTAGENA", 3),
("EGIPTO", 3),
("EGIPTO ALTO", 3),
("EL BALCON", 3),
("EL CONSUELO", 3),
("EL DORADO", 3),
("EL GUAVIO", 3),
("EL MIRADOR", 3),
("EL ROCIO", 3),
("EL TRIUNFO", 3),
("FABRICA DE LOZA", 3),
("GRAN COLOMBIA", 3),
("LA PEÑA", 3),
("LOS LACHES", 3),
("LOURDES", 3),
("RAMIREZ", 3),
("SAN DIONISIO", 3),
("SANTA ROSA DE LIMA", 3),
("VITELMA", 3),
("AGUAS CLARAS", 4),
("SAN LUIS", 4),
("ALTOS DEL ZIPA", 4),
("SUR AMERICA", 4),
("AMAPOLAS", 4),
("VILLA DE LOS ALPES", 4),
("AMAPOLAS II", 4),
("VILLA DE LOS ALPES I", 4),
("BALCON DE LA CASTAÑA", 4),
("VILLA NATALY 20 DE JULIO", 4),
("BELLA VISTA SECTOR LUCERO", 4),
("BELLAVISTA PARTE BAJA", 4),
("ALTAMIRA", 4),
("BELLAVISTA SUR", 4),
("ALTAMIRA CHIQUITA", 4),
("BOSQUE DE LOS ALPES", 4),
("ALTOS DEL POBLADO", 4),
("BUENAVISTA SURORIENTAL", 4),
("ALTOS DEL VIRREY", 4),
("CAMINO VIEJO SAN CRISTOBAL", 4),
("ALTOS DEL ZUQUE", 4),
("CERROS DE SAN VICENTE", 4),
("BELLAVISTA PARTE ALTA", 4),
("CIUDAD DE LONDRES", 4),
("BELLAVISTA SUR ORIENTAL", 4),
("CORINTO", 4),
("BUENOS AIRES", 4),
("EL BALCON DE LA CASTAÑA", 4),
("CIUDADELA SANTA ROSA", 4),
("EL FUTURO", 4),
("EL QUINDIO", 4),
("EL RAMAJAL", 4),
("EL RECODO-REPUBLICA DE CANADA", 4),
("EL RAMAJAL (SAN PEDRO)", 4),
("EL RODEO", 4),
("GRAN COLOMBIA (MOLINOS DE ORIENTE)", 4),
("LA COLMENA", 4),
("HORACIO ORJUELA", 4),
("LA GLORIA", 4),
("LA CASTAÑA", 4),
("LA GLORIA BAJA", 4),
("LA CECILIA", 4),
("LA GLORIA MZ 11", 4),
("LA GRAN COLOMBIA", 4),
("LA GLORIA OCCIDENTAL", 4),
("LA HERRADURA", 4),
("LA GLORIA ORIENTAL", 4),
("LA JOYITA CENTRO (BELLO HORIZONTE)", 4),
("LA GLORIA SAN MIGUEL", 4),
("LA PLAYA", 4),
("LA GROVANA", 4),
("LA ROCA", 4),
("LA VICTORIA", 4),
("LA SAGRADA FAMILIA", 4),
("LA VICTORIA II SECTOR", 4),
("LAS ACACIAS", 4),
("LA VICTORIA III SECTOR", 4),
("LAS MERCEDES", 4),
("LAS GAVIOTAS", 4),
("LAURELES SUR ORIENTAL II SECTOR", 4),
("LAS GUACAMAYAS", 4),
("LOS ALPES", 4),
("LAS GUACAMAYAS I, II Y III", 4),
("LOS ALPES FUTURO", 4),
("LAS LOMAS", 4),
("LOS ARRAYANES SECTOR SANTA INES", 4),
("LOS PUENTES", 4),
("LOS LAURELES SUR ORIENTAL I SEC.", 4),
("MALVINAS", 4),
("MACARENA LOS ALPES", 4),
("MIRAFLORES", 4),
("MANANTIAL", 4),
("MORALVA", 4),
("MANILA", 4),
("PANORAMA (ANTES ALTAMIRA)", 4),
("PASEITO III", 4),
("MOLINOS DE ORIENTE", 4),
("PUENTE COLORADO", 4),
("MONTECARLO", 4),
("QUINDIO", 4),
("NUEVA ESPAÑA", 4),
("QUINDIO I Y II", 4),
("NUEVA ESPAÑA PARTE ALTA", 4),
("QUINDIO II", 4),
("RAMAJAL", 4),
("SAN JOSE", 4),
("RINCON DE LA VICTRIA-B/VISTA", 4),
("SAN JOSE ORIENTAL", 4),
("SAGRADA FAMILIA", 4),
("SAN JOSE SUR ORIENTAL", 4),
("SAN BLAS", 4),
("SAN MARTIN DE LOBA I Y II", 4),
("SAN BLAS (PARCELAS)", 4),
("SAN MARTIN SUR", 4),
("SAN BLAS II SECTOR", 4),
("SAN CRISTOBAL ALTO", 4),
("ANTIOQUIA", 4),
("SAN CRISTOBAL VIEJO", 4),
("CANADA LA GUIRA", 4),
("SAN PEDRO", 4),
("CANADA LA GUIRA II SECTOR", 4),
("SAN VICENTE", 4),
("CANADA-SAN LUIS", 4),
("SAN VICENTE ALTO", 4),
("CHIGUAZA", 4),
("SAN VICENTE BAJO", 4),
("SAN VICENTE SUR ORIENTE", 4),
("EL PARAISO", 4),
("SANTA INES", 4),
("EL PINAR O REP. DEL CANADA II S.", 4),
("SANTA INES SUR", 4),
("EL TRIUNFO", 4),
("TERRAZAS DE ORIENTE", 4),
("JUAN REY (LA PAZ)", 4),
("TRIANGULO", 4),
("LA BELLEZA", 4),
("TRIANGULO ALTO", 4),
("LA NUEVA GLORIA", 4),
("TRIANGULO BAJO", 4),
("LA NUEVA GLORIA II SECTOR", 4),
("VEREDA ALTOS DE SAN BLAS", 4),
("LA PENINSULA", 4),
("VITELMA", 4),
("LA SIERRA", 4),
("LAS GAVIOTAS*", 4),
("GOLCONDA", 4),
("LOS LIBERTADORES", 4),
("PRIMERO DE MAYO", 4),
("LOS LIBERTADORES S. EL TESORO", 4),
("LOS LIBERTADORES S. LA COLINA", 4),
("CALVO SUR", 4),
("LOS LIBERTADORES S.SAN IGNACIO", 4),
("CAMINO VIEJO DE SAN CRISTOBAL", 4),
("LOS LIBERTADORES S.SAN ISIDRO", 4),
("LA MARIA", 4),
("LOS LIBERTADORES S.SAN JOSE", 4),
("LAS BRISAS", 4),
("LOS LIBERTADORES S.SAN LUIS", 4),
("LOS DOS LEONES", 4),
("LOS LIBERTADORES S.SAN MIGUEL", 4),
("MODELO SUR", 4),
("LOS LIBERTADORES, BQUE DIAMANT, TRIANGULO", 4),
("NARIÑO SUR", 4),
("LOS PINARES", 4),
("QUINTA RAMOS", 4),
("LOS PINOS", 4),
("REP. DE VENEZUELA", 4),
("LOS PUENTES", 4),
("SAN CRISTOBAL SUR", 4),
("NUEVA DELLY", 4),
("SAN JAVIER", 4),
("NUEVA GLORIA", 4),
("SANTA ANA", 4),
("NUEVA ROMA", 4),
("SANTA ANA SUR", 4),
("NUEVAS MALVINAS O EL TRIUNFO", 4),
("SOSIEGO", 4),
("REPUBLICA DEL CANADA", 4),
("VELODROMO", 4),
("REPUBLICA DEL CANADA-EL PINAR", 4),
("VILLA ALBANIA", 4),
("SAN JACINTO", 4),
("VILLA JAVIER", 4),
("SAN MANUEL", 4),
("SAN RAFAEL SUR ORIENTAL", 4),
("ATENAS", 4),
("SAN RAFAEL USME", 4),
("20 DE JULIO", 4),
("SANTA RITA I, II Y III", 4),
("ATENAS I", 4),
("SANTA RITA SUR ORIENTAL", 4),
("AYACUCHO", 4),
("VALPARAISO", 4),
("BARCELONA", 4),
("VILLA ANGELICA CANADA LA GUIRA", 4),
("BARCELONA SUR", 4),
("VILLA AURORA", 4),
("BARCELONA SUR ORIENTAL", 4),
("VILLA DEL CERRO", 4),
("BELLO HORIZONTE", 4),
("VILLABELL", 4),
("BELLO HORIZONTE III SECTOR", 4),
("YOMASA", 4),
("CORDOBA", 4),
("VILLA ANGELICA", 4),
("EL ANGULO", 4),
("EL PARAISO SUR ORIENTAL I SEC.", 4),
("EL ENCANTO", 4),
("JUAN REY I Y II", 4),
("GRANADA SUR", 4),
("VILLA BEGONIA", 4),
("GRANADA SUR III SECTOR", 4),
("LA JOYITA", 4),
("LA SERAFINA", 4),
("LAS LOMAS", 4),
("MANAGUA", 4),
("MONTEBELLO", 4),
("SAN ISIDRO", 4),
("SAN ISIDRO I Y II", 4),
("SAN ISIDRO SUR", 4),
("BUENOS AIRES",5),
("ALFONSO LOPEZ SECTOR CHARALA",5),
("COSTA RICA",5),
("ANTONIO JOSE DE SUCRE",5),
("DOÑA LILIANA",5),
("ANTONIO JOSE DE SUCRE I",5),
("EL BOSQUE KM. 11",5),
(" ANTONIO JOSE DE SUCRE II",5),
("JUAN JOSE RONDON",5),
("ANTONIO JOSE DE SUCRE III",5),
("JUAN JOSE RONDON II SECTOR",5),
("BELLAVISTA ALTA",5),
("JUAN REY SUR",5),
("BELLAVISTA II SECTOR",5),
("LA CABAÑA",5),
("BOSQUE EL LIMONAR",5),
("LA ESPERANZA",5),
("BOSQUE EL LIMONAR II SECTOR",5),
("LA FLORA PARCELACION SAN PEDRO",5),
("BRAZUELOS",5),
("LAS VIOLETAS",5),
("BRAZUELOS OCCIDENTAL*",5),
("LOS ARRAYANES",5),
("BRAZUELOS SECTOR EL PARAISO",5),
("LOS SOCHES",5),
("BRAZUELOS SECTOR LA ESMERALDA",5),
("PARCELACION SAN PEDRO",5),
("CENTRO EDUCATIVO SAN JOSE",5),
("TIHUAQUE",5),
("CHAPINERITO",5),
("UNION",5),
("CHICO SUR",5),
("VILLA DIANA",5),
("CHICO SUR II SECTOR",5),
("VILLA ROSITA",5),
("CIUDADELA CANTA RANA I, II, III SECTOR",5),
("COMUNEROS",5),
("EL BRILLANTE  ",5),
("ALASKA",5),
("EL ESPINO",5),
("ARRAYANES",5),
("EL MORTIÑO",5),
("DANUBIO AZUL",5),
("EL RUBI",5),
("DAZA SECTOR II",5),
(" EL TUNO",5),
("DUITAMA",5),
("EL UVAL",5),
("EL PORVENIR",5),
("EL VIRREY ULTIMA ETAPA",5),
("EL PORVENIR II SECTOR",5),
("FINCA LA ESPERANZA",5),
("FISCALA II LA FORTUNA",5),
("LA ESMERALDA EL RECUERDO",5),
("FISCALA SECTOR CENTRO",5),
("LA ESPERANZA KM. 10",5),
("LA FISCALA LOS TRES LAURELES",5),
("LAS BRISAS",5),
("LA FISCALA LOTE 16",5),
("LAS FLORES",5),
("LA FISCALA LOTE 16A",5),
("LAS MERCEDES",5),
("LA FISCALA SECTOR CENTRO",5),
("LORENZO ALCANTUZ I SECTOR",5),
("LA FISCALA SECTOR DAZA",5),
("LORENZO ALCANTUZ II SECTOR",5),
("LA FISCALA SECTOR NORTE",5),
("LOS ALTOS DEL BRAZUELO",5),
("LA FISCALA SECTOR RODRIGUEZ",5),
("MARICHUELA III SECTOR (CAFAM II S.)",5),
(" LA MORENA I",5),
(" MONTEBLANCO",5),
("LA MORENA II",5),
("MONTEVIDEO",5),
("LA MORENA II (SECTOR VILLA SANDRA)",5),
("NUEVO SAN LUIS",5),
("MORENA II SECTOR VILLA SANDRA",5),
("SAN JOAQUIN EL UVAL",5),
("NUEVA ESPERANZA",5),
("SECTOR GRANJAS DE SAN PEDRO",5),
("SAN MARTIN",5),
("TENERIFE",5),
("VILLA NEIZA",5),
("TENERIFE II SECTOR",5),
("PICOTA SUR  ",5),
("URBANIZACION CHUNIZA I  ",5),
("PORVENIR",5),
("URBANIZACION JARON MONTE RUBIO",5),
("URBANIZACION LIBANO URBANIZACION MARICHUELA",5),
("",5),
("ALMIRANTE PADILLA",5),
("USMINIA",5),
("ALTOS DEL PINO",5),
("VILLA ALEMANIA",5),
("ARIZONA",5),
("VILLA ALEMANIA II SECTOR",5),
("BARRANQUILLITA",5),
("VILLA ANITA SUR",5),
("BENJAMIN URIBE",5),
("VILLA ISRAEL",5),
("BETANIA",5),
("VILLA ISRAEL II",5),
("BETANIA II",5),
("BOLONIA*",5),
("BULEVAR DEL SUR",5),
("CASA LOMA II",5),
("CASA REY",5),
("ALFONSO LOPEZ SECTOR BUENOS AIRES",5),
("CASALOMA",5),
("ALFONSO LOPEZ SECTOR CHARALA",5),
(" COMPOSTELA I",5),
("ALFONSO LOPEZ SECTOR EL PROGRESO",5),
("COMPOSTELA II",5),
("BRISAS DEL LLANO",5),
("COMPOSTELA III",5),
("EL NUEVO PORTAL",5),
("EL BOSQUE",5),
("EL PARAISO",5),
("EL CORTIJO",5),
("EL PORTAL DEL DIVINO",5),
("EL CURUBO  ",5),
("EL PORTAL II ETAPA",5),
("EL JORDAN",5),
("EL PROGRESO USME",5),
(" EL NEVADO",5),
(" EL REFUGIO I Y II  ",5),
("EL PEDREGAL",5),
("EL TRIANGULO",5),
("EL RECUERDO SUR",5),
("EL UVAL",5),
("EL REFUGIO",5),
("EL UVAL II SECTOR",5),
("EL REFUGIO SECTOR SANTA LIBRADA",5),
("LA HUERTA",5),
("EL ROSAL-MIRADOR",5),
("LA ORQUIDEA USME",5),
("EL RUBI II SECTOR",5),
("LA REFORMA  ",5),
("GRAN YOMASA I  ",5),
("NUEVO PORVENIR  ",5),
("GRAN YOMASA II SECTOR",5),
("NUEVO PROGRESO-EL PROGRESO II SECTOR",5),
("LA ANDREA",5),
("PORTAL DE LA VEGA",5),
("LA AURORA",5),
("PORTAL DE ORIENTE",5),
("LA CABAÑA",5),
("PORTAL DEL DIVINO",5),
("LA ESPERANZA",5),
("PUERTA AL LLANO",5),
("LA FORTALEZA",5),
("PUERTA AL LLANO II",5),
("LA REGADERA KM. 11",5),
("REFUGIO I",5),
(" LA REGADERA SUR",5),
("VILLA HERMOSA",5),
("“LAS GRANJAS DE SAN PEDRO (SANTA LIBRADA) “",5),
("LAS VIVIENDAS",5),
("LOS TEJARES SUR II SECTOR 1 NUEVO SAN ANDRES DE LOS ALTOS",5),
("OLIVARES",5),
("ARRAYANES",5),
("SALAZAR",5),
("BOLONIA",5),
("SAN ANDRES ALTO",5),
(" EL BOSQUE CENTRAL",5),
("SAN FELIPE",5),
("EL NUEVO PORTAL II",5),
("SAN ISIDRO SUR",5),
(" EL REFUGIO I",5),
(" SAN JUAN BAUTISTA",5),
("LA ESPERANZA SUR",5),
("SAN JUAN I SECTOR",5),
("LOS OLIVARES",5),
("SAN JUAN II SECTOR",5),
("PEPINITOS",5),
("SAN JUAN II Y III SECTOR",5),
("TOCAIMITA ORIENTAL",5),
("SAN LIBRADA LOS TEJARES",5),
("TOCAIMITA SUR",5),
("SAN LUIS",5),
("SAN PABLO SANTA LIBRADA",5),
("CIUDADELA EL OASIS",5),
("SANTA LIBRADA LA ESPERANZA",5),
("BRISAS DEL LLANO",5),
("SANTA LIBRADA LA SUREÑA",5),
("CENTRO USME",5),
("SANTA LIBRADA LOS TEJARES (GRAN YOMASA)",5),
("EL BOSQUE KM 11",5),
("SANTA LIBRADA NORTE",5),
("EL OASIS",5),
("SANTA LIBRADA S. SAN BERNARDINO",5),
("EL PEDREGAL LA LIRA",5),
("SANTA LIBRADA S. SAN FRANCISCO",5),
("EL SALTEADOR",5),
("SANTA LIBRADA SALAZAR SALAZAR",5),
("LA MARIA",5),
("SANTA LIBRADA SECTOR LA PEÑA",5),
("SANTA MARTA II SECTOR",5),
("SANTA MARTHA",5),
("SANTA MARTHA II",5),
("SIERRA MORENA  ",5),
("TENERIFE II SECTOR",5),
("URB. COSTA RICA BARRIO SAN ANDRES DE LOS ALTOS",5),
("URBANIZACION BRASILIA II SECTOR",5),
("URBANIZACION BRASILIA SUR",5),
("URBANIZACION CARTAGENA",5),
("URBANIZACION LA ANDREA",5),
("URBANIZACION LA AURORA II ETAPA",5),
("URBANIZACION MIRAVALLE",5),
("URBANIZACION TEQUENDAMA",5),
("VIANEY",5),
("VILLA ALEJANDRIA",5),
("VILLA NELLY",5),
("VILLAS DE SANTA ISABEL-P.ENTRE NUBES",5),
("VILLAS DEL EDEN",5),
("YOMASITA",5),
("CONDADO DE SANTA LUCIA",6),
("CONJUNTO RESIDENCIAL NUEVO MUZU",6),
(" EL CARMEN",6),
("ESCUELA DE POLICIA GENERAL SANTANDER",6),
("FATIMA",6),
("ISLA DEL SOL",6),
("LAGUNETA",6),
("NUEVO MUZU",6),
("ONTARIO",6),
("PARQUE METROPOLITANO EL TUNAL",6),
("PARQUE REAL I,II",6),
("RINCON DE MUZU",6),
("RINCON DE NUEVO MUZU",6),
(" RINCON DE VENECIA",6),
("SAMORE",6),
("SAN VICENTE",6),
("SAN VICENTE DE FERRER",6),
(" SANTA LUCIA",6),
("TEJAR DE ONTARIO",6),
("CIUDAD TUNAL",6),
("VENECIA",6),
("VENECIA OCCIDENTAL",6),
("VILLA XIMENA",6),
("TUNJUELITO ABRAHAM LINCON",6),
("SAN BENITO",6),
("SAN CARLOS",6),
("TUNALITO",6),
("TUNJUELITO",6),

("JARDINES DEL APOGEO ",7),	
("SAN BERNARDINO ",7),	
("PRIMAVERA SUR ",7),	
("EL MOTORISTA ",7),	
("SAN BERNARDINO SECTOR II ",7),
("PROVIDENCIA ",7),	
("INDUSTRIAL ",7),	
("SAN BERNARDINO SECTOR PROTRERITO ",7),	
("SAN EUGENIO ",7),	
("LA ILUSION ",7),	
("SAN BERNARDINO SECTOR VILLA EMMA ",7),	
("SAN EUGENIO II ",7),	
("NUEVO CHILE ",7),	
("SAN DIEGO LA PAZ IV SECTOR ",7),	
("SAN JOSÉ LOS NARANJOS ",7),	
("OLARTE ",7),	
("SAN FERNANDO N.S. DE LA PAZ ",7),	
("SAN JUDAS (B.LA ESTACION) ",7),	
("VILLAS DEL RIO ",7),	
("SAN JAVIER ",7),
("SAN PABLO I SECTOR ",7),	
("SAN JOAQUIN ",7),	
("SAN PABLO II SECTOR ",7),	
("SAN JORGE ",7),	
("SAN PEDRO ",7),	
("AMARUC ",7),	
("SAN JORGE II ",7),	
("SANTA LUCIA ",7),	
("BERLIN ",7),
("SAN JUANITO ",7),	
("SUB STA LUCIA ",7),	
("BERLIN DE BOSA LA LIBERTAD III ",7),	
("SAN LUIS ",7),	
("SUB TRIANGULO LAS MATERAS ",7),
("BETANIA ",7),	
("SAN LUIS II ",7),	
("SUB URB. CLARETIANA ",7),	
("BOSA NOVA ",7),	
("SAN MARTIN ",7),
("TIERRA GRATIS ",7),	
("BOSA NOVA II SECTOR ",7),	
("SAN PEDRO ",7),	
("URB ACUARELA I Y II 2 BOSALINDA (HILDEBRANDO OLARTE)",7),	
("SAN PEDRO II ",7),
("URB. TANQUE DE BOSA ",7),	
("BRASIL II SECTOR ",7),	
("SAN PEDRO II SECTOR A ",7),	
("VERD. SECTOR SAN JOSÉ ",7),	
("BRASIL II SEGUNDA ETAPA ",7),	
("SAN PEDRO SECTOR",7),
("VILLA ANAY",7),	
("BRASIL LOPEZ Y PIÑEROS",7),
("SANTA INES",7),
("VILLA ANNI(BOSA NARANJOS)",7),	
("BRASIL MATERAS ACACIAS S.JORGE",7),
("SAUCES II",7),	
("VILLA BOSA",7),	
("BRASIL SECTOR BARRETO",7),	
("SIRACUZA",7),	
("VILLA NOHORA",7),	
("BRASIL SECTOR PORTAL Y CASTILLO",7),	
("SIRACUZA II",7),	
("XOCHIMILCO",7),	
("BRASILIA 2° SECTOR",7),	
("TOKIO",7),	
("BRASILIA 3° SECTOR",7),	
("VEGAS DE SANTANA",7),	
("BRASILIA I SECTOR",7),	
("VEREDA EL PORVENIR SECTOR BRASIL",7),	
("CALDAS",7),	
("CAMPO HERMOSO",7),	
("VILLA CAROLINA",7),	
("ANTONIO NARIÑO",7),	
("CASA NUEVA",7),	
("VILLA CLEMENCIA",7),	
(" CAMPO HERMOSO",7),	
("CHICO SUR",7),	
("VILLA CLEMENCIA SECTOR TIERRA GRATA",7),	
("CAÑAVERALEJO",7),	
("CHIICALA",7),	
("VILLA COLOMBIA",7),	
("EL ANHELO",7),	
("CIUDADELA LA LIBERTAD II",7),	
("VILLA COLOMBIA II",7),	
("EL CORZO",7),	
("DANUBIO",7),	
("VILLA DE LOS COMUNEROS",7),	
("EL PORVENIR",7),	
("DANUBIO AZUL I",7),	
("VILLA DE SUAITA",7),	
("EL PORVENIR III",7),	
("DANUBIO II",7),	
("VILLA MAGDA",7),	
("EL PORVENIR PARCELA 23",7),	
("DANUBIO III",7),	
("VILLA MAGNOLIA",7),	
("EL PORVENIR SAN LUIS",7),	
("DIAMANTE SUR",7),	
("VILLA NATALIA",7),	
("EL PORVENIR SECTOR INDUCAS",7),	
("DIVINO NIÑO",7),	
("VILLA NOHORA",7),	
("EL RECUERDO",7),	
("EL BOSQUE DE BOSA",7),	
("VILLA NOHORA II",7),	
("EL RECUERDO DE SANTA FE",7),
("EL CAUCE",7),	
("VILLA NOHORA III",7),	
("EL REGALO",7),	
("EL DIAMANTE",7),
("VILLA SONIA I",7),	
("EL REGALO II",7),	
("EL JAZMIN SECTOR EL TRIANGULO",7),	
("VILLA SONIA II",7),	
("LA ARBOLEDA",7),	
("EL LIBERTADOR",7),	
("VILLAS DEL PROGRESO",7),	
("LA CABAÑA",7),	
("EL LIBERTADOR II",7),	
("VILLAS DEL VELERO",7),	
("LA GRANJITA",7),	
("EL PARADERO",7),	
("LA SUERTE",7),	
("EL PARAISO",7),	
("LA UNION",7),	
(" EL PORTAL DE LA LIBERTAD ",7),	
("ANDALUCIA ",7),	
(" LAS MARGARITAS ",7),	
(" EL PORTAL I y II SECTOR 2 ANDALUCIA II ",7),	
(" LOS CENTAUROS ",7),	
(" EL PORVENIR II SECTOR ",7),	
(" ANTONIA SANTOS ",7),	
(" OSORIO X ",7),	
(" EL PORVENIR III ",7),	
(" ARGELIA ",7),	
(" OSORIO XIII ",7),	
(" EL PORVENIR SECTOR BRASIL ",7),	
(" ARGELIA II ",7),	
(" PARCELA EL PORVENIR ",7),	
(" EL PROGRESO II SECTOR ",7),	
(" BOSA ",7),	
(" SAN BERNARDINO II ",7),	
(" EL RECUERDO 4 A ",7),	
(" BOSQUES DE MERYLAND ",7),	
(" SAN MIGUEL ",7),	
(" EL RECUERDO II ",7),	
(" BRASILIA LA ESTACION ",7),	
(" SAN PABLO ",7),	
(" EL RECUERDO SAN BERNARDINO ",7),	
(" CARLOS ALBAN HOLGUIN NUEVA GRANADA ",7),	
(" SANTA BARBARA ",7),	(" EL RINCON DE BOSA ",7),	
(" CARLOS ALBAN SECTOR ISRAELITA ",7),	
(" SANTA FE ",7),	
(" EL RODEO ",7),	
(" CARLOS ALBAN SECTOR MIRAFLORES ",7),	
(" SANTA FE I y II 2 EL RUBI ",7),	
(" CARLOS GALBÁN ",7),	
(" SANTA FE III SECTOR ",7),	
(" EL SAUCE ",7),	
(" CHARLES DE GAULLE ",7),	
(" SANTA ISABEL ",7),	
(" ESCOCIA IX ",7),	
(" CHARLES DE GAULLE II ",7),	
(" SANTAFE DE BOSA ",7),	
(" ESCOCIA V ",7),	
(" CLARETIANO ",7),	
(" URBANIZACION CALDAS ",7),	
(" ESCOCIA VI SECTORES I",7),	
(" III 3 EL JARDIN ",7),	
(" VILLA ALEGRE ",7),	
(" ESCOCIA VII ",7),	
(" EL JARDÍN SAN EUGENIO ",7),	
(" VILLA ALEGRIA ",7),	
(" FINCA LA ESPERANZA ",7),	
(" EL LIBERTADOR ",7),	
(" VILLA ESMERALDA ",7),	
(" HOLANDA ",7),	
(" EL LLANITO ",7),	
(" VILLA KAREN ",7),	
(" HOLANDA I SECTOR ",7),	
(" EL LLANO (SECTOR GUZMAN) ",7),	
(" HOLANDA II SECTOR ",7),	
(" EL LLANO MZ A ",7),	
(" HOLANDA III SECTOR ",7),	
(" EL LLANO SECTOR FANDINO ",7),	
(" SUR EL MATORRAL ",7),	
(" HOLANDA SECTOR CAMINITO ",7),	
(" EL PALMAR ",7),	
(" EL MATORRAL DE SAN BERNARDINO ",7),	
(" HORTELANOS DE ESCOCIA ",7),	
(" EL PORTAL DE BOSA ",7),	
(" EL TRIUNFO ",7),	
(" JORGE URIBE BOTERO ",7),
(" EL PORVENIR ",7),	
(" EL TRIUNFO DE SAN BERNARDINO ",7),	
(" LA CONCEPCION ",7),	
(" EL PROGRESO ",7),	
(" LA VEGA DE SAN BERNARDINO BAJO ",7),	
(" LA CONCEPCION II SECTOR ",7),	
(" EL RETAZO ",7),	
(" POTRERITOS ",7),	
(" LA DULCINEA ",7),	
(" EL TOCHE ",7),	
(" SAN BERNARDINO SECTOR POTRERITO ",7),	
(" LA ESMERALDA ",7),	
(" EL TRIANGULO SECTOR MATERAS ",7),	
(" SAN BERNARDINO XIX ",7),	
(" LA ESPERANZA I ",7),	
(" GETSEMANI ",7),	
(" SAN BERNARDINO XVI ",7),	
(" LA ESPERANZA II SECTOR ",7),	
(" GRANCOLOMBIANO I ",7),	
(" SAN BERNARDINO XVII ",7),	
(" LA ESTANZUELA ",7),	
(" GRANCOLOMBIANO II LAURES MZ L3",7),	
(" SAN BERNARDINO XVIII ",7),	
(" LA ESTANZUELA II ",7),	
(" GRANCOLOMBIANO II SECTOR ",7),	
(" SAN BERNARDINO XXII ",7),	
(" LA FLORIDA IV SECTOR ",7),	
(" GUALOCHE ",7),	
(" SAN BERNARDINO XXV ",7),	
(" LA FONTANA DE BOSA LA LIBERTAD ",7),	
(" HERMANOS BARRAGAN ",7),	
(" LA FONTANA I Y II ",7),	
(" HUMBERTO VALENCIA ",7),	
(" LA INDEPENDENCIA ",7),	
(" HUMBERTO VALENCIA II 2 LA INDEPENDENCIA ",7),	
(" ISLANDIA ",7),	
(" LA INDEPENDENCIA II SECTOR ",7),	
(" ISLANDIA II ",7),	
(" LA LIBERTAD ",7),	
(" ISLANDIA III ",7),	
(" LA LIBERTAD II ",7),	
(" ISLANDIA IV ",7),	
(" LA LIBERTAD III ",7),	
(" ISRAELITA ",7),	
(" LA LIBERTAD IV ",7),	
(" JIMENEZ DE QUESADA ",7),	
(" LA LIBERTAD SECTOR MAGNOLIA ",7),	
(" JIMENEZ DE QUESADA II SECTOR ",7),	
(" LA MAGNOLIA II ",7),	
(" JOSE ANTONIO GALAN ",7),	
(" LA MARIA ",7),	
(" JOSE MARIA CARBONEL I Y II SECTOR 2 LA PALMA ",7),	
(" LA AMISTAD ",7),	
(" LA PAZ ",7),	
(" LA AURORA ",7),	
(" LA PAZ II SECTOR ",7),	
(" LA AZUCENA ",7),	
(" LA PAZ III ",7),	
(" LA AZUCENA MZ.A ",7),	
(" LA PAZ SAN IGNACIO LAS VEGAS ",7),
(" LA AZUCENA MZ.B ",7),	
(" LA PAZ SAN IGNACIO SEC LA ESPERANZA ",7),	
(" LA AZUCENA SECTOR EL TRIANGULO ",7),	
(" LA PORTADA ",7),	
(" LA CRUZ DE TERREROS ",7),	
(" LA PORTADA II ",7),	
(" LA ELE II SECTOR LOS LAURELES ",7),	
(" LA PORTADA III SECTOR ",7),	
(" LA ESMERALDA ",7),	
(" LA PORTADITA ",7),	
(" LA ESPERANZA DE TIBANICA ",7),	
(" LA VEGUITA ",7),	
(" LA ESTACION ",7),	
(" LA VEGUITA II ",7),	
(" LA ESTACION ARENERAS ",7),	
(" LA VEGUITA IV SECTOR ",7),	
(" LA ESTACION DISTRITAL FCA RAIZ ",7),
(" LAS MARGARITAS III ",7),	
(" LA PALESTINA I ",7),	
(" LAS MARGARITAS SECT I y II 2 LA PRIMAVERA ",7),	
(" LAS VEGAS ",7),	
(" LA RIVIERA II ",7),	
(" LOS HEROES ",7),	
(" LA SULTANA ",7),	
(" LOS OCALES ",7),	
(" LAS MARGARITAS ",7),	
(" LOS SAUCES ",7),	
(" LAS SOLTANAS ",7),	
(" LOS SAUCES SECTOR CEDRO ",7),	
(" LAURELES III ",7),	
(" MIAMI ",7),	
(" LAURELES LA ESTACION ",7),	
(" NEW JERSEY ",7),	
(" LLANO ORIENTAL ",7),	
(" NTA SRA DE LA PAZ - LA ESPERANZA ",7),	
(" LLANOS DE BOSA ",7),	
(" NTRA. SEÑORA DE LA PAZ IV SEC. ",7),	
(" MANZANARES ",7),	
(" NTRA.SRA. DE LA PAZA VILLA ESMERALDA ",7),	
(" MIRAFLORES II SECTOR ",7),	
(" NUESTRA SEÑORA DE LA PAZ y OTROS ",7),	
(" MITRANI ",7),	
(" NUEVA ESCOCIA ",7),	
(" NARANJOS EL RETAZO ",7),	
(" NUEVA ESPERANZA ",7),	
(" NICOLAS ESCOBAR ",7),	
(" PORVENIR LA CONCEPCION ",7),	
(" NUEVA GRANADA ",7),	
(" PORVENIR PAR.33 ",7),	
(" NUEVA GRANADA II SEC.(Tiboli) ",7),	
(" PORVENIR PARC.",7),			
(" NUEVA GRANADA II SECTOR ",7),	
(" POTRERITOS ",7),	
(" NUEVA GRANADA V SECTOR ",7),	
(" SAN ANTONIO ",7),	
(" PABLO VI ",7),	
(" SAN ANTONIO DE BOSA ",7),	
(" PALESTINA ",7),	
(" SAN ANTONIO DE ESCOCIA ",7),	
(" PASO ANCHO ",7),	
(" SAN ANTONIO DE ESCOCIA II ",7),	
(" PIAMONTE I ETAPA",7);

-- Tabla TipoVia
INSERT INTO TipoVia (nombre) VALUES
("Avenida"),
("Calle"),
("Carrera"),
("Transversal"),
("Diagonal"),
("Autopista"),
("Vía"),
("Circular"),
("Manzana"),
("Pasaje"),
("Peatonal"),
("Troncal"),
("Camino"),
("Vereda");

-- Tabla Direccion
INSERT INTO Direccion (idUsuario, idTipoVia, vía_principal, vía_secundaria, Complemento_adicional, idBarrio) 
VALUES
(1, 1, 45, 'B', 'Apto 201', 1),
(2, 2, 103, 'C', 'Casa esquinera', 2),
(3, 3, 9, 'A', 'Bloque 5', 3),
(4, 4, 60, 'D', NULL, 4),
(5, 1, 18, NULL, 'Torre 3, piso 4', 5),
(6, 2, 72, 'F', 'Interior 7', 6),
(7, 3, 120, NULL, NULL, 7),
(8, 5, 33, 'A', 'Apto 302', 2),
(9, 1, 98, 'C', NULL, 1),
(10, 4, 41, 'B', 'Sector norte', 3),
(11, 2, 26, NULL, 'Casa verde', 5),
(12, 3, 77, 'D', 'Tercer piso', 6),
(13, 1, 59, 'E', 'Entrada por el garaje', 4);

-- Tabla TipoTelefono
INSERT INTO TipoTelefono (nombre) 
VALUES
("Celular"),
("Fijo"),
("Trabajo"),
("whatsApp");

-- Tabla Telefono
INSERT INTO Telefono (idTelefono, idTipoTelefono, idUsuario, numero) 
VALUES
(1, 1, 1, 3104567890),
(2, 2, 2, 3012345678),
(3, 1, 3, 3117896543),
(4, 3, 4, 3509876543),
(5, 1, 5, 3134561230),
(6, 4, 6, 3201234567),
(7, 2, 7, 3087654321),
(8, 1, 8, 3004567899),
(9, 3, 9, 3151231234),
(10, 2, 10, 3019876543),
(11, 4, 11, 3213213210),
(12, 1, 12, 3029876543),
(13, 2, 13, 3076543210);
-- -----------------------------------------------------
-- MÓDULO DE ADMINISTRADOR
-- -----------------------------------------------------

INSERT INTO TipoProducto (nombreTipoProducto) 
VALUES 
("Calzado"),
("Bolsos");

-- Tabla Categoria
INSERT INTO Categoria (nombreCategoria) 
VALUES
("Zapatillas deportivas"),
("Zapatos formales"),
("Botas"),
("Sandalias"),
("Mocasines"),
("Tenis casuales"),
("Bolsos de mano"),
("Morrales"),
("Billeteras"),
("Riñoneras");

-- Tabla subCategoria
INSERT INTO subCategoria (nombreSubCategoria, idCategoria) VALUES
("Zapatillas deportivas", 1),
("Zapatos formales", 1),
("Botas", 1),
("Sandalias", 1),
("Mocasines", 1),
("Tenis casuales", 1),
("Bolsos de mano", 2),
("Morrales", 2),
("Billeteras", 2),
("Riñoneras", 2);

-- Tabla proveedor
INSERT INTO Proveedor (nombreProveedor, contacto) 
VALUES
("Calzados Andina S.A.", "contacto@andina.com"),
("Distribuciones El Paso", "3104567890"),
("Moda Urbana LTDA", "modaurbana@proveedor.com"),
("Bolsos del Norte", NULL),
("Calzado Continental", "calzado.continental@gmail.com"),
("Proveeduría Ocasional SAS", "6012345678"),
("Zapatodo Express", NULL),
("Accesorios Líder", "ventas@lider.com"),
("Diseños y Estilo S.A.S.", "3134567890"),
("Logística Fashion S.A.", "info@logfashion.co");

-- Tabla Estado 
INSERT INTO Estado (nombre) 
VALUES
("Disponible"),
("Agotado");

-- Tabla producto
INSERT INTO Producto (nombreProducto, descripcion, urlImagen, precio, marca, fechaCreacion, fechaModificacion, idCategoria, idTipoProducto, idProveedor, idEstado)
 VALUES
("Zapatillas Running X1", "Zapatillas deportivas para correr", "zapatilla1.jpg", 249900, "Nike", '2025-07-01', NULL, 1, 1, 1, 1),
("Zapatos Formales Clásicos", "Zapatos elegantes de cuero", "zapato_formal.jpg", 199900, "Florsheim", '2025-07-01', NULL, 2, 2, 2, 1),
("Botas de Montaña", "Botas resistentes para trekking", "botas_montana.jpg", 299000, "Merrell", '2025-07-01', NULL, 3, 1, 3, 1),
("Sandalias Playeras", "Sandalias cómodas para verano", "sandalias.jpg", 89900, "Crocs", '2025-07-01', NULL, 4, 1, 4, 1),
("Tenis Casual Urbanos", "Tenis para uso diario", "tenis_casual.jpg", 159900, "Adidas", '2025-07-01', NULL, 1, 1, 5, 1),
("Bolso de Mano Elegante", "Bolso para eventos formales", "bolso_mano.jpg", 139000, "Michael Kors", '2025-07-01', NULL, 7, 2, 6, 1),
("Mochila Escolar", "Mochila resistente con varios compartimentos", "mochila.jpg", 99000, "Totto", '2025-07-01', NULL, 8, 2, 7, 1),
("Riñonera Deportiva", "Riñonera compacta para correr", "rinonera.jpg", 65000, "Nike", '2025-07-01', NULL, 10, 2, 8, 1),
("Billetera Cuero Hombre", "Billetera de cuero legítimo", "billetera.jpg", 59000, "Lacoste", '2025-07-01', NULL, 9, 2, 9, 1),
("Riñonera pequeña", "Maletín para portátiles y documentos", "maletin.jpg", 189000, "Samsonite", '2025-07-01', NULL,10 , 2, 10, 1);

-- Tabla Inventario
INSERT INTO Inventario (color, talla, cantidad, idProducto)
 VALUES
("Negro", "40", "15", 1),
("Blanco", "41", "10", 1),
("Marrón", "42", "12", 2),
("Negro", "43", "8", 2),
("Verde", "40", "5", 3),
("Negro", "41", "9", 3),
("Azul", "38", "18", 4),
("Rosado", "39", "20", 4),
("Gris", "40", "14", 5),
("Blanco", "41", "11", 5),
("Rojo", "Única", "7", 6),
("Negro", "Única", "10", 6),
("Azul", "Grande", "20", 7),
("Negro", "Mediana", "25", 7),
("Negro", "Única", "15", 8),
("Verde", "Única", "12", 8),
("Café", "Única", "30", 9),
("Negro", "Única", "27", 9),
("Gris", "Grande", "6", 10),
("Negro", "Mediana", "9", 10);

-- -----------------------------------------------------
-- MÓDULO DE PROMOCIONES Y DESCUENTOS
-- -----------------------------------------------------

-- tabla Promocion
INSERT INTO Promocion (codigo_Promocion, descuento, fecha_inicio, fecha_fin)
 VALUES
("DESC10", 10, '2025-07-01', '2025-07-15'),
("SALE15", 15, '2025-07-05', '2025-07-20'),
("ZAPATOS20", 20, '2025-07-10', '2025-07-25'),
("BOLSOS25", 25, '2025-07-01', '2025-07-31'),
("JULIO30", 30, '2025-07-01', '2025-07-15'),
("FASHION5", 5, '2025-07-03', '2025-07-18'),
("EXTRA35", 35, '2025-07-12', '2025-07-30'),
("TODO40", 40, '2025-07-01', '2025-07-10'),
("FLASH50", 50, '2025-07-04', '2025-07-06'),
("WELCOME15", 15, '2025-07-01', '2025-08-01');

-- Tabla colección
INSERT INTO Coleccion (idProducto, nombre, descripción, fechaCreacion, idUsuario, idPromocion) 
VALUES
(1, "Colección Running", "Zapatillas deportivas edición julio", '2025-07-01', 4, 1),
(2, "Elegancia Formal", "Zapatos formales para oficina", '2025-07-02', 5, 2),
(3, "Aventura Outdoor", "Botas resistentes para terrenos difíciles", '2025-07-03', 6, 3),
(4, "Verano Playero", "Sandalias para climas cálidos", '2025-07-04', 7, 4),
(5, "Urbano Casual", "Tenis modernos para uso diario", '2025-07-05', 8, 5),
(6, "Lujo y Estilo", "Bolsos de mano para eventos", '2025-07-06', 9, 6),
(7, "Back to School", "Morrales escolares resistentes", '2025-07-07', 10, 7),
(8, "Sport Essentials", "Accesorios prácticos para correr", '2025-07-08',11, 8),
(9, "Clásicos en Cuero", "Billeteras elegantes para hombre", '2025-07-09',12, 9),
(10, "relax 2025", "para el viaje", '2025-07-10', 13, 10);

-- Tabla producto_promocion
INSERT INTO producto_promocion (idProducto, idPromocion) 
VALUES
(1, 1),  
(2, 2),  
(3, 3), 
(4, 4), 
(5, 5),  
(6, 6),  
(7, 7),  
(8, 8), 
(9, 9),  
(10, 10); 

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
("Tarjeta de crédito"),
("Tarjeta débito"),
("PSE");

-- Tabla pago
INSERT INTO Pago (cantidad, idMetodoPago) 
VALUES
(150000, 1),
(235000, 2),
(98500, 3),
(120000, 1),
(56000, 2),
(300000, 3),
(450000, 1),
(89000, 2),
(175000, 3),
(210000, 1);

-- Tabla DetalleCarrito 
INSERT INTO DetalleCarrito (idProducto, idCarrito, cantidad, idUsuario) 
VALUES
(1, 1, 150000, 4),
(2, 2, 235000, 5),
(3, 3, 98500, 6),
(4, 4, 120000, 7),
(5, 5, 56000, 8),
(6, 6, 300000, 9),
(7, 7, 450000, 10),
(8, 8, 89000, 11),
(8, 9, 175000, 12),
(10, 10, 210000, 13);


-- -----------------------------------------------------
-- MÓDULO DE GESTIÓN DE PEDIDOS											PARTE 1.1
-- -----------------------------------------------------

-- Tabla Pedido
INSERT INTO Pedido (fechaPedido, idUsuario, idCarrito, idPromocion, idDireccion, idPago, idMetodoPago)
 VALUES
("2025-07-01", 4, 1, 1, 1, 1, 1),
("2025-07-01", 5, 2, 2, 2, 2, 2),
("2025-07-02", 6, 3, 3, 3, 3, 3),
("2025-07-02", 7, 4, 4, 4, 4, 1),
("2025-07-03", 8, 5, 5, 5, 5, 2),
("2025-07-03", 9, 6, 6, 6, 6, 3),
("2025-07-04", 10, 7, 7, 7, 7, 1),
("2025-07-04", 11, 8, 8, 8, 8, 2),
("2025-07-05", 12, 9, 9, 9, 9, 3),
("2025-07-05", 13, 10, 10, 10, 10, 1);

-- Tabla detallePedido
INSERT INTO DetallePedido (idPedido, idUsuario, talla, cantidad, precioUnitario) VALUES
(1, 4, 38, 2, 75000),
(2, 5, 42, 1, 235000),
(3, 6, 40, 3, 320000),
(4, 7, 36, 1, 120000),
(5, 8, 37, 2, 28000),
(6, 9, 43, 1, 30000),
(7, 10, 39, 2, 225000),
(8, 11, 38, 1, 89000),
(9, 12, 41, 1, 175000),
(10, 13, 44, 2, 105000);

-- -----------------------------------------------------
-- MÓDULO DE GESTION DE COMPRAS									PARTE 1.2
-- -----------------------------------------------------
-- Tabla ComprobanteDeVenta
INSERT INTO ComprobanteDeVenta 
(idPedido, idUsuario, fechaEmision, nombreUsuario, primerApellidoUsuario, segundoApellidoUsuario, idPago) 
VALUES
(1, 4, "2025-07-01 10:30:00","carlos", "Martínez", "López", 1),
(2, 5, "2025-07-01 11:45:00","laura", "Gómez", "Ramírez", 2),
(3, 6, "2025-07-02 09:50:00","andres", "Rodríguez", "Torres", 3),
(4, 7, "2025-07-02 15:00:00","julian", "Pérez", "García", 4),
(5, 8, "2025-07-03 08:40:00", "maria", "Castaño", "Londoño", 5),
(6, 9, "2025-07-03 17:20:00", "diego", "Alvarez", "Peña", 6),
(7, 10, "2025-07-04 13:10:00", "paula", "Ríos", "Moreno",  7),
(8, 11, "2025-07-04 18:45:00", "sebastian", "González", "Martínez", 8),
(9, 12, "2025-07-05 08:25:00", "camila", "Ruiz", "Sánchez", 9),
(10, 13, "2025-07-05 22:10:00", "diana", "Morales", "Sanchez", 10);

-- Tabla DetallesComprobanteDeVenta 
INSERT INTO DetallesComprobanteDeVenta 
(idComprobanteDeVenta, idDetallePedido, idPedido, idProducto, precio_unitario, cantidad)
VALUES 
(1, 1, 1, 1, 150000, 2),
(1, 1, 1, 3, 98500, 1),
(2, 2, 2, 2, 235000, 1),
(2, 4, 4, 4, 120000, 3),
(3, 4, 4, 5, 56000, 2),
(3, 7, 7, 6, 300000, 1),
(4, 7, 7, 9, 175000, 1),
(4, 6, 6, 7, 450000, 2),
(5, 5, 5, 10, 210000, 2),
(5, 10, 10, 8, 89000, 1),
(1, 3, 3, 1, 150000, 2),
(1, 8, 8, 3, 98500, 1),
(2, 8, 8, 2, 235000, 1),
(2, 9, 9, 4, 120000, 3);

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
INSERT INTO DevolucionCambio 
(motivo, tipo_solicitud, estado_solicitud, fecha_solicitud, fecha_respuesta, idUsuario)
VALUES
("Producto defectuoso al recibirlo", "Devolución", "Aprobada", "2025-06-20", "2025-06-22", 4),
("Talla incorrecta enviada", "Cambio", "En proceso", "2025-06-21", NULL, 5),
("No era lo que esperaba", "Devolución", "Rechazada", "2025-06-22", "2025-06-24", 6),
("Producto llegó incompleto", "Devolución", "Aprobada", "2025-06-23", "2025-06-25", 7),
("Color distinto al solicitado", "Cambio", "Pendiente", "2025-06-24", NULL, 8),
("No me quedó bien", "Cambio", "Rechazada", "2025-06-24", "2025-06-26", 9),
("No quede satisfecho con el Producto ", "Devolución", "Aprobada", "2025-06-25", "2025-06-27", 10),
("Error en el modelo recibido", "Cambio", "En proceso", "2025-06-26", NULL,11),
("Me equivoqué en el pedido", "Devolución", "Rechazada", "2025-06-26", "2025-06-28", 12),
("La talla no me queda", "Devolución", "Aprobada", "2025-06-26", "2025-06-28", 13);

select * from Usuario;




select * from usuario;
