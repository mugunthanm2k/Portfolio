# Mugunthan | Full Stack Software Developer – 3D Portfolio

React + Vite + Tailwind + Framer Motion + React Three Fiber.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # test the production build
```
Requires Node 18+.

## Customise (all content lives in src/data/)
| File | What to edit |
|---|---|
| `site.js` | Name, initials, email, phone, social links, availability badge, contact-form switch, About text and career timeline |
| `skills.js` | Technology categories |
| `capabilities.js` | "What I can build" cards |
| `projects.js` | Projects (currently SAMPLE demos, labelled as such). Set `sample: false`, add `live`, `github`, `thumbnail`, `screenshots` for real ones. Empty links hide the button. |
| `workflow.js` | 12-step lifecycle and "my approach" items |

Photos: `src/assets/profile.png` (hero) and `src/assets/profile-office.png` (About). Replace the files to change them.

## Switches
- `availability.enabled` (hero badge)
- `contactConfig.enabled` + `contactConfig.endpoint` (enquiry form)
- `servicePromotion.enquiryEnabled` (service enquiry button)

## Contact form → WhatsApp
No backend is needed. When a visitor submits the form, WhatsApp opens (wa.me) with their name, email, category and message pre-filled, addressed to the number in `contactConfig.whatsapp` (`src/data/site.js`). They press Send there. Works on any static host.

## Before going live
1. Replace placeholders in `index.html` (`your-domain.com`, canonical, og:url, JSON-LD url) and `site.js`.
2. Add `public/og-image.jpg` (1200×630) for social previews.
3. Compress the two photos (WebP, ~200 KB) for faster loading.
4. Deploy `dist/`. Netlify (`public/_redirects`) and Vercel (`vercel.json`) are pre-configured. For Nginx use `try_files $uri /index.html;` so the custom 404 page shows for unknown paths.

## Performance notes
3D scenes are lazy-loaded, mount only when scrolled near, use capped pixel ratio, and are replaced with light fallbacks on mobile, WebGL failure or reduced-motion preference.
