---
description: Refactor frontend React/Next.js/TypeScript/Tailwind code for readability and maintainability while preserving behavior.
agent: "agent"
---

# Refactoring and Clean Code Guidelines for frontend made with React + Next.js + TypeScript + Tailwind

## Purpose

The purpose of this refactoring is to enhance the readability, maintainability, and overall quality of the frontend codebase while ensuring that the rendered behavior and appearance remain unchanged. The refactor will focus on improving code clarity, optimizing Tailwind CSS usage, and adhering to best practices in React, Next.js, TypeScript, and Tailwind CSS development.

## Guidelines

- Improve readability and code clarity
- Use clear and descriptive naming for variables, props, and components
- Optimize Tailwind CSS usage; keep classes inline unless reused multiple times
- Explicit TypeScript types for all props (`type Props` by default)
- Use standard function components, avoid `React.FC`
- Optimize performance, keep components pure
- Avoid premature optimization or over-engineering
- Do not extract subcomponents unless necessary
- Keep rendered behavior and appearance identical
- Follow modern Next.js, TypeScript, Tailwind best practices
- Use `export default` for single-component files; `export function` for multiple
- Prefer React icons over manual SVGs; wrap custom SVGs with `currentColor` and `aria-label`
- Keep code comments intact
- Omit `Props` type and parameters if no props are used
