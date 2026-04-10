---
applyTo: "**/*.tsx,**/*.ts"
description: "Enforce TypeScript and React typing practices for props, state, and safe type usage."
---

# TypeScript Rules for React Code

Apply these rules when creating or refactoring React and Next.js TypeScript code:

- Type component props explicitly using a Props type.
- Prefer type aliases for standalone props and local shapes. Use interface when extending or implementing contracts.
- Avoid React.FC by default.
- Type state explicitly when inference is unclear.
- Avoid any. Prefer explicit types or unknown with narrowing.
- Use union types and discriminated unions when component state has multiple variants.
- Keep types close to usage unless reused across modules.
