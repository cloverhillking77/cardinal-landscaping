const CARDINAL_GOOGLE_ADS_ID = 'AW-18376798236';

function initCardinalGoogleAdsTag() {
  if (window.__cardinalGoogleAdsInitialized) return;
  window.__cardinalGoogleAdsInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', CARDINAL_GOOGLE_ADS_ID);

  const hasGoogleTagLibrary = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  if (!hasGoogleTagLibrary) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${CARDINAL_GOOGLE_ADS_ID}`;
    document.head.appendChild(tag);
  }
}

initCardinalGoogleAdsTag();

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
