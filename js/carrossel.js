let currentIndex = 0;

function scrollCarousel(direction) {
  const carousel = document.getElementById('carrossel-categorias');
  const items = carousel.querySelectorAll('.card-categoria');
  const itemWidth = items[0].offsetWidth + 20; // 20px = gap do CSS

  currentIndex += direction;

  // Se passou do final, volta ao início
  if (currentIndex >= items.length) {
    currentIndex = 0;
  }

  // Se passou antes do começo, vai para o último
  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  }

  carousel.scrollTo({
    left: currentIndex * itemWidth,
    behavior: 'smooth'
  });
}
