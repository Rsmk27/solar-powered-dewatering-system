## 2024-05-19 - Semantic Buttons for Interactive Elements
**Learning:** Using generic `div` tags for interactive elements like hamburger menus and scroll-to-top buttons hurts accessibility as they lack implicit roles and ARIA attributes for screen readers. Using semantic `<button>` elements with `aria-label` provides a better experience. Also keyboard navigation requires explicit `:focus-visible` styling when default button styles are reset.
**Action:** Always prefer `<button>` elements with `aria-label` and `aria-expanded` (if applicable) for interactive controls instead of `div` or `span`. When resetting button styles, always explicitly add `:focus-visible` outline styles for keyboard users.

## 2024-05-19 - Smooth Scroll Accessibility Focus
**Learning:** Custom JavaScript smooth scrolling solutions that intercept anchor links and prevent default behavior (`e.preventDefault()`) break native browser focus management. When a user clicks a skip link or navigates via keyboard, their focus remains at the origin instead of moving to the target element.
**Action:** Always manually move focus when implementing custom smooth scrolling by setting `tabindex="-1"` on the target element and calling `.focus({ preventScroll: true })` after triggering the scroll animation.
