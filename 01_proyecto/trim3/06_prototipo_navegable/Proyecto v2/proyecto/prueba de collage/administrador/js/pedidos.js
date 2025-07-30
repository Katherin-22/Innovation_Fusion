document.addEventListener('DOMContentLoaded', () => {
    const dropdownContent = document.querySelector('.dropdown-content');
    const tablaPedidos = document.querySelector('.tablaPedidos tbody');
  
    dropdownContent.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const nuevoEstado = e.target.textContent;
        const checkboxes = tablaPedidos.querySelectorAll('input[type="checkbox"]:checked');
  
        checkboxes.forEach(checkbox => {
          const fila = checkbox.closest('tr');
          const id = fila.cells[1].textContent;
          const cliente = fila.cells[2].textContent;
          const fecha = fila.cells[3].textContent;
  
          // Cambia el estado visual en la tabla
          const spanEstado = fila.cells[4].querySelector('span');
          spanEstado.textContent = nuevoEstado;
  
          // Cambia la clase según estado
          spanEstado.className = 'estado ' + nuevoEstado.toLowerCase().replace(/\s/g, '-');
  
          // Guarda en historial si es "Completado"
          if (nuevoEstado === 'Completado') {
            guardarEnHistorial({
              id,
              cliente,
              fecha,
              estado: nuevoEstado
            });
  
            // Opcional: quitar la fila de la tabla actual
            fila.remove();
          }
        });
      }
    });
  
    function guardarEnHistorial(pedido) {
      const historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
      historial.push(pedido);
      localStorage.setItem('historialPedidos', JSON.stringify(historial));
    }
  });
  