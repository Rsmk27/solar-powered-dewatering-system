## 2024-05-19 - Semantic Buttons for Interactive Elements
**Learning:** Using generic `div` tags for interactive elements like hamburger menus and scroll-to-top buttons hurts accessibility as they lack implicit roles and ARIA attributes for screen readers. Using semantic `<button>` elements with `aria-label` provides a better experience. Also keyboard navigation requires explicit `:focus-visible` styling when default button styles are reset.
**Action:** Always prefer `<button>` elements with `aria-label` and `aria-expanded` (if applicable) for interactive controls instead of `div` or `span`. When resetting button styles, always explicitly add `:focus-visible` outline styles for keyboard users.

## 2026-05-21 - Custom Smooth Scroll Destroys Native Focus
**Learning:** Overriding native anchor link behavior (e.g. using `e.preventDefault()` for custom smooth scrolling) breaks native browser focus shifting. This causes keyboard users to lose their place when clicking "Skip to content" or navigational links, forcing them to tab from the top of the page again.
**Action:** Always manually manage focus when overriding native anchor links. Programmatically shift focus to the target element using `targetElement.setAttribute('tabindex', '-1')` and `targetElement.focus()`. Add `[tabindex="-1"]:focus { outline: none; }` to CSS to hide the focus ring on layout containers.
