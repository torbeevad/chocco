let burger = document.querySelector('.burger');
let overlay = document.querySelector('.overlay');
let body = document.querySelector('body');
let close = document.querySelector('.close');

let links = document.querySelectorAll('.menu-tablets__link');

links.forEach(function (element) {
  element.addEventListener('click', toggleMenu);
})

function toggleMenu() {
  burger.classList.toggle('burger--active');
  overlay.classList.toggle('overlay--active');
  body.classList.toggle('body--active-menu');
  close.classList.toggle('close--active');
}

burger.addEventListener('click', toggleMenu);
close.addEventListener('click' , toggleMenu);