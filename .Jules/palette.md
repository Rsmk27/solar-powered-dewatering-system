## 2024-05-19 - Semantic Buttons for Interactive Elements
**Learning:** Using generic `div` tags for interactive elements like hamburger menus and scroll-to-top buttons hurts accessibility as they lack implicit roles and ARIA attributes for screen readers. Using semantic `<button>` elements with `aria-label` provides a better experience. Also keyboard navigation requires explicit `:focus-visible` styling when default button styles are reset.
**Action:** Always prefer `<button>` elements with `aria-label` and `aria-expanded` (if applicable) for interactive controls instead of `div` or `span`. When resetting button styles, always explicitly add `:focus-visible` outline styles for keyboard users.

## 2026-05-23 - Overlay Accessibility and Invisible Interactive Elements
**Learning:** Interactive elements hidden with `opacity: 0` are still focusable by keyboard, leading to confusing tab cycles for screen reader and keyboard users. Additionally, custom overlays (like mobile navigation menus) must trap focus or at least support the `Escape` key to be properly accessible and dismissible.
**Action:** Always combine `opacity: 0` with `visibility: hidden` (or `display: none`) for interactive elements that are not currently meant to be used. Ensure all custom modal/overlay menus can be closed with the `Escape` key and return focus to their trigger.
