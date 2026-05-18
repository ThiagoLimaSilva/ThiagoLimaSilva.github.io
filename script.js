/* ===================================
   Portfolio — Thiago Lima Silva
   Interactive Scripts
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------
  // Header scroll effect
  // ---------------------------------
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ---------------------------------
  // Mobile menu
  // ---------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('mobile-menu-close');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  const openMenu = () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // ---------------------------------
  // Project filter pills
  // ---------------------------------
  const filterBtns = document.querySelectorAll('#project-filters .pill-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active pill
      filterBtns.forEach(b => b.classList.remove('pill-btn--active'));
      btn.classList.add('pill-btn--active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'todos' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---------------------------------
  // Scroll-reveal animation
  // ---------------------------------
  const animElements = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered reveal
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animElements.forEach(el => revealObserver.observe(el));

  // ---------------------------------
  // Smooth scroll for anchor links
  // ---------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------------------------------
  // Active nav link on scroll
  // ---------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

  const activateNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav-link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-link--active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNav);
});
