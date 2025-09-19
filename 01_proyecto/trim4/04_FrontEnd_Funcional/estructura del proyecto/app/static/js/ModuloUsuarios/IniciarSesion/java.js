// collage.js

$(document).ready(function () {
  const rows = 4;
  const cols = 6;
  const cards = $('.custom-card');
  let originalImages = [];
  let collageActive = false;
  // This will store the direction of the last diagonal animation
  // to ensure the reverse animation goes in the opposite direction.
  let lastDiagonalDirection = 'left-to-right'; // 'left-to-right' or 'right-to-left'


  // Guardar imágenes originales
  cards.each(function () {
    const imgSrc = $(this).find('img').attr('src');
    originalImages.push(imgSrc);
  });

  // Función para animar en onda diagonal o horizontal
  function animateWave(imageSrc, reverse = false, clickedCardIndex = -1) {
    let baseDelay;
    let transitionTransform;
    let initialTransform;
    let finalTransform;

    // Ajustar este valor para controlar la velocidad de la onda
    const delayMultiplier = 30; // Puedes ajustar este valor

    if (!reverse) { // Animación para formar el collage (giro diagonal)
      const clickedCol = clickedCardIndex % cols;

      // Determine direction based on clicked column
      if (clickedCol >= 0 && clickedCol <= 2) { // Tarjeta a la izquierda (columnas 0-2)
        // Giro de izquierda a derecha (delay aumenta con la columna)
        baseDelay = (row, col) => (row * cols + col) * delayMultiplier;
        initialTransform = 'rotateY(90deg)';
        finalTransform = 'rotateY(0deg)';
        lastDiagonalDirection = 'left-to-right';
      } else { // Tarjeta a la derecha (columnas 3-5)
        // Giro de derecha a izquierda (delay disminuye con la columna)
        baseDelay = (row, col) => (row * cols + (cols - 1 - col)) * delayMultiplier;
        initialTransform = 'rotateY(-90deg)'; // Giro en la dirección opuesta
        finalTransform = 'rotateY(0deg)';
        lastDiagonalDirection = 'right-to-left';
      }
      transitionTransform = 'transform 0.4s, background-image 0.3s'; // Mantener transiciones rápidas

    } else { // Animación para restaurar el collage (giro horizontal)
      // Invertir el sentido del último giro diagonal para la restauración horizontal
      if (lastDiagonalDirection === 'left-to-right') {
        // Si el último giro diagonal fue de izq a der, ahora restaurar de derecha a izquierda
        baseDelay = (row, col) => (row * cols + (cols - 1 - col)) * delayMultiplier;
        initialTransform = 'rotateY(-90deg)';
        finalTransform = 'rotateY(0deg)';
      } else {
        // Si el último giro diagonal fue de der a izq, ahora restaurar de izquierda a derecha
        baseDelay = (row, col) => (row * cols + col) * delayMultiplier;
        initialTransform = 'rotateY(90deg)';
        finalTransform = 'rotateY(0deg)';
      }
      transitionTransform = 'transform 0.4s'; // Transición para el giro horizontal de restauración
    }


    for (let i = 0; i < cards.length; i++) {
      const card = $(cards[i]);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const delay = baseDelay(row, col);

      setTimeout(() => {
        if (!reverse) {
          card.css({
            transition: transitionTransform,
            transform: initialTransform
          });

          setTimeout(() => {
            card.css({
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${(col * 100) / (cols - 1)}% ${(row * 100) / (rows - 1)}%`,
              transform: finalTransform
            });
            card.find('img').css('opacity', 0);
          }, 200); // Duración de la segunda parte del giro
        } else {
          card.css({
            transition: transitionTransform,
            transform: initialTransform
          });

          setTimeout(() => {
            card.css({
              backgroundImage: '',
              backgroundSize: '',
              backgroundPosition: '',
              transform: finalTransform
            });
            card.find('img').attr('src', originalImages[i]).css('opacity', 1);
          }, 200); // Duración de la segunda parte del giro
        }
      }, delay);
    }
  }

  // Al hacer clic en una tarjeta
  cards.on('click', function () {
    const selectedImage = $(this).find('img').attr('src');
    // Important: Pass the index of the clicked card to determine the direction
    const clickedCardIndex = cards.index(this);
    animateWave(selectedImage, collageActive, clickedCardIndex);
    collageActive = !collageActive;
  });
});