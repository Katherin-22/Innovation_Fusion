
/// fgfggr
const API_BASE = 'http://localhost:5000';
const URL_PRODUCTOS = `${API_BASE}/api/productos`;

async function cargarYRenderizarProductos() {
  try {
    const resp = await fetch(URL_PRODUCTOS);
    const productos = await resp.json();

    const contenedor = document.querySelector('#contenedor-productos');
    contenedor.innerHTML = productos.map(p => `
      <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-4">
        <div class="card text-center" style="width:18rem;">
          <img src="${p.imagen}" class="card-img-top" alt="${p.titulo}">
          <div class="card-body">
            <h5 class="card-title">${p.titulo}</h5>
            <p class="producto-precio">${p.precio}</p>
            <button class="btn custom-btn producto-agregar" data-id="${p.id}">Carrito</button>
          </div>
        </div>
      </div>
    `).join('');

    // Delegación de eventos
    contenedor.addEventListener('click', e => {
      if (e.target.matches('.producto-agregar')) {
        agregarAlCarrito(e.target.dataset.id);
      }
    });
  } catch (err) {
    console.error('Error al cargar productos:', err);
  }
}

cargarYRenderizarProductos();



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





