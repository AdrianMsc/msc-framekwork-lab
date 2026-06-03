---
name: tailwind-v4-migration
description: Use ONLY when dealing with Tailwind CSS v4 syntax, @theme configuration, @import, or when editing HTML that was migrated from CDN-based Tailwind v3 to local CLI-based v4. Covers breaking changes, @theme token registration, CSS-first config, and removal of tailwind.config.js.
---

# Tailwind CSS v4 — Migration Conventions

This project migrated from **Tailwind CDN (v3) + inline config** to **Tailwind CLI (v4.3.0)**.

## Key Changes

### What Changed
- **No `tailwind.config.js`** — all config is in `src/main.css`
- **No inline `<script>tailwind.config = {...}</script>`** — does NOT work with CLI build
- **No CDN `<script src="https://cdn.tailwindcss.com">`** — replaced with `<link rel="stylesheet" href="dist/output.css">`
- **No DaisyUI CDN CSS links** — DaisyUI v5 loaded via `@plugin "daisyui"`

### Build System
```json
// package.json
"scripts": {
  "dev": "npx @tailwindcss/cli -i src/main.css -o dist/output.css --watch",
  "build": "npx @tailwindcss/cli -i src/main.css -o dist/output.css"
}
```

### CSS Entry Point (`src/main.css`)
```css
@import "tailwindcss";
@plugin "daisyui";

@theme {
  --color-primary: #1C58EE;
  --color-msc-blue: #1C58EE;
  --font-sans: "Roboto", sans-serif;
  --shadow-premium: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@plugin "daisyui/theme" {
  name: "msc";
  default: false;
  /* DaisyUI theme tokens here */
}
```

## v4 Syntax Changes

### `@theme` block
- Use `--color-*`, `--font-*`, `--shadow-*`, `--animate-*` to register custom design tokens
- NOT the old `theme.extend.colors` from `tailwind.config.js`
- CSS variable names after the prefix become the utility class name (e.g., `--color-msc-blue` → `text-msc-blue`, `bg-msc-blue`)

### Keyframes / Animations
```css
@theme {
  --animate-gradient-x: gradient-x 15s ease infinite;
}
@keyframes gradient-x {
  0%, 100% { background-size: 200% 200%; background-position: left center; }
  50% { background-size: 200% 200%; background-position: right center; }
}
```

### No `@tailwind base/components/utilities`
Just `@import "tailwindcss"` — that's it.

### DaisyUI Plugins
```css
@plugin "daisyui";
@plugin "daisyui/theme" { ... }
```

## HTML Migration Checklist

When migrating a page:
- [ ] Remove `<script src="https://cdn.tailwindcss.com">` 
- [ ] Remove inline `<script>tailwind.config = {...}</script>` 
- [ ] Remove DaisyUI CSS CDN `<link>` or `<style>` imports
- [ ] Add `<link rel="stylesheet" href="dist/output.css">` 
- [ ] Verify no remaining `cdn.tailwindcss.com` references
- [ ] If page uses custom font, add via `<link href="https://fonts.googleapis.com/..." rel="stylesheet">` in `<head>`

## Common Pitfalls

- `@apply` with `!important` may not work the same way
- Arbitrary values like `w-[95vw]` work the same
- `font-sans` now resolves to `--font-sans` from `@theme`
- DaisyUI v5 class names are mostly the same as v4, but theme variables differ
