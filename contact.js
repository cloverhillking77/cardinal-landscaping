const contactForm = document.getElementById('contactForm');
const submitButton = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const maxUploadSize = 5 * 1024 * 1024;
const CARDINAL_CONTACT_CONVERSION = 'AW-18376798236/d2FcCM3wl98cEUzg3rpE';

const requestedService = new URLSearchParams(window.location.search).get('service');
const serviceSelect = document.getElementById('service');
if (requestedService && serviceSelect) {
  const matchingOption = Array.from(serviceSelect.options).find((option) => option.text === requestedService);
  if (matchingOption) serviceSelect.value = matchingOption.value;
}

function showFormStatus(message, type) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function addHiddenField(name, value) {
  let input = contactForm.querySelector(`input[name="${name}"]`);
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    contactForm.appendChild(input);
  }
  input.value = value;
}

const submitted = new URLSearchParams(window.location.search).get('submitted');
if (submitted === '1') {
  showFormStatus('Thanks! We received your request and will contact you as soon as possible.', 'success');

  // Count the lead only after FormSubmit returns to the success URL.
  // sessionStorage prevents a refresh/back-navigation from creating a duplicate conversion.
  if (sessionStorage.getItem('cardinalLeadPending') === '1' && sessionStorage.getItem('cardinalLeadTracked') !== '1') {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: CARDINAL_CONTACT_CONVERSION,
        value: 50.0,
        currency: 'USD'
      });
      sessionStorage.setItem('cardinalLeadTracked', '1');
    }
    sessionStorage.removeItem('cardinalLeadPending');
  }

  history.replaceState({}, '', 'contact.html');
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  if (!contactForm.reportValidity()) return;

  const photo = document.getElementById('projectPhoto')?.files?.[0];
  if (photo && photo.size > maxUploadSize) {
    showFormStatus('Please upload an image smaller than 5MB.', 'error');
    return;
  }

  const photoInput = document.getElementById('projectPhoto');
  if (photoInput) photoInput.name = 'attachment';

  contactForm.action = 'https://formsubmit.co/rockytopdevshop@gmail.com';
  contactForm.method = 'POST';
  contactForm.enctype = 'multipart/form-data';

  addHiddenField('_subject', 'New Cardinal Landscaping estimate request');
  addHiddenField('_template', 'table');
  addHiddenField('_captcha', 'false');
  addHiddenField('_next', 'https://cardinaltreeserviceknox.com/contact.html?submitted=1');
  addHiddenField('_url', 'https://cardinaltreeserviceknox.com/contact.html');

  const customerEmail = contactForm.querySelector('input[name="email"]')?.value?.trim();
  if (customerEmail) addHiddenField('_replyto', customerEmail);

  // Mark the form as pending. The conversion fires only after the successful return URL loads.
  sessionStorage.setItem('cardinalLeadPending', '1');
  sessionStorage.removeItem('cardinalLeadTracked');

  formStatus.className = 'form-status';
  formStatus.textContent = '';
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  HTMLFormElement.prototype.submit.call(contactForm);
}, true);
