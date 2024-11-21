const hamburgerNav = document.querySelector('.hamburger-nav');
const navMenu = document.querySelector('.nav-menu');

document.addEventListener('DOMContentLoaded', function() {
  hamburgerNav.addEventListener('click', function() {
    hamburgerNav.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburgerNav.classList.remove('active');
  navMenu.classList.remove('active');
}));

document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});