# WebCraft-X

A premium, dark-themed marketing studio website built for **WebCraft** (a high-end studio that builds websites, applications, and AI integrations).

---

## 🚀 Getting Started

This is a build-free, zero-dependency static project containing only raw HTML, CSS, and JavaScript. 

To run this website locally:
1. **Open directly**: Simply double-click `index.html` to open it in any web browser.
2. **Local server (Recommended)**: Serve the workspace folder with any static file server. For example:
   * **Python**: `python -m http.server 8000` (then open `http://localhost:8000`)
   * **Node/npm**: `npx serve .`
   * **VSCode**: Use the *Live Server* extension.

---

## 📂 File Structure

```
webcraft/
├── index.html         # Main semantic structure, copy, and SVG inline icon badges
├── favicon.ico        # Fallback tab icon
├── css/
│   ├── base.css       # CSS reset, Space Grotesk + Inter custom fonts, grain overlay, and theme variables
│   ├── components.css # Buttons, card glassmorphisms, form elements, mobile nav, and modal containers
│   └── sections.css   # Positioning, responsive grids, metrics columns, and browser frame wrappers
├── js/
│   └── script.js      # Sticky nav toggle, progress bar, Intersection Observer reveals, stats count-up,
│                      # coordinates spotlight hover effects, and contact form client-side validator
└── assets/
    └── images/
        └── career_gps_mockup.png # Dashboard screenshot placeholder generated for the portfolio case study
```

---

## 🎨 Design System

WebCraft-X is built strictly around a customized dark color palette to guarantee depth and modern contrast:
- **Base Background**: Layered near-black `#06070A` to secondary `#0D0F14`.
- **Card Surfaces**: Translucent glass `#12141B` with BEM borders.
- **Accents**: Electric Violet `#7C3AED` to Cyan `#22D3EE` gradients.
- **Micro-Animations**: Staggered scroll reveals, hover spring transitions, coordinate-based spotlighting, and loading submit spinners.
- **Contrast**: Maintains high WCAG AA readability contrast throughout.
