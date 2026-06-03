---
name: daisyui-v5
description: Use ONLY when editing DaisyUI components, themes, or classes in this project. Covers v5 syntax (@plugin, @plugin daisyui/theme, --radius-selector, --size-selector, menu, badge, dropdown, btn, collapse, join, drawer) and key differences from v4 (no tailwind.config.js require, no data-theme="light" CDN, no inline tailwind.config scripts).
---

# DaisyUI v5 — Project Conventions

This project uses **DaisyUI v5.5.20** with **Tailwind CSS v4.3.0** via local CLI build (NOT Vite or CDN).

## Build Setup

- Entry point: `src/main.css`
- Build output: `dist/output.css`
- Build command: `npm run build` / `npm run dev` (watch)

## Theme Configuration

All config lives in `src/main.css` — **NOT** in `tailwind.config.js` (does not exist).

```css
@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui/theme" {
  name: "msc";
  default: false;
  --color-primary: #1C58EE;
  --color-base-100: #ffffff;
  --radius-selector: 0.5rem;
  /* etc */
}
```

Custom theme name is `"msc"` — use `data-theme="msc"` to activate it.

## Key v4 → v5 Breaking Changes

| v4 | v5 |
|---|---|
| `tailwind.config.js` with `require('daisyui')` | `@plugin "daisyui"` in CSS |
| `--rounded-badge` (9999px default) | `--radius-selector` (0.5rem default) |
| CDN `<script src="https://cdn.tailwindcss.com">` | Local `<link rel="stylesheet" href="dist/output.css">` |
| Inline `<script>tailwind.config = {...}</script>` | Does NOT work — use `@theme` in CSS instead |

## Component Notes

### Badge
`border-radius` is controlled by `--radius-selector`. Add `rounded-full` class for pill shape.

```html
<span class="badge badge-md rounded-full">Pill badge</span>
```

### Menu
Use `<ul class="menu">` with `<li><a>item</a></li>`. Sub-menus use nested `<ul>`.

### Dropdown
Use `<div class="dropdown dropdown-hover">` with `<div tabindex="0" role="button">` for trigger and `<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">` for content.

### Theme
Pages without `data-theme` or with `data-theme="light"` use DaisyUI's built-in light theme. Use `data-theme="msc"` for the custom MSC theme.

## Custom Colors (defined in `@theme`)

- `primary` → #1C58EE (also `msc-blue`)
- `msc-red` → #EE3124
- `success-available` → #187a41

Use `text-primary`, `bg-primary`, `border-primary` etc. Use `text-msc-blue`, `bg-msc-blue` for the same color.
