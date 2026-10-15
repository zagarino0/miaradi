(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const slides = Array.from(document.querySelectorAll('.hero-bg'));
  const slideNumber = document.getElementById('slide-number');
  let activeSlide = 0;
  if (slides.length && !reducedMotion) {
    window.setInterval(() => {
      slides[activeSlide].classList.remove('is-active');
      activeSlide = (activeSlide + 1) % slides.length;
      slides[activeSlide].classList.add('is-active');
      if (slideNumber) slideNumber.textContent = String(activeSlide + 1).padStart(2, '0');
    }, 5000);
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const circuitSelect = document.getElementById('circuit');
  const requestedCircuit = new URLSearchParams(window.location.search).get('circuit');
  if (circuitSelect && requestedCircuit) {
    const matchingOption = Array.from(circuitSelect.options).find(option =>
      option.value.trim().toLocaleLowerCase('fr') === requestedCircuit.trim().toLocaleLowerCase('fr') ||
      option.textContent.trim().toLocaleLowerCase('fr') === requestedCircuit.trim().toLocaleLowerCase('fr')
    );
    if (matchingOption) circuitSelect.value = matchingOption.value || matchingOption.textContent.trim();
  }
  document.querySelectorAll('[data-circuit]').forEach(card => {
    card.addEventListener('click', () => {
      if (circuitSelect) circuitSelect.value = card.dataset.circuit;
    });
  });

  const form = document.getElementById('quote-form');
  const note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Demande de voyage — Miaradi');
      const body = encodeURIComponent(
        'Bonjour Miaradi,\n\n' +
        'Nom : ' + (data.get('name') || '') + '\n' +
        'E-mail : ' + (data.get('email') || '') + '\n' +
        'Circuit : ' + (data.get('circuit') || 'Ouvert aux suggestions') + '\n\n' +
        'Projet :\n' + (data.get('message') || '') + '\n\n' +
        'Envoyé depuis le site Miaradi.'
      );
      if (note) note.textContent = 'Votre messagerie va s’ouvrir avec votre demande préremplie. Vérifiez puis envoyez le message.';
      window.location.href = 'mailto:rrazafindrafita@gmail.com?subject=' + subject + '&body=' + body;
    });
  }

  const testimonialCards = Array.from(document.querySelectorAll('.testimonial'));
  let testimonialIndex = 0;
  const showTestimonial = index => {
    if (!testimonialCards.length) return;
    testimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
    testimonialCards.forEach((card, i) => card.classList.toggle('is-current', i === testimonialIndex));
  };
  const previousTestimonial = document.getElementById('testimonial-prev');
  const nextTestimonial = document.getElementById('testimonial-next');
  if (previousTestimonial) previousTestimonial.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
  if (nextTestimonial) nextTestimonial.addEventListener('click', () => showTestimonial(testimonialIndex + 1));

  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterNote = document.getElementById('newsletter-note');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = encodeURIComponent('Inscription aux actualités Miaradi');
      const body = encodeURIComponent('Bonjour Miaradi,\\n\\nJe souhaite recevoir des inspirations de voyage.\\nMon e-mail : ' + email);
      if (newsletterNote) newsletterNote.textContent = 'Votre messagerie va s’ouvrir. Envoyez le message pour confirmer votre demande.';
      window.location.href = 'mailto:rrazafindrafita@gmail.com?subject=' + subject + '&body=' + body;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();