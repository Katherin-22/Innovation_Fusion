document.addEventListener('DOMContentLoaded', function () {
   
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
        currentSlide = n;
    }

    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        setInterval(nextSlide, 5000); // Auto slide
    }

    // ========================
    // CONTROL DE SESIÓN
    // ========================
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const protectedPages = ['administrador.html', 'perfil.html', 'indexusuario.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = '../../prueba de collage/union formulario y collage/index.html';
    }

    if (currentUser && (currentPage === 'login.html' || currentPage.includes('registrar de usuarios'))) {
        console.log('Usuario logueado intentando acceder a login o registro. Redirigiendo a la página principal.');
        window.location.href = '../../prueba de collage/union formulario y collage/index.html';
    }

    // ========================
    // INICIO DE SESIÓN
    // ========================
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('CorreoElectronico').value;
            const password = document.getElementById('Contraseña').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = '../administrador/administrador.html';
            } else {
                alert('Correo o contraseña incorrectos');
            }
        });
    }

   
    const cards = document.querySelectorAll('.card');
    const overlay = document.getElementById('overlay');
    const expandedImg = document.getElementById('expanded-img');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const imgSrc = card.querySelector('img').src;
            card.classList.toggle('flipped');

            if (card.classList.contains('flipped')) {
                expandedImg.src = imgSrc;
                overlay.style.display = 'block';
            } else {
                overlay.style.display = 'none';
            }
        });
    });

    if (overlay) {
        overlay.addEventListener('click', function () {
            document.querySelectorAll('.card.flipped').forEach(card => card.classList.remove('flipped'));
            overlay.style.display = 'none';
        });
    }
});