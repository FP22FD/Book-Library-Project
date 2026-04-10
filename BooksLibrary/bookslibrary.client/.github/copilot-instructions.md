> Source of truth: this file is the primary instruction file for the repository.
> .github/AGENTS.md is intentionally minimal and points here.

# Frontend Agents Guide

This guide documents the use of AI agents, Copilot, and automation tools in the frontend of the BooksLibrary project.
The frontend is a SPA React application built with Next.js 16, TypeScript 5, and Tailwind CSS 3.

## Purpose

- Accelerate development with AI while maintaining clean code, refactoring standards, and project consistency.
- Provide guidelines for AI-assisted code generation, component creation, and styling in the frontend stack.
- Ensure AI-generated code is reviewed, maintainable, and aligned with project conventions.

## Recommended Practices

- Always review AI-generated code before committing.
- Use AI agents for repetitive tasks: boilerplate components, TypeScript types, Tailwind layouts.
- Keep generated code aligned with the project's `prompts/frontend-clean-refactoring.prompt.md` standards.
- Document AI-generated logic if complex or non-obvious.
- Avoid over-reliance on AI for critical business logic.
- Use React icons when generating UI elements instead of manual SVGs.
- Optimize generated components to avoid unnecessary re-renders.
- Keep all prompts, agent scripts, and configuration versioned in the repo.

## Example Use Cases

- Generating new React components with Tailwind CSS classes.
- Refactoring existing components for readability and performance.
- Writing reusable TypeScript `type` or `interface` definitions.
- Suggesting responsive layouts, accessible HTML, and ARIA attributes.
- Helping with tests: React Testing Library patterns, unit or integration test suggestions.

## References

- See `prompts/frontend-clean-refactoring.prompt.md` for clean code and refactoring guidelines.
- Follow project conventions for component structure, naming, and TypeScript types.
- Align AI usage with team practices and code review standards.

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
