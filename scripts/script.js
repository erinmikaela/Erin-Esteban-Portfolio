const hamburgerNav = document.querySelector('.hamburger-nav');
const navMenu = document.querySelector('.nav-menu');

hamburgerNav.addEventListener('click', () => {
  hamburgerNav.classList.toggle('active');
  navMenu.classList.toggle('active');
})

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
addEventListener('click', () => {
  hamburgerNav.classList.remove('active');
  navMenu.classList.remove('active');
})
}))

document.addEventListener('scroll', () => {
const desktopNav = document.querySelector('#desktop-nav');
const hamburgerNav = document.querySelector('#hamburger-nav');

if (window.scrollY > 0) {
  desktopNav.classList.add('scrolled');
  hamburgerNav.classList.add('scrolled');
} else {
  desktopNav.classList.remove('scrolled');
  hamburgerNav.classList.remove('scrolled');
}
})
