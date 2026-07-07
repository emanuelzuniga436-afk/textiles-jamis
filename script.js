// ============ MENÚ MÓVIL ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ============ REVEAL AL HACER SCROLL ============
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ============ CALCULADORA DE TELAS ============
const telaCards = document.querySelectorAll('.tela-card');
const calcSelected = document.getElementById('calcSelected');
const calcTotal = document.getElementById('calcTotal');
const metrosInput = document.getElementById('metros');

let telaActiva = null;

function formatoCOP(valor) {
  return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

function actualizarTotal() {
  if (!telaActiva) return;
  const precio = Number(telaActiva.dataset.price);
  const metros = Math.max(1, Number(metrosInput.value) || 0);
  const total = precio * metros;
  calcTotal.textContent = formatoCOP(total);
}

telaCards.forEach(card => {
  card.addEventListener('click', () => {
    telaCards.forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');
    telaActiva = card;
    calcSelected.textContent = `${card.dataset.name} · ${card.dataset.color}`;
    actualizarTotal();
  });
});

metrosInput.addEventListener('input', actualizarTotal);

// Selecciona la primera tela por defecto
if (telaCards.length) {
  telaCards[0].click();
}

// ============ FORMULARIO DE CONTACTO ============
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = contactForm.nombre.value.trim();
  formStatus.textContent = `¡Gracias${nombre ? ', ' + nombre : ''}! Recibimos tu mensaje y te responderemos pronto.`;
  contactForm.reset();
});

// ============ SOMBRA DE NAVBAR AL HACER SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10 ? '0 2px 18px rgba(11,37,69,.08)' : 'none';
});
