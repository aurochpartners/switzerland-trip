/**
 * Navigation Module
 * Handles mobile menu toggle, smooth scrolling, and scroll-aware navbar
 */

(function() {
  'use strict';

  // DOM Elements
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // State
  let lastScrollY = 0;
  let ticking = false;

  /**
   * Toggle mobile navigation menu
   */
  function toggleNav() {
    if (navLinks) {
      navLinks.classList.toggle('open');
      
      // Update aria-expanded
      const isOpen = navLinks.classList.contains('open');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.textContent = isOpen ? '✕' : '☰';
      }
    }
  }

  /**
   * Close mobile nav when clicking a link
   */
  function closeNavOnClick() {
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      }
    }
  }

  /**
   * Handle scroll to show/hide navbar
   */
  function handleScroll() {
    const currentScrollY = window.pageYOffset;
    
    if (!nav) return;
    
    // Always show nav near top of page
    if (currentScrollY <= 100) {
      nav.classList.remove('hidden');
      return;
    }
    
    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
  }

  /**
   * Throttled scroll handler
   */
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  /**
   * Smooth scroll to anchor
   */
  function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Handle anchor link clicks
   */
  function handleAnchorClick(e) {
    const href = this.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
      closeNavOnClick();
    }
  }

  /**
   * Initialize navigation
   */
  function init() {
    // Mobile toggle
    if (navToggle) {
      navToggle.addEventListener('click', toggleNav);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Close mobile nav when clicking links
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNavOnClick);
      });
    }

    // Scroll handler
    window.addEventListener('scroll', onScroll, { passive: true });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks && navLinks.classList.contains('open')) {
        if (!nav.contains(e.target)) {
          closeNavOnClick();
        }
      }
    });

    // Close nav on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeNavOnClick();
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose toggle function globally for inline onclick
  window.toggleNav = toggleNav;
})();
