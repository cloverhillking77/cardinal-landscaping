const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const serviceMenu = document.querySelector('.service-menu');
const serviceMenuButton = document.querySelector('.service-menu-button');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});

serviceMenuButton?.addEventListener('click', () => {
  const isOpen = serviceMenu.classList.toggle('open');
  serviceMenuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    serviceMenu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    serviceMenuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
