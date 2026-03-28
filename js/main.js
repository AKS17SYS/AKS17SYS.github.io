const header = document.querySelector('.site-header');
const nav = document.querySelector('#site-nav');
const toggle = document.querySelector('.nav-toggle');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 10);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealNodes = document.querySelectorAll('.reveal');
if (revealNodes.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
  });

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('in'));
}

const track = document.getElementById('screens-track');
const prev = document.getElementById('slide-prev');
const next = document.getElementById('slide-next');

if (track && prev && next) {
  const getStep = () => {
    const firstCard = track.querySelector('img');
    if (!firstCard) return 240;
    const cardWidth = firstCard.getBoundingClientRect().width;
    return Math.round(cardWidth + 14);
  };

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -getStep() * 2, behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    track.scrollBy({ left: getStep() * 2, behavior: 'smooth' });
  });
}

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
