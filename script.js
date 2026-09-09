// ============================================
// RISHIKA — PORTFOLIO JS
// ============================================

// --- NAV SCROLL EFFECT ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// --- MOBILE HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// --- SCROLL REVEAL ---
const revealEls = document.querySelectorAll(
  '.hero-content, .hero-visual, .about-text, .about-cards, ' +
  '.project-card, .crm-showcase, .testimonial-card, ' +
  '.contact-left, .contact-form, .section-tag, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// Stagger reveal for grid items
const staggerGroups = [
  '.projects-grid .project-card',
  '.testimonials-grid .testimonial-card',
  '.about-cards .about-card',
  '.avatar-tech-stack span'
];

staggerGroups.forEach(selector => {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(item);
  });
});

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Simulate send (replace with actual form submission / EmailJS / Formspree)
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#22c55e';

    // Add success message
    let successEl = document.querySelector('.form-success');
    if (!successEl) {
      successEl = document.createElement('div');
      successEl.className = 'form-success';
      successEl.textContent = "Thanks! I'll get back to you within 24 hours.";
      contactForm.appendChild(successEl);
    }
    successEl.classList.add('show');

    contactForm.reset();

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      successEl.classList.remove('show');
    }, 4000);
  }, 1500);
});

// --- SMOOTH SCROLL FOR ALL ANCHOR LINKS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- VIDEO TESTIMONIALS MODAL ---
const vtModal = document.getElementById('vtModal');
const vtModalVideo = document.getElementById('vtModalVideo');
const vtModalSource = document.getElementById('vtModalSource');
const vtModalClose = document.getElementById('vtModalClose');
const vtModalBackdrop = document.getElementById('vtModalBackdrop');

document.querySelectorAll('.vt-card').forEach(card => {
  card.addEventListener('click', () => {
    const videoUrl = card.getAttribute('data-video');
    vtModalSource.src = videoUrl;
    vtModalVideo.load();
    vtModalVideo.play();
    vtModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeVtModal() {
  vtModal.classList.remove('open');
  vtModalVideo.pause();
  vtModalVideo.currentTime = 0;
  vtModalSource.src = '';
  document.body.style.overflow = '';
}

vtModalClose.addEventListener('click', closeVtModal);
vtModalBackdrop.addEventListener('click', closeVtModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && vtModal.classList.contains('open')) closeVtModal();
});

// --- CURSOR GLOW (subtle) ---
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});
