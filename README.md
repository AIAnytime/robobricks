# RoboBricks — Website

Investor-ready marketing site for **RoboBricks**, the cloud platform where robot
capabilities become reusable software ("GitHub + Docker + AWS for robots").

## Stack
Plain, dependency-free static site — HTML + CSS + JS. Fast, portable, and trivial to host.

```
index.html    # all page content
styles.css    # design system + layout
script.js     # nav, scroll reveals, access form, demo interactions
```

## Run locally
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy
Drag the folder into **Netlify Drop**, or:
```bash
npx vercel        # or: npx netlify deploy
```
Also works as-is on GitHub Pages / Cloudflare Pages.

## Customize
- **Copy / sections** — edit `index.html`.
- **Colors, fonts, spacing** — CSS variables at the top of `styles.css` (`:root`).
- **Early-access form** — currently front-end only. Wire the `#accessForm` submit
  handler in `script.js` to Formspree / your backend to capture leads.

## Suggested next steps for the raise
- Add a real logo asset and social/OG preview image.
- Add a `/deck` link or "Download one-pager" button on the CTA.
- Connect the form to a CRM or email service.
- Add a founding-team section once you're ready to name names.

## License

Proprietary — all rights reserved. This code is published for viewing and evaluation only; no use, copying, modification, redistribution, commercial use, or use as AI/ML training data without written permission. See [LICENSE](LICENSE). Commercial licensing: aianytime07@gmail.com · sonu@aianytime.net.
