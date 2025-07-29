// PRODUCTOS
const productos = [
    // Running
    {
        id: "Running-1",
        titulo: "Running 01",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas1.jpeg",
        categoria: {
            nombre: "Running",
            id: "Running"
        },
        precio: 1000
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas2.jpeg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas3.jpeg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas1.jpeg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas2.jpeg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "Camiseta 01",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas3.jpeg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-02",
        titulo: "Camiseta 02",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas1.jpeg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-03",
        titulo: "Camiseta 03",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas2.jpeg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-04",
        titulo: "Camiseta 04",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas3.jpeg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-05",
        titulo: "Camiseta 05",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas1.jpeg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-06",
        titulo: "Camiseta 06",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas2.jpeg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-07",
        titulo: "Camiseta 07",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas3.jpeg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-08",
        titulo: "Camiseta 08",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas1.jpeg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    // Pantalones
    {
        id: "pantalon-01",
        titulo: "Pantalón 01",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas2.jpeg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-02",
        titulo: "Pantalón 02",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas3.jpeg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón 03",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas1.jpeg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón 04",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas2.jpeg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón 05",
        imagen: "../../../ModuloPrincipal/catalogo/img/botas3.jpeg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    }
];





/// fgfggr

const contenedorProductos = document.querySelector("#contenedor-productos");
const categoriaSelect = document.querySelector("#categoriaSelect");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");   

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.className = "col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 categoria-1 mb-4 producto";

        div.innerHTML = `
            <div class="card text-center producto" style="width: 18rem;">
            <img class="producto-imagen" src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
            <div class="card-body producto-detalles">
                <h5 class="card-title producto-titulo">${producto.titulo}</h5>
                <p class="producto-precio">${producto.precio}</p>
                <p class="card-text info-producto">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                <a href="#" class="btn custom-btn producto-agregar" id="${producto.id}" >Carrito</a> 
                <a href="../../productos/html/producto.html" class="btn custom-btn ">ver</a> 
            </div>
            </div>
        `;

        contenedorProductos.appendChild(div);
    });

    ActualizarBotonesAgregar();
    // Agregar evento a los botones de agregar al carrito
}


// Cargar todos los productos inicialmente
cargarProductos(productos);


// Filtro usando el <select> de categorías
categoriaSelect.addEventListener("change", (e) => {
    const categoriaSeleccionada = e.target.options[e.target.selectedIndex].id;

    if (categoriaSeleccionada === "todos") {
        // Si se selecciona "Todos", mostrar todos los productos y mostrara su titulo
        tituloPrincipal.innerText = "Todos los productos";
        cargarProductos(productos);
    } else {
        // Buscar el nombre de la categoría a través de un producto
        const productoEjemplo = productos.find(producto => producto.categoria.id === categoriaSeleccionada);        
        // Filtrar los productos por la categoría seleccionada

        // y mostrar el nombre de la categoría en el título principal
        // Si no se encuentra un producto con la categoría seleccionada, mostrar un mensaje genérico
        if (productoEjemplo) {
            tituloPrincipal.innerText = productoEjemplo.categoria.nombre;
        } else {
            tituloPrincipal.innerText = "Categoría desconocida";
        }
// Filtrar los productos por la categoría seleccionada
        // y cargar los productos filtrados
        const productosFiltrados = productos.filter(producto => producto.categoria.id === categoriaSeleccionada);
        cargarProductos(productosFiltrados);
    }
}); 




// Agregar evento a los botones de agregar al carrito

function ActualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
// Recuperar los productos del carrito desde el localStorage

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito(); // Actualizar el numerito con la cantidad de productos en el carrito

}else{
    productosEnCarrito = [];
}


// Función para agregar productos al carrito
function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productosAgregado = productos.find (producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++; // Incrementar la cantidad del producto en el carrito
    } else{
    // Verificar si el producto ya está en el carrito
        productosAgregado.cantidad = 1; // Inicializar la cantidad del producto
        // Agregar el producto al carrito
        productosEnCarrito.push(productosAgregado);
    }


    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    // Guardar los productos en el carrito en el localStorage
}



// para actualizar el numerito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito; 
}


