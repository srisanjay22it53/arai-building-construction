/* =========================================================
   ARAI BUILDING CONSTRUCTION — SCRIPT.JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* Preloader removed */

  const businessEmail = 'info@araibuilding.com';

  document.querySelectorAll('img').forEach(img => {
    if (img.closest('.hero-bg')) return;
    img.loading = img.loading || 'lazy';
    img.decoding = img.decoding || 'async';
  });

  document.querySelectorAll('.counter-icon').forEach((icon, index) => {
    const icons = [
      'fa-building-circle-check',
      'fa-helmet-safety',
      'fa-award',
      'fa-handshake'
    ];
    if (icons[index]) icon.innerHTML = `<i class="fa-solid ${icons[index]}" aria-hidden="true"></i>`;
  });

  document.querySelectorAll('span, p').forEach(el => {
    if (el.childElementCount > 0) return;
    el.textContent = el.textContent
      .replace('â€” ARAI Site Operations', '- ARAI Site Operations')
      .replace('2010â€”built', '2010 - built');
  });

  const whyText = document.querySelector('.why-content .section-text');
  if (whyText) {
    whyText.textContent = 'A good project is not only about materials. It depends on clear decisions, responsible supervision, careful sequencing, and a team that explains issues before they become problems.';
  }

  const footerIntro = document.querySelector('.footer-brand > p');
  if (footerIntro) {
    footerIntro.textContent = 'ARAI Architecture & Design supports clients with practical planning, careful construction coordination, and finish-focused delivery for residential and commercial spaces.';
  }


  /* ---------- 2. STICKY NAVBAR SHADOW ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });


  /* ---------- 3. MOBILE HAMBURGER MENU (MOBILE DRAWER) ---------- */
  // MOBILE MENU START
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileDrawer && mobileOverlay && mobileNav) {
    const getIsOpen = () => mobileDrawer.classList.contains('open');

    const openMenu = () => {
      if (getIsOpen()) return;
      mobileDrawer.classList.add('open');
      mobileOverlay.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileOverlay.setAttribute('aria-hidden', 'false');
    };

    const closeMenu = () => {
      if (!getIsOpen()) return;
      mobileDrawer.classList.remove('open');
      mobileOverlay.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileOverlay.setAttribute('aria-hidden', 'true');
    };

    hamburger.addEventListener('click', () => {
      const isOpen = getIsOpen();
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Click outside (overlay) closes.
    mobileOverlay.addEventListener('click', closeMenu);

    // Escape closes.
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      closeMenu();
    });

    // Clicking a mobile navigation item closes.
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Also close when user clicks outside the drawer (premium UX).
    document.addEventListener('click', (e) => {
      if (!getIsOpen()) return;
      const target = e.target;
      if (mobileDrawer.contains(target)) return;
      if (hamburger.contains(target)) return;
      if (mobileOverlay.contains(target)) return; // overlay click is handled above
      closeMenu();
    });

  }
  // MOBILE MENU END

  /* ---------- 4. ACTIVE NAV LINK ON SCROLL ---------- */



  /* ---------- 4. ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function setActiveNav(){
    const scrollPos = window.scrollY + 140;
    let current = sections[0] ? sections[0].id : '';
    sections.forEach(sec => { if (scrollPos >= sec.offsetTop) current = sec.id; });
    navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${current}`));
  }
  window.addEventListener('scroll', setActiveNav);
  setActiveNav();


  /* ---------- 5. FADE-IN SECTIONS ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));


  /* ---------- ANIMATED COUNTERS ---------- */
  const statNums = document.querySelectorAll('.counter-num');
  function animateCount(el){
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));


  /* ---------- 6. PROJECT GALLERY FILTER ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryEmpty = document.getElementById('galleryEmpty');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      galleryItems.forEach(item => {
        const matches = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('filtered-out', !matches);
        if (matches) visibleCount++;
      });

      galleryEmpty.classList.toggle('show', visibleCount === 0);
    });
  });


  /* ---------- TESTIMONIAL SLIDER ---------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const slides = track ? Array.from(track.children) : [];
  let currentSlide = 0;
  let autoSlideTimer;

  function buildDots(){
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });
  }
  function goToSlide(index){
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    resetAutoSlide();
  }
  function resetAutoSlide(){
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }
  if (track && slides.length){
    buildDots();
    resetAutoSlide();
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }


  /* ---------- CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const validators = {
    name: value => value.trim().length >= 2 ? '' : 'Please enter your full name.',
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
    phone: value => /^[+()\d\s-]{7,20}$/.test(value.trim()) ? '' : 'Please enter a valid phone number.',
    message: value => value.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
  };

  function showFieldError(field, message){
    const input = document.getElementById(field);
    const errorEl = document.getElementById(`${field}Error`);
    if (message){ input.classList.add('invalid'); errorEl.textContent = message; }
    else { input.classList.remove('invalid'); errorEl.textContent = ''; }
  }

  if (form){
    Object.keys(validators).forEach(field => {
      const input = document.getElementById(field);
      input.addEventListener('blur', () => showFieldError(field, validators[field](input.value)));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      Object.keys(validators).forEach(field => {
        const input = document.getElementById(field);
        const error = validators[field](input.value);
        showFieldError(field, error);
        if (error) isValid = false;
      });
      if (!isValid){ formSuccess.classList.remove('show'); return; }
      const serviceSelect = document.getElementById('service');
      const quoteDetails = [
        `Name: ${document.getElementById('name').value.trim()}`,
        `Email: ${document.getElementById('email').value.trim()}`,
        `Phone: ${document.getElementById('phone').value.trim()}`,
        `Service: ${serviceSelect.options[serviceSelect.selectedIndex].text}`,
        '',
        'Project Details:',
        document.getElementById('message').value.trim()
      ].join('\n');
      const mailto = `mailto:${businessEmail}?subject=${encodeURIComponent('New project quote request')}&body=${encodeURIComponent(quoteDetails)}`;
      formSuccess.classList.add('show');
      formSuccess.innerHTML = '<i class="fa-solid fa-circle-check"></i> Your email app is opening with the quote details ready to send.';
      window.location.href = mailto;
      form.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    });
  }


  /* ---------- 7. BACK TO TOP BUTTON ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- FLOATING CHATBOT ---------- */
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');

  const chatReplies = {
    services: 'We handle residential architecture, commercial spaces, renovation, planning, project management, and interior finishing. Share your project type and approximate size so we can suggest the right next step.',
    estimate: 'For an estimate, we usually need the site location, project type, approximate area, preferred timeline, and any reference ideas or drawings. You can send those details through the contact form or WhatsApp.',
    timeline: 'Timeline depends on project size, approvals, material selection, and site readiness. Small renovations may move faster, while full builds need proper planning, procurement, and staged execution.',
    contact: 'You can call +1 (555) 234-7890, email info@araibuilding.com, or message us on WhatsApp using the green button on this page.',
    default: 'Thanks for your question. For the most accurate answer, please share your project type, location, approximate size, and what you want to achieve. Our team can then guide you with practical next steps.'
  };

  function addChatMessage(text, type = 'bot'){
    if (!chatbotMessages) return;
    const message = document.createElement('div');
    message.className = `chat-message ${type}`;
    message.textContent = text;
    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function getChatReply(text){
    const value = text.toLowerCase();
    if (value.includes('service') || value.includes('work') || value.includes('design')) return chatReplies.services;
    if (value.includes('estimate') || value.includes('quote') || value.includes('cost') || value.includes('price') || value.includes('budget')) return chatReplies.estimate;
    if (value.includes('time') || value.includes('timeline') || value.includes('duration') || value.includes('long')) return chatReplies.timeline;
    if (value.includes('contact') || value.includes('call') || value.includes('phone') || value.includes('email') || value.includes('whatsapp')) return chatReplies.contact;
    return chatReplies.default;
  }

  function setChatOpen(isOpen){
    if (!chatbotPanel || !chatbotToggle) return;
    chatbotPanel.classList.toggle('open', isOpen);
    chatbotToggle.setAttribute('aria-expanded', isOpen);
    if (isOpen && chatbotInput) setTimeout(() => chatbotInput.focus(), 150);
  }

  if (chatbotToggle && chatbotPanel){
    chatbotToggle.addEventListener('click', () => setChatOpen(!chatbotPanel.classList.contains('open')));
    chatbotClose.addEventListener('click', () => setChatOpen(false));

    document.querySelectorAll('.chatbot-quick button').forEach(button => {
      button.addEventListener('click', () => {
        const key = button.dataset.question;
        addChatMessage(button.textContent, 'user');
        setTimeout(() => addChatMessage(chatReplies[key] || chatReplies.default), 250);
      });
    });

    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = chatbotInput.value.trim();
      if (!question) return;
      addChatMessage(question, 'user');
      chatbotInput.value = '';
      setTimeout(() => addChatMessage(getChatReply(question)), 250);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatbotPanel.classList.contains('open')) setChatOpen(false);
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
