/**
 * Accordion Module
 * Handles expandable/collapsible content sections
 */

(function() {
  'use strict';

  /**
   * Toggle accordion item
   */
  function toggleAccordion(header) {
    const item = header.closest('.accordion-item');
    if (!item) return;

    const content = item.querySelector('.accordion-content');
    const isActive = item.classList.contains('active');

    // Close all siblings (for single-open accordion)
    const accordion = item.closest('.accordion');
    if (accordion && accordion.dataset.singleOpen === 'true') {
      accordion.querySelectorAll('.accordion-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Toggle current item
    item.classList.toggle('active');
    header.setAttribute('aria-expanded', !isActive);

    // Animate content height
    if (content) {
      if (!isActive) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    }
  }

  /**
   * Initialize accordions
   */
  function init() {
    // Find all accordion headers
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
      // Set initial ARIA attributes
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('tabindex', '0');

      // Click handler
      header.addEventListener('click', () => toggleAccordion(header));

      // Keyboard handler (Enter/Space)
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAccordion(header);
        }
      });
    });

    // Set initial state for any pre-opened items
    document.querySelectorAll('.accordion-item.active').forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      if (header) header.setAttribute('aria-expanded', 'true');
      if (content) content.style.maxHeight = content.scrollHeight + 'px';
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use
  window.toggleAccordion = toggleAccordion;
})();
