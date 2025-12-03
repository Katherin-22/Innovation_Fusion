// collage.js
import $ from "jquery";

export function initCollageEffect() {
  const rows = 4;
  const cols = 6;
  const cards = $(".custom-card");
  let originalImages = [];
  let collageActive = false;
  let lastDiagonalDirection = "left-to-right";

  cards.each(function () {
    const imgSrc = $(this).find("img").attr("src");
    originalImages.push(imgSrc);
  });

  function animateWave(imageSrc, reverse = false, clickedCardIndex = -1) {
    let baseDelay;
    let transitionTransform;
    let initialTransform;
    let finalTransform;
    const delayMultiplier = 30;

    if (!reverse) {
      const clickedCol = clickedCardIndex % cols;
      if (clickedCol >= 0 && clickedCol <= 2) {
        baseDelay = (row, col) => (row * cols + col) * delayMultiplier;
        initialTransform = "rotateY(90deg)";
        finalTransform = "rotateY(0deg)";
        lastDiagonalDirection = "left-to-right";
      } else {
        baseDelay = (row, col) => (row * cols + (cols - 1 - col)) * delayMultiplier;
        initialTransform = "rotateY(-90deg)";
        finalTransform = "rotateY(0deg)";
        lastDiagonalDirection = "right-to-left";
      }
      transitionTransform = "transform 0.4s, background-image 0.3s";
    } else {
      if (lastDiagonalDirection === "left-to-right") {
        baseDelay = (row, col) => (row * cols + (cols - 1 - col)) * delayMultiplier;
        initialTransform = "rotateY(-90deg)";
        finalTransform = "rotateY(0deg)";
      } else {
        baseDelay = (row, col) => (row * cols + col) * delayMultiplier;
        initialTransform = "rotateY(90deg)";
        finalTransform = "rotateY(0deg)";
      }
      transitionTransform = "transform 0.4s";
    }

    for (let i = 0; i < cards.length; i++) {
      const card = $(cards[i]);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const delay = baseDelay(row, col);

      setTimeout(() => {
        if (!reverse) {
          card.css({ transition: transitionTransform, transform: initialTransform });
          setTimeout(() => {
            card.css({
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${(col * 100) / (cols - 1)}% ${(row * 100) / (rows - 1)}%`,
              transform: finalTransform,
            });
            card.find("img").css("opacity", 0);
          }, 200);
        } else {
          card.css({ transition: transitionTransform, transform: initialTransform });
          setTimeout(() => {
            card.css({ backgroundImage: "", backgroundSize: "", backgroundPosition: "", transform: finalTransform });
            card.find("img").attr("src", originalImages[i]).css("opacity", 1);
          }, 200);
        }
      }, delay);
    }
  }

  cards.on("click", function () {
    const selectedImage = $(this).find("img").attr("src");
    const clickedCardIndex = cards.index(this);
    animateWave(selectedImage, collageActive, clickedCardIndex);
    collageActive = !collageActive;
  });
}
