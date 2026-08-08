const contactForm = document.getElementById('contactForm');
const submitButton = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const maxUploadSize = 5 * 1024 * 1024;

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

  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      send_to: 'AW-17336785310/EsW8CLDHjdUcEJ6z6cpA'
    });
  }

  formStatus.className = 'form-status';
  formStatus.textContent = '';
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  HTMLFormElement.prototype.submit.call(contactForm);
}, true);
