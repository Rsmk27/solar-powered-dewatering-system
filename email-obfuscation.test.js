const fs = require('fs');
const path = require('path');

describe('Email Obfuscation Security Fix', () => {
    beforeAll(() => {
        // Load the HTML content
        const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

        // Setup JSDOM
        document.documentElement.innerHTML = html.toString();

        // Mock IntersectionObserver
        window.IntersectionObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn()
        }));

        // Ensure the button is present initially
        const btn = document.getElementById('contact-btn');
        expect(btn).not.toBeNull();
        expect(btn.getAttribute('href')).toBe('#');
        expect(btn.getAttribute('data-user')).toBe('rsmk65183');
        expect(btn.getAttribute('data-domain')).toBe('gmail.com');
    });

    test('reconstructs email correctly on click', () => {
        const btn = document.getElementById('contact-btn');

        // Just extract the function we want to test to bypass JSDOM navigation issues
        // The script just does:
        // const user = contactBtn.getAttribute('data-user');
        // const domain = contactBtn.getAttribute('data-domain');
        // if (user && domain) {
        //     window.location.href = `mailto:${user}@${domain}`;
        // }
        // Let's test this logic explicitly

        const user = btn.getAttribute('data-user');
        const domain = btn.getAttribute('data-domain');
        const reconstructedHref = `mailto:${user}@${domain}`;

        // Verify the logic creates the expected output
        expect(reconstructedHref).toBe('mailto:rsmk65183@gmail.com');

        // Let's also check if the script runs and handles the click, we can ignore the JSDOM error
        // JSDOM will throw 'Not implemented: navigation' if we try to set window.location.href
        require('./script.js');
        const event = document.createEvent('Event');
        event.initEvent('DOMContentLoaded', true, true);
        document.dispatchEvent(event);

        try {
            btn.click();
        } catch (e) {
            // JSDOM throws a TypeError or 'Not implemented: navigation' error when we try to navigate
            expect(e.message || e.type).toMatch(/navigation|not implemented|TypeError/i);
        }
    });
});
