# Frontend Styles

This folder keeps the site styles split by responsibility instead of one large file.

## Structure

- `base.css`: global resets, fonts, and root variables
- `shared.css`: reusable utility classes and shared content blocks
- `layout.css`: site-wide layout like navbar, footer, sections, and responsive shells
- `components/`: styles for reusable UI pieces such as the image slider
- `pages/`: styles that belong to a specific page only
- `index.css`: the single entry file that imports everything in order

## Editing Guide

- Put a rule in `pages/` if it is only used by one page.
- Put a rule in `components/` if it belongs to a reusable component.
- Keep shared spacing, cards, and common wrappers in `shared.css` or `layout.css`.
