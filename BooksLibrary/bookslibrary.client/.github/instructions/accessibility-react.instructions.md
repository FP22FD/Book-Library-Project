---
applyTo: "**/*.tsx,**/*.ts"
description: "Apply React accessibility guardrails for semantic HTML, ARIA, keyboard navigation, and image/icon labeling."
---

# Accessibility Rules for React Components

Apply these rules when creating or refactoring React/Next.js components:

- Use semantic HTML elements first (`header`, `main`, `footer`, `nav`, `button`, `form`, `label`, `section`, `article`).
- Do not use `div` or `span` for interactive controls when a semantic element exists.
- Add ARIA roles/attributes only when semantic HTML is not sufficient.
- Ensure icon-only controls include an accessible name via `aria-label`.
- Ensure all meaningful images include `alt` text. Decorative images should use empty `alt`.
- Preserve visible focus states and keyboard operability for interactive elements.
- Verify keyboard tab order follows visual and logical reading order.
- Prefer sufficient color contrast for text and interactive states.

When suggesting code changes, include accessibility-friendly defaults by design, not as an afterthought.
