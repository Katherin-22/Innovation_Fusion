document.addEventListener('DOMContentLoaded', function () {
  const tablaProductos = document.getElementById('tablaProductos').querySelector('tbody');
  let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(precio);
  };

  inventario.forEach((producto, index) => {
    const fila = document.createElement('tr');

    // Muestra los colores como nombre + cuadro de color
    const coloresTexto = producto.colores
      ? producto.colores.map(color => `
          <span style="display: inline-flex; align-items: center; margin-right: 4px;">
            <span style="display:inline-block; width:12px; height:12px; background:${color.hex}; border:1px solid #ccc; margin-right:4px;"></span>
            ${color.nombre}
          </span>
        `).join('<br>')
      : '';

    // Mostrar talla o tamaño según el tipo
    let detalleTallaTamano = '';
    if (producto.tipoProducto === 'zapato') {
      detalleTallaTamano = producto.tallas?.join(', ') || '';
    } else if (producto.tipoProducto === 'bolso') {
      detalleTallaTamano = producto.tamanoBolso || '';
    }

    fila.innerHTML = `
      <td>${producto.codigo}</td>
      <td>${producto.nombre}</td>
      <td>${producto.tipoProducto}</td>
      <td>${producto.categoria}</td>
      <td>${producto.descripcion}</td>
      <td>${producto.cantidad}</td>
      <td>${formatearPrecio(producto.precioVenta)}</td>
      <td>${formatearPrecio(producto.precioInterno)}</td>
      <td>${producto.material}</td>
      <td>${producto.genero}</td>
      <td>${coloresTexto}</td>
      <td>${detalleTallaTamano}</td>
      <td>
        <button onclick="editarProducto(${index})">Editar</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;

    tablaProductos.appendChild(fila);
  });
});

function editarProducto(index) {
  window.location.href = `registrar.html?edit=${index}`;
}

function eliminarProducto(index) {
  if (confirm('¿Eliminar este producto?')) {
    let inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    inventario.splice(index, 1);
    localStorage.setItem('inventario', JSON.stringify(inventario));

    // Recarga la página para actualizar la tabla
    location.reload();
  }
}

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(precio);
}