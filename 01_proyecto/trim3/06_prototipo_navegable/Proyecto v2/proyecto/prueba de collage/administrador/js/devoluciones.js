document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos de devoluciones desde localStorage o establecer los datos de prueba si no existen
  cargarDevoluciones();

  // Función para gestionar el estado de las devoluciones y cambios
  window.gestionarEstado = function(button) {
      const row = button.parentElement.parentElement;
      const select = row.querySelector('.estado');
      const estado = select.value;
      const estadoCell = row.querySelector('.estado-texto');
      const id = row.querySelector('td:first-child').textContent; // Obtener el ID de la devolución o cambio

      // Actualizar el estado de la columna
      estadoCell.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);

      // Guardar el cambio de estado en localStorage
      guardarEstado(id, estado);
  }

  // Función para guardar el estado en localStorage
  function guardarEstado(id, estado) {
      let devoluciones = JSON.parse(localStorage.getItem('devoluciones')) || [];
      
      // Buscar la devolución con el ID correspondiente
      let devolucion = devoluciones.find(d => d.id === id);
      
      if (devolucion) {
          devolucion.estado = estado; // Actualizar el estado
      } else {
          // Si no existe, agregar la nueva devolución
          devoluciones.push({ id, estado });
      }

      // Guardar el array actualizado en localStorage
      localStorage.setItem('devoluciones', JSON.stringify(devoluciones));
  }

  // Función para cargar las devoluciones desde localStorage
  function cargarDevoluciones() {
      let devoluciones = JSON.parse(localStorage.getItem('devoluciones'));

      // Si no hay datos en localStorage, establecer los datos de prueba
      if (!devoluciones) {
          devoluciones = [
              { id: '#001', estado: 'pendiente' },
              { id: '#002', estado: 'pendiente' },
              { id: '#A001', estado: 'pendiente' },
              { id: '#A002', estado: 'pendiente' }
          ];
          localStorage.setItem('devoluciones', JSON.stringify(devoluciones));
      }

      // Recorrer las filas de la tabla para actualizar el estado según lo guardado en localStorage
      const filasDevoluciones = document.querySelectorAll('.tabla-devoluciones tbody tr');
      
      filasDevoluciones.forEach(fila => {
          const id = fila.querySelector('td:first-child').textContent;
          const estadoCell = fila.querySelector('.estado-texto');
          const select = fila.querySelector('.estado');
          
          // Buscar el estado guardado en localStorage para el ID
          let devolucion = devoluciones.find(d => d.id === id);
          
          if (devolucion) {
              // Establecer el estado en la celda de estado y el select
              estadoCell.textContent = devolucion.estado.charAt(0).toUpperCase() + devolucion.estado.slice(1);
              select.value = devolucion.estado;
          }
      });
  }
});
