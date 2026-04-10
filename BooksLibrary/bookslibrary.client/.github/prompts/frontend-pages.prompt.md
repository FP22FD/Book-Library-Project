---
description: Generate clean, responsive Next.js frontend pages using TypeScript and Tailwind conventions.
agent: "agent"
---

# Frontend Page Prompts (Generic)

This file contains generic AI prompts for generating frontend pages in Next.js + TypeScript + Tailwind projects.
Each prompt references the frontend skill rules to keep code clean, readable, responsive, and consistent.

## Generic Page Prompt

Generate a Next.js + TypeScript page for a frontend feature called `Book Details Page`.

Requirements:

- Page should receive props/data as needed (replace placeholders below):
  - `id`, `title`, `author`, `coverUrl`, `rating`, `description`
- Layout should include the following sections (replace as needed):
  - `[SECTION_1]` (e.g., cover image, title, author, description, back to library link)
  - `[SECTION_2]` (e.g., buttons, icons, ratings)
  - `[SECTION_N]` (e.g., responsive design, accessibility features)
- Follow all frontend skill rules:
  - Clean code, inline Tailwind classes, TypeScript `type Props`, pure React components, React icons, accessibility, responsive design
- Keep code readable and consistent with existing pages
- Include placeholder handling for missing data
- Use default export for single component files
- Keep comments and structure consistent
- Avoid unnecessary subcomponents unless justified

Usage:

- Replace placeholders `[PROP_NAME]` and `[SECTION]` with the actual props or page sections.
- Copy the prompt into AI (Copilot, ChatGPT, or other) to generate the page.

---

## Example: Book Details Page

- Props: `id`, `title`, `author`, `coverUrl`, `rating`, `description`
- Layout: cover image, title, author, rating stars, description, back link
- Use the generic prompt above, filling placeholders with the above props and layout.
