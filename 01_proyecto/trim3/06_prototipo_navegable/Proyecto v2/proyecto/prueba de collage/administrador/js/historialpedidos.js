document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('tbody');
    const historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
  
    historial.forEach(pedido => {
      const fila = document.createElement('tr');
  
      fila.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.cliente}</td>
        <td>${pedido.fecha}</td>
        <td><span class="estado ${pedido.estado.toLowerCase().replace(/\s/g, '-')}">${pedido.estado}</span></td>
        <td><button>Ver</button></td>
      `;
  
      tbody.appendChild(fila);
    });
  });
  