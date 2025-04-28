let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;

function slide(direction) {
  slideIndex = (slideIndex + direction + totalSlides) % totalSlides;
  slides.style.transform = 'translateX(' + (-slideIndex * 100) + '%)';
}
