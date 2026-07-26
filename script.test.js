const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IntersectionObserverMock;

// Mock window.scrollTo
global.scrollTo = jest.fn();

describe('Frontend Interactions', () => {
  beforeAll(() => {
    // Setup DOM once
    document.documentElement.innerHTML = html.toString();

    // Require script and trigger DOMContentLoaded once
    require('./script.js');

    const event = document.createEvent('Event');
    event.initEvent('DOMContentLoaded', true, true);
    window.document.dispatchEvent(event);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset specific states that might be left over
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTop');

    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }

    if (navMenu) navMenu.classList.remove('active');
    if (navbar) navbar.classList.remove('scrolled');
    if (scrollTopBtn) scrollTopBtn.classList.remove('visible');

    window.scrollY = 0;
  });

  test('Hamburger menu toggles classes and ARIA states', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const icon = hamburger.querySelector('i');

    // Initial state
    expect(hamburger.classList.contains('active')).toBe(false);
    expect(navMenu.classList.contains('active')).toBe(false);
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    expect(icon.classList.contains('fa-bars')).toBe(true);

    // First click: Open menu
    hamburger.click();

    expect(hamburger.classList.contains('active')).toBe(true);
    expect(navMenu.classList.contains('active')).toBe(true);
    expect(hamburger.getAttribute('aria-expanded')).toBe('true');
    expect(icon.classList.contains('fa-times')).toBe(true);
    expect(icon.classList.contains('fa-bars')).toBe(false);

    // Second click: Close menu
    hamburger.click();

    expect(hamburger.classList.contains('active')).toBe(false);
    expect(navMenu.classList.contains('active')).toBe(false);
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    expect(icon.classList.contains('fa-bars')).toBe(true);
  });

  test('Menu closes on link click', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const firstLink = document.querySelector('.nav-item');
    const icon = hamburger.querySelector('i');

    // Open menu first
    hamburger.click();
    expect(navMenu.classList.contains('active')).toBe(true);

    // Click link
    firstLink.click();

    expect(hamburger.classList.contains('active')).toBe(false);
    expect(navMenu.classList.contains('active')).toBe(false);
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    expect(icon.classList.contains('fa-bars')).toBe(true);
    expect(icon.classList.contains('fa-times')).toBe(false);
  });

  test('Menu closes on Escape key press', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const icon = hamburger.querySelector('i');

    // Mock focus method
    hamburger.focus = jest.fn();

    // Open menu first
    hamburger.click();
    expect(navMenu.classList.contains('active')).toBe(true);

    // Press Escape key
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(hamburger.classList.contains('active')).toBe(false);
    expect(navMenu.classList.contains('active')).toBe(false);
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    expect(icon.classList.contains('fa-bars')).toBe(true);
    expect(icon.classList.contains('fa-times')).toBe(false);
    expect(hamburger.focus).toHaveBeenCalled();
  });

  test('Navbar scroll effect and scroll to top button', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTop');

    // Initial state
    expect(navbar.classList.contains('scrolled')).toBe(false);
    expect(scrollTopBtn.classList.contains('visible')).toBe(false);

    // Scroll down slightly
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));

    expect(navbar.classList.contains('scrolled')).toBe(true);
    expect(scrollTopBtn.classList.contains('visible')).toBe(false);

    // Scroll down further
    window.scrollY = 600;
    window.dispatchEvent(new Event('scroll'));

    expect(navbar.classList.contains('scrolled')).toBe(true);
    expect(scrollTopBtn.classList.contains('visible')).toBe(true);

    // Scroll back up
    window.scrollY = 0;
    window.dispatchEvent(new Event('scroll'));

    expect(navbar.classList.contains('scrolled')).toBe(false);
    expect(scrollTopBtn.classList.contains('visible')).toBe(false);
  });
});
