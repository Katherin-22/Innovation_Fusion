// Obtener los elementos del formulario y del slider
const bannerForm = document.getElementById('bannerForm');
const bannerInput = document.getElementById('bannerInput');
const bannerSlider = document.getElementById('bannerSlider');

// Cargar los banners guardados en el localStorage
function loadBanners() {
    const banners = JSON.parse(localStorage.getItem("banners")) || [];
    
    bannerSlider.innerHTML = ''; // Limpiar el slider antes de agregar nuevos banners

    banners.forEach((banner, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        
        const img = document.createElement('img');
        img.src = banner;
        img.alt = "Banner";
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Eliminar";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            deleteBanner(index);
        });

        slide.appendChild(img);
        slide.appendChild(deleteBtn);
        bannerSlider.appendChild(slide);
    });
}

// Eliminar un banner
function deleteBanner(index) {
    const banners = JSON.parse(localStorage.getItem("banners")) || [];
    banners.splice(index, 1); // Eliminar el banner del arreglo
    localStorage.setItem("banners", JSON.stringify(banners)); // Guardar el arreglo actualizado en localStorage
    loadBanners(); // Recargar los banners
}

// Cargar los banners cuando la página se cargue
loadBanners();

// Al enviar el formulario de cambio de banner
bannerForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevenir el envío por defecto del formulario
    
    const bannerFile = bannerInput.files[0];  // Obtener el archivo de imagen

    if (bannerFile) {
        const reader = new FileReader();

        reader.onload = function(event) {
            // Obtener los banners guardados
            const banners = JSON.parse(localStorage.getItem("banners")) || [];

            // Agregar el nuevo banner al arreglo
            banners.push(event.target.result);

            // Guardar los banners actualizados en localStorage
            localStorage.setItem("banners", JSON.stringify(banners));

            // Recargar los banners
            loadBanners();

            alert("Banner agregado con éxito.");
        };

        reader.readAsDataURL(bannerFile);  // Leer la imagen como una URL de datos
    }
});
