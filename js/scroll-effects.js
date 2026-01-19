/**
 * Scroll Effects Module
 * Intersection Observer based animations for fade-in effects
 */

(function() {
  'use strict';

  /**
   * Add CSS for animations
   */
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Fade in from bottom */
      .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Fade in from left */
      .fade-in-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .fade-in-left.visible {
        opacity: 1;
        transform: translateX(0);
      }
      
      /* Fade in from right */
      .fade-in-right {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .fade-in-right.visible {
        opacity: 1;
        transform: translateX(0);
      }
      
      /* Scale in */
      .scale-in {
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
      }
      
      .scale-in.visible {
        opacity: 1;
        transform: scale(1);
      }
      
      /* Staggered children */
      .stagger-children > * {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.4s ease-out, transform 0.4s ease-out;
      }
      
      .stagger-children.visible > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
      .stagger-children.visible > *:nth-child(2) { transition-delay: 100ms; opacity: 1; transform: translateY(0); }
      .stagger-children.visible > *:nth-child(3) { transition-delay: 200ms; opacity: 1; transform: translateY(0); }
      .stagger-children.visible > *:nth-child(4) { transition-delay: 300ms; opacity: 1; transform: translateY(0); }
      .stagger-children.visible > *:nth-child(5) { transition-delay: 400ms; opacity: 1; transform: translateY(0); }
      .stagger-children.visible > *:nth-child(6) { transition-delay: 500ms; opacity: 1; transform: translateY(0); }
      .stagger-children.visible > *:nth-child(7) { transition-delay: 600ms; opacity: 1; transform: translateY(0); }
      .stagger-children.visible > *:nth-child(8) { transition-delay: 700ms; opacity: 1; transform: translateY(0); }
      .stagger-children.visible > *:nth-child(9) { transition-delay: 800ms; opacity: 1; transform: translateY(0); }
      
      /* Parallax effect for hero backgrounds */
      .parallax-bg {
        background-attachment: fixed;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .fade-in,
        .fade-in-left,
        .fade-in-right,
        .scale-in,
        .stagger-children > * {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
      
      /* Mobile: disable parallax (performance) */
      @media (max-width: 768px) {
        .parallax-bg {
          background-attachment: scroll;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Initialize Intersection Observer
   */
  function init() {
    // Inject animation styles
    injectStyles();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Just make everything visible immediately
      document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-children').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    // Create observer
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after animation (saves resources)
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-children'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // Auto-add animation classes to common elements
    autoAnimateElements();
  }

  /**
   * Automatically add animation classes to common elements
   * Call this if you want automatic animations without manual class adding
   */
  function autoAnimateElements() {
    // Cards get fade-in
    document.querySelectorAll('.card, .hotel-card, .option-card').forEach((el, i) => {
      if (!el.classList.contains('fade-in')) {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 100}ms`;
      }
    });

    // Timeline items get staggered fade-in
    document.querySelectorAll('.timeline').forEach(timeline => {
      if (!timeline.classList.contains('stagger-children')) {
        timeline.classList.add('stagger-children');
      }
    });

    // Section titles get fade-in
    document.querySelectorAll('.section-header').forEach(el => {
      if (!el.classList.contains('fade-in')) {
        el.classList.add('fade-in');
      }
    });

    // Re-observe new elements
    if (window.scrollEffectsObserver) {
      document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        window.scrollEffectsObserver.observe(el);
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use
  window.autoAnimateElements = autoAnimateElements;
})();
