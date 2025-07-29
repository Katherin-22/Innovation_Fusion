let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML = ""; // Limpiar el contenedor antes de agregar los productos

        productosEnCarrito.forEach(producto => {
            const div= document.createElement("div");
            div.classList.add("carrito-producto"); 
            div.innerHTML = `
                <div class="cart-item">
                    <div class="cart-grid">
                        <!-- Producto -->
                        <div class="item-description">
                            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div>
                                <p class="carrito-producto-titulo">${producto.titulo}</p>
                                <p class="product-code">Product Code: MLLG</p>
                            </div>
                        </div>

                        <!-- Talla -->
                        <div>
                            <select class="size-select">
                                <option>28</option><option>29</option><option>30</option><option>31</option>
                                <option>32</option><option>33</option><option>34</option><option>35</option>
                                <option>36</option><option>37</option><option>38</option><option>39</option><option>40</option>
                            </select>
                        </div>

                        <!-- Tamaño -->
                        <div>
                            <select class="Tamaño-select">
                                <option>Pequeño</option>
                                <option>Mediano</option>
                                <option>Grande</option>
                            </select>
                        </div>

                        <!-- Cantidad -->
                        <div class="carrito-producto-cantidad">
                            <p>${producto.cantidad}</p>
                        </div>

                        <!-- Precio -->
                        <div class="carrito-producto-precio">${producto.precio}</div>

                        <!-- subtotal -->
                        <div class="carrito-producto-subtotal">
                            <p>${producto.precio * producto.cantidad}</p>
                        </div>

                        <!-- Acciones -->
                        <div class="actions">
                            <button id="${producto.id}" class="carrito-producto-eliminar action-btn delete-btn" data-id="ID_DEL_PRODUCTO_1"><i class="bi bi-trash-fill"></i> Eliminar</button>
                        </div>
                    </div>
                </div>
            `;

            contenedorCarritoProductos.append(div);
        })

    } else{

        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        
    }

    actualizarBotonesEliminar();
    actualizarTotal(); // Actualizar el total al cargar los productos en el carrito
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar =document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1); // Eliminar el producto del carrito
    cargarProductosCarrito(); // Recargar los productos en el carrito

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Actualizar el localStorage
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0; // Vaciar el array de productos en el carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Actualizar el localStorage
    cargarProductosCarrito(); // Recargar los productos en el carrito
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);   
    total.innerText = `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){

    productosEnCarrito.length = 0; //eliminamos todo del arride
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Actualizar el localStorage

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
}