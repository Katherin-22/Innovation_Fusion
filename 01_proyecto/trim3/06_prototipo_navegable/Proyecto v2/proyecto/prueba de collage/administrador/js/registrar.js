document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const editIndex = params.get('edit');

  const tipoProductoInput = document.getElementById("tipoProducto");
  const tallasContainer = document.getElementById("tallasContainer");
  const tamanoContainer = document.getElementById("tamanoBolsoContainer");
  const coloresAgregados = document.getElementById("coloresAgregados");
  const nuevoColorInput = document.getElementById("nuevoColor");
  const nombreColorInput = document.getElementById("nombreColor");
  const agregarColorBtn = document.getElementById("agregarColor");
  const imagenPrevia = document.getElementById('imagenPrevia');
  const fileInput = document.getElementById('fileInput');
  const formularioProducto = document.getElementById('formularioProducto');

  let inventario = JSON.parse(localStorage.getItem('inventario')) || [];
  let coloresSeleccionados = [];

  // Si estamos editando, no exigimos la imagen de nuevo
  if (editIndex !== null) {
    fileInput.required = false;
  }

  // Muestra/oculta tallas o tamaño según tipo
  function updateTipo() {
    const tipo = tipoProductoInput.value;
    tallasContainer.style.display = tipo === "zapato" ? "block" : "none";
    tamanoContainer.style.display = tipo === "bolso" ? "block" : "none";
  }
  tipoProductoInput.addEventListener("change", updateTipo);

  // Renderiza los colores agregados
  function mostrarColoresAgregados(colores) {
    coloresAgregados.innerHTML = '';  // Limpiamos la lista actual de colores
    colores.forEach(color => {
      const div = document.createElement("label");
      div.classList.add("checkbox-item");
      div.innerHTML = `
        <input type="checkbox" name="color" value="${color.hex}" checked>
        <span class="checkbox-color" style="background-color:${color.hex};">${color.nombre}</span>
      `;
      coloresAgregados.appendChild(div);
    });
  }

  // Si editamos, cargamos los datos existentes
  if (editIndex !== null) {
    const p = inventario[editIndex];
    // Campos básicos
    tipoProductoInput.value = p.tipoProducto;
    document.querySelector("input[name='codigo']").value = p.codigo;
    document.querySelector("input[name='nombre']").value = p.nombre;
    document.querySelector("select[name='categoria']").value = p.categoria;
    document.querySelector("textarea[name='descripcion']").value = p.descripcion;
    document.querySelector("input[name='cantidad']").value = p.cantidad;
    document.querySelector("input[name='precio']").value = p.precioVenta;
    document.querySelector("input[name='precioInterno']").value = p.precioInterno;
    document.querySelector("input[name='fechaIngreso']").value = p.fechaIngreso;
    document.querySelector("select[name='material']").value = p.material;
    document.querySelector("select[name='genero']").value = p.genero;

    // Mostrar tallas/tamaño
    updateTipo();
    if (p.tipoProducto === "zapato" && p.tallas) {
      p.tallas.forEach(t => {
        document.querySelectorAll("input[name='tallas']").forEach(i => {
          if (i.value === t) i.checked = true;
        });
      });
    } else if (p.tipoProducto === "bolso") {
      document.getElementById("tamanoBolso").value = p.tamanoBolso;
    }

    // Colores existentes
    if (p.colores) {
      coloresSeleccionados = p.colores.map(c => ({ hex: c.hex, nombre: c.nombre }));
      mostrarColoresAgregados(coloresSeleccionados);
    }

    // Imagen previa
    if (p.imagen) imagenPrevia.src = p.imagen;
  }

  // Agregar un color nuevo
  agregarColorBtn.addEventListener('click', function () {
    const hex = nuevoColorInput.value;
    const nombre = nombreColorInput.value.trim();
    if (hex && nombre) {
      // Aseguramos que el color se agregue correctamente
      coloresSeleccionados.push({ hex, nombre });
      nuevoColorInput.value = "#000000";
      nombreColorInput.value = "";
      mostrarColoresAgregados(coloresSeleccionados);
    } else {
      alert("Por favor ingresa un color y su nombre.");
    }
  });

  // Guardar producto (nueva o edición)
  formularioProducto.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!formularioProducto.checkValidity()) {
      return alert('Completa todos los campos requeridos.');
    }

    const file = fileInput.files[0];
    let imgURL = imagenPrevia.src; // Mantiene previa si no hay nueva

    // Al cargar nueva imagen, la convertimos
    const finishSave = url => {
      const np = {
        codigo: document.querySelector("input[name='codigo']").value,
        tipoProducto: tipoProductoInput.value,
        nombre: document.querySelector("input[name='nombre']").value,
        categoria: document.querySelector("select[name='categoria']").value,
        descripcion: document.querySelector("textarea[name='descripcion']").value,
        cantidad: document.querySelector("input[name='cantidad']").value,
        precioVenta: document.querySelector("input[name='precio']").value,
        precioInterno: document.querySelector("input[name='precioInterno']").value,
        fechaIngreso: document.querySelector("input[name='fechaIngreso']").value,
        material: document.querySelector("select[name='material']").value,
        genero: document.querySelector("select[name='genero']").value,
        colores: coloresSeleccionados,
        imagen: url
      };
      if (np.tipoProducto === "zapato") {
        np.tallas = Array.from(document.querySelectorAll("input[name='tallas']:checked"))
                         .map(i => i.value);
      } else {
        np.tamanoBolso = document.getElementById("tamanoBolso").value;
      }
      if (editIndex !== null) inventario[editIndex] = np;
      else inventario.push(np);
      localStorage.setItem('inventario', JSON.stringify(inventario));
      window.location.href = './administrador.html';
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = ev => finishSave(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      finishSave(imgURL);
    }
  });
});
