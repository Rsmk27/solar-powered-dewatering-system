## 2024-05-19 - Semantic Buttons for Interactive Elements
**Learning:** Using generic `div` tags for interactive elements like hamburger menus and scroll-to-top buttons hurts accessibility as they lack implicit roles and ARIA attributes for screen readers. Using semantic `<button>` elements with `aria-label` provides a better experience. Also keyboard navigation requires explicit `:focus-visible` styling when default button styles are reset.
**Action:** Always prefer `<button>` elements with `aria-label` and `aria-expanded` (if applicable) for interactive controls instead of `div` or `span`. When resetting button styles, always explicitly add `:focus-visible` outline styles for keyboard users.

## 2026-05-22 - JS Variables vs Class Names in DOM Selection
**Learning:** When trying to fix a bug in a DOM script that selects a class like `.nav-link`, changing the JS query selector variable to point to a container class like `.nav-item` can easily introduce subtle regressions if the rest of the script relies on the element being an anchor tag (e.g., trying to read an `href`).
**Action:** Instead of changing the JavaScript selector to accommodate missing classes, fix the HTML by adding the expected classes (like `.nav-link`) to the correct semantic elements (like `<a>`). This maintains the integrity of the JS logic while fixing the behavioral bug.
