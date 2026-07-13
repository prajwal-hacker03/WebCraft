/* WebCraft-X Interactive Logic & Motion Scripts */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollProgressBar();
  initScrollReveals();
  initCountUpStats();
  initCursorGlow();
  initCardGlows();
  initContactModal();
  initFaqAccordions();
});

/* ==========================================================================
   Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check immediately on load
}

/* ==========================================================================
   Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const burger = document.getElementById('burger-menu');
  const overlay = document.getElementById('mobile-overlay');
  if (!burger || !overlay) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    overlay.classList.toggle('mobile-menu--active');
    document.body.style.overflow = overlay.classList.contains('mobile-menu--active') ? 'hidden' : '';
  });
}

// Global toggle for clicking items in mobile nav
window.toggleMobileMenu = function() {
  const burger = document.getElementById('burger-menu');
  const overlay = document.getElementById('mobile-overlay');
  if (burger && overlay) {
    burger.classList.remove('burger--active');
    overlay.classList.remove('mobile-menu--active');
    document.body.style.overflow = '';
  }
};

/* ==========================================================================
   Scroll Progress Indicator
   ========================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  const updateProgress = () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const scrollPercentage = (window.scrollY / totalScroll) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   Intersection Observer for Scroll Reveals
   ========================================================================== */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

/* ==========================================================================
   Statistics Count-Up Animation
   ========================================================================== */
function initCountUpStats() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1500; // 1.5 seconds animation
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * target);

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target; // Ensure exact final value is set
      }
    };

    requestAnimationFrame(animate);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.2
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/* ==========================================================================
   Cursor Follower Glow (Hero section)
   ========================================================================== */
function initCursorGlow() {
  // Check if mobile or touch device, disable
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  // Create a follower element dynamically so the user doesn't have markup clutter
  const glow = document.createElement('div');
  glow.className = 'glow-blob';
  glow.style.width = '350px';
  glow.style.height = '350px';
  glow.style.background = 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)';
  glow.style.position = 'absolute';
  glow.style.pointerEvents = 'none';
  glow.style.zIndex = '1';
  glow.style.transition = 'transform 0.15s cubic-bezier(0.1, 0.8, 0.3, 1)';
  hero.appendChild(glow);

  const heroRect = hero.getBoundingClientRect();

  hero.addEventListener('mousemove', (e) => {
    const x = e.clientX - heroRect.left - 175; // Subtract half dimensions
    const y = e.pageY - 175; // Coordinate relative to document since follower is absolute
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

/* ==========================================================================
   Spotlight card glows
   ========================================================================== */
function initCardGlows() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cards = document.querySelectorAll('.card-glass');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   Modal Dialog and Contact Form Handling
   ========================================================================== */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeButtons = document.querySelectorAll('.close-modal-trigger');
  
  const form = document.getElementById('project-contact-form');
  const formContainer = document.getElementById('modal-form-container');
  const successContainer = document.getElementById('modal-success-container');

  if (!modal) return;

  // Open logic
  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('modal--active');
    document.body.style.overflow = 'hidden';
    
    // Reset state when opening
    if (formContainer && successContainer) {
      formContainer.style.display = 'block';
      successContainer.style.display = 'none';
    }
  };

  // Close logic
  const closeModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.remove('modal--active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  // Handle ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
      closeModal();
    }
  });

  /* Client-side Validation and simulated submit */
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Fields validation
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const typeSelect = document.getElementById('form-project-type');
      const budgetSelect = document.getElementById('form-budget');
      const msgText = document.getElementById('form-message');

      const nameError = document.getElementById('error-name');
      const emailError = document.getElementById('error-email');
      const typeError = document.getElementById('error-project-type');
      const budgetError = document.getElementById('error-budget');
      const msgError = document.getElementById('error-message');

      // 1. Name Check
      if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        nameInput.style.borderColor = '#EF4444';
        isValid = false;
      } else {
        nameError.style.display = 'none';
        nameInput.style.borderColor = '';
      }

      // 2. Email Check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = '#EF4444';
        isValid = false;
      } else {
        emailError.style.display = 'none';
        emailInput.style.borderColor = '';
      }

      // 3. Project Type Check
      if (!typeSelect.value) {
        typeError.style.display = 'block';
        typeSelect.style.borderColor = '#EF4444';
        isValid = false;
      } else {
        typeError.style.display = 'none';
        typeSelect.style.borderColor = '';
      }

      // 4. Budget Check
      if (!budgetSelect.value) {
        budgetError.style.display = 'block';
        budgetSelect.style.borderColor = '#EF4444';
        isValid = false;
      } else {
        budgetError.style.display = 'none';
        budgetSelect.style.borderColor = '';
      }

      // 5. Message Check
      if (!msgText.value.trim()) {
        msgError.style.display = 'block';
        msgText.style.borderColor = '#EF4444';
        isValid = false;
      } else {
        msgError.style.display = 'none';
        msgText.style.borderColor = '';
      }

      // If valid, submit form
      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Visual indicator of loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting inquiry...</span><svg style="animation: spin 1s linear infinite;" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';

        // Inject dynamic loading spinner stylesheet animation rule
        if (!document.getElementById('spinner-anim')) {
          const style = document.createElement('style');
          style.id = 'spinner-anim';
          style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
          document.head.appendChild(style);
        }

        // Simulate AJAX request
        setTimeout(() => {
          // Success State display transition
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          
          formContainer.style.display = 'none';
          successContainer.style.display = 'flex';
        }, 1500);
      }
    });
  }
}

/* ==========================================================================
   FAQ Accordions (Service sub-pages)
   ========================================================================== */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs for a clean accordian flow
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current FAQ with smooth dynamic scrollHeight transition
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

