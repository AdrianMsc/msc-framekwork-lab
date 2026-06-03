---
name: msc-ui-patterns
description: Use ONLY when working on MSC Industrial Supply UI patterns in this project — header/nav bars, dropdown menus, mega menus, search overlay, cart dropdown, breadcrumbs, sticky toolbar, data tables, filter badges, and product cards. NOT for general Tailwind/DaisyUI edits.
---

# MSC UI Patterns — Framework Lab

Project replicating MSC Industrial Supply UI components.

## Header Structure

### Top Utility Bar
- `<div class="hidden md:block bg-slate-100 border-b border-slate-200 py-1">`
- Contains sub-nav items (Solutions, Resources, Deals, Knowledge Center, Notifications) as `<div class="dropdown dropdown-hover">` inside `flex flex-wrap items-center gap-1 md:gap-4`
- Right side: phone number "Need help? Call us 1-800-645-7270"

### Main Header
- `<header class="bg-white border-b border-slate-200 sticky top-0 z-[150]">`
- Contains logo, primary nav (Shop All Products mega menu + Quick Order), search bar, action icons (cart + user)

### Sub-Header / Tool Bar
- Search Feedback + Big Book Catalog links
- Breadcrumbs with `<div class="text-xs md:text-sm breadcrumbs text-slate-600 font-medium">`

### Sticky Toolbar
- `<div id="sticky-toolbar" class="sticky top-20 md:top-20 z-50">`
- Title, item count, view mode toggles (grid/list), sort, filter

## Dropdown Patterns

### Top Bar Dropdowns
```html
<div class="dropdown dropdown-hover">
  <div tabindex="0" role="button"
    class="btn btn-ghost btn-xs text-[11px] font-medium bg-white border-none shadow-sm h-7 min-h-0">
    Label <i class="fa-solid fa-chevron-down text-[8px]"></i>
  </div>
  <ul tabindex="0"
    class="dropdown-content z-[310] menu p-2 shadow bg-base-100 rounded-box w-72">
    <li><a href="...">Item</a></li>
  </ul>
</div>
```

### Mega Menu (Shop All Products)
- Trigger: `font-bold text-slate-700 hover:text-primary text-[14px]`
- Content: `shadow-2xl bg-white rounded-b-xl border-t-[3px] border-primary`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-2`
- Bottom toolbar with links (Clearance, All Brands, NEW Products, etc.)

## Data Table Patterns

- Mobile: 2-column grid (`display: grid !important; grid-template-columns: repeat(2, 1fr)`)
- Desktop: Traditional table with sticky columns
- Details row pattern: `tr.main-row` + `tr.details-row` (hidden/shown on mobile)
- Custom scrollbar with `.custom-scrollbar` class

## Search Overlay

- Container: `.absolute left-0 right-0 top-full z-[200]`
- Sections: Recent Searches, Trending Searches, Popular Categories
- Results: Two-column layout (suggestions left, recommendations right)

## Cart Dropdown

- Trigger: `indicator` with cart icon + item count badge
- Content: `card card-compact w-80 p-2 shadow-2xl bg-white border border-slate-200`
- Shows items, subtotal, "View Cart & Checkout" button

## Filter Badges

- Use `badge badge-md bg-blue-50 text-primary border-blue-100 font-bold`
- With `<i class="fa-solid fa-xmark">` for removal
- Add `rounded-full` class for pill shape (DaisyUI v5 default is 8px radius)

## Font Awesome

- Loaded from CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css`
- Use `fa-solid`, `fa-regular`, `fa-brands` prefixes
- Navbar icons forced to blue via CSS: `.navbar i.fa-solid, .navbar i.fa-regular { color: #1C58EE !important; }`
- Icons inside `.btn` inherit button text color
