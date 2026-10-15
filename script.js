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

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();