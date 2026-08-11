const CARDINAL_GOOGLE_ADS_ID = 'AW-18376798236';
const CARDINAL_PHONE_CONVERSION_ID = 'AW-18376798236/oHUWCMaBq98cEJzg3rpE';
const CARDINAL_PHONE_NUMBER = '(865)297-8983';

function initCardinalGoogleAdsTag() {
  if (window.__cardinalGoogleAdsInitialized) return;
  window.__cardinalGoogleAdsInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', CARDINAL_GOOGLE_ADS_ID);
  window.gtag('config', CARDINAL_PHONE_CONVERSION_ID, {
    phone_conversion_number: CARDINAL_PHONE_NUMBER
  });

  const hasGoogleTagLibrary = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  if (!hasGoogleTagLibrary) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${CARDINAL_GOOGLE_ADS_ID}`;
    document.head.appendChild(tag);
  }
}

function ensureResourcesNavigation() {
  const navigation = document.querySelector('.nav-links');
  if (!navigation) return;

  const estimateLink = navigation.querySelector('.nav-call');
  if (!estimateLink) return;

  let faqLink = Array.from(navigation.querySelectorAll('a')).find(link => link.textContent.trim() === 'FAQs');
  if (!faqLink) {
    faqLink = document.createElement('a');
    faqLink.href = 'index.html#faq';
    faqLink.textContent = 'FAQs';
    navigation.insertBefore(faqLink, estimateLink);
  }

  const existingResources = Array.from(navigation.querySelectorAll('a')).find(link => link.textContent.trim() === 'Resources');
  if (!existingResources) {
    const resourcesLink = document.createElement('a');
    resourcesLink.href = 'resources.html';
    resourcesLink.textContent = 'Resources';
    if (document.body.dataset.page === 'resources' || document.body.dataset.page === 'resource-article') {
      resourcesLink.setAttribute('aria-current', 'page');
    }
    navigation.insertBefore(resourcesLink, estimateLink);
  }
}

initCardinalGoogleAdsTag();
ensureResourcesNavigation();

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
