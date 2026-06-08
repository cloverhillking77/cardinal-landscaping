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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve(result.split(',')[1] || '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const endpoint = contactForm.dataset.endpoint?.trim();
  if (!endpoint) {
    showFormStatus('The form is ready, but the Make webhook URL still needs to be connected.', 'error');
    return;
  }

  formStatus.className = 'form-status';
  formStatus.textContent = '';
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  const data = Object.fromEntries(new FormData(contactForm).entries());
  const photo = document.getElementById('projectPhoto')?.files?.[0];

  try {
    if (photo) {
      if (photo.size > maxUploadSize) {
        throw new Error('Please upload an image smaller than 5MB.');
      }

      data.attachment = {
        filename: photo.name,
        contentType: photo.type,
        content: await fileToBase64(photo)
      };
    }

    delete data.photo;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Your request could not be sent. Please call us instead.');

    contactForm.reset();
    showFormStatus('Thanks! We received your request and will contact you as soon as possible.', 'success');
  } catch (error) {
    showFormStatus(error.message || 'Something went wrong. Please call us instead.', 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Request →';
  }
});
