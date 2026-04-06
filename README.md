# Bewegungsglossar

A simple glossary for therms that may be used in an activist context. Currently live at: https://glossar.aktivismus.org/

## Features

- Backend (powered by Fastify)
    - Fetches Markdown pages from Bookstack.
    - Builds an in-memory term map.
    - REST API:
        - GET /api/terms — list all terms.
        - GET /api/terms/:slug — a single term.
    - Optional: serve static assets for frontend and widget.
- Frontend (powered by React)
    - Fetches terms from the API.
    - Displays a searchable, filterable list.
    - Client-side term detail view.
 - Widget (powered by js bundled using vite)
    - Loads terms from the API.
    - Highlights matching terms in the DOM.
    - Shows a popup/tooltip on click with definition and link to the glossary.

## Widget Usage

Simply include the following in your project to use the widget on any site.

```html
<script type="module" defer src="https://glossar.aktivismus.org/widget/movement-glossary.js"></script>
<link rel="stylesheet" href="https://glossar.aktivismus.org/widget/widget.css">
```

Use the data attributes to customize the behavior.

```html
<script
    type="module"
    defer
    src="https://glossar.aktivismus.org/widget/movement-glossary.js"
    data-id="movement-glossary"
    data-ignoreTags="SCRIPT,STYLE,CODE"
    data-ignoreClasses="no-glossary,skip-glossary"
    data-includeClasses="glossary-content"
></script>
```

<img width="1922" height="1640" alt="screenshot-1" src="https://github.com/user-attachments/assets/8504f6e4-b6b6-4277-ad0e-197b76288944" />

