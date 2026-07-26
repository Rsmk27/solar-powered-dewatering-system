const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Mobile menu toggle logic', async (t) => {
    const setupDOM = () => {
        const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
        const dom = new JSDOM(html, { runScripts: 'dangerously' });

        dom.window.IntersectionObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
        dom.window.HTMLElement.prototype.focus = function() {};
        dom.window.scrollTo = () => {};

        const scriptCode = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf8');
        const scriptEl = dom.window.document.createElement('script');
        scriptEl.textContent = scriptCode;
        dom.window.document.body.appendChild(scriptEl);

        dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));

        return dom;
    };

    await t.test('Toggle via hamburger click', () => {
        const dom = setupDOM();
        const document = dom.window.document;
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const icon = hamburger.querySelector('i');

        assert.strictEqual(hamburger.classList.contains('active'), false);

        hamburger.click();
        assert.strictEqual(hamburger.classList.contains('active'), true);
        assert.strictEqual(navMenu.classList.contains('active'), true);
        assert.strictEqual(hamburger.getAttribute('aria-expanded'), 'true');
        assert.strictEqual(icon.classList.contains('fa-times'), true);

        hamburger.click();
        assert.strictEqual(hamburger.classList.contains('active'), false);
        assert.strictEqual(navMenu.classList.contains('active'), false);
        assert.strictEqual(hamburger.getAttribute('aria-expanded'), 'false');
        assert.strictEqual(icon.classList.contains('fa-bars'), true);
    });

    await t.test('Close menu via nav link click', () => {
        const dom = setupDOM();
        const document = dom.window.document;
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLink = document.querySelector('.nav-item');

        hamburger.click();
        assert.strictEqual(hamburger.classList.contains('active'), true);

        navLink.click();
        assert.strictEqual(hamburger.classList.contains('active'), false);
        assert.strictEqual(navMenu.classList.contains('active'), false);
        assert.strictEqual(hamburger.getAttribute('aria-expanded'), 'false');
    });

    await t.test('Close menu via Escape key', () => {
        const dom = setupDOM();
        const document = dom.window.document;
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        let focused = false;
        hamburger.focus = () => { focused = true; };

        hamburger.click();
        assert.strictEqual(hamburger.classList.contains('active'), true);

        const escapeEvent = new dom.window.KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escapeEvent);

        assert.strictEqual(hamburger.classList.contains('active'), false);
        assert.strictEqual(navMenu.classList.contains('active'), false);
        assert.strictEqual(hamburger.getAttribute('aria-expanded'), 'false');
        assert.strictEqual(focused, true);
    });
});
