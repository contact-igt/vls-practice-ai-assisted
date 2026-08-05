# VLS Law Academy — Decoding of Practice Workspace Rules

## Always On

These rules apply to every task in this workspace without exception.

---

## Engineering

- Inspect existing code before changing any architecture.
- Preserve the Next.js Pages Router, routing, build system and Vercel deployment.
- Reuse existing components and CSS Module patterns.
- Prefer native HTML, CSS and browser APIs.
- Do not install packages without a clear, demonstrated need.
- Do not introduce speculative abstractions or rewrites.
- Preserve TypeScript/JSX safety where applicable.
- Remove unused imports and debug `console.log` calls before finalising.
- Never replace a real integration (Razorpay, Google Sheets, WhatsApp API, Meta Pixel, GTM) with mock functionality.
- All program configuration (date, fee, mode, language) must live in `src/constants/Home/index.jsx` — nowhere else.

---

## Branding

- VLS Law Academy official website (`vlslawacademy.com`) is the branding source of truth.
- The VLS logo at `/assets/home/vls_logo.png` must remain unchanged.
- Brand colours: primary red `#b20a0a`, white `#ffffff`, dark `#1a1a1a`, neutral backgrounds.
- Font: Inter (already loaded). Do not load additional font families.
- Do not invent a cyberpunk, neon-blue or robot-AI visual identity.
- The page must remain recognisably VLS Law Academy.

---

## Program Positioning

- **Decoding of Practice** is the main program name — always dominant in hierarchy.
- **"Now AI-Assisted"** is an approved supporting descriptor — never a separate brand.
- AI is a practical assistant within legal workflow — not a product or course replacement.
- "AI Assists. The Advocate Decides." is the core responsible-AI line.
- Do not make the page resemble a prompt-engineering course, SaaS landing page or tech conference.

---

## Content Rules

- Do not invent dates, deadlines, seat availability, countdown timers with fake urgency.
- Do not make income, employment, client or court-success guarantees.
- All program operational details (date, fee, mode, language, recording, certificate) must come from `programConfig` in constants — never duplicated in JSX strings.
- When a new session date is not confirmed: display "Date to be announced" — never invent one.
- AI-generated legal work requires professional verification — always state this clearly.

---

## Asset Preservation — MANDATORY

Every existing photograph must remain visible on the final page:
- `/assets/home/banner-img.jpg` — hero background
- `/assets/home/fatsfact.jpeg` — fast facts section
- `/assets/home/whatlearn.jpeg` — what you'll learn section
- `/assets/home/whycourse.jpeg` — why this course section
- `/assets/home/whojoin.jpeg` — who should attend section
- `/assets/home/IMG_9237.jpg` — why VLS section
- `/assets/home/IMG_8234 (1).JPEG` — must be placed somewhere visible
- `/assets/home/testimonialimg1.jpg` — testimonial 1 poster
- `/assets/home/testimonialimg2.png` — testimonial 2 poster
- `/assets/home/testimonialimg3.png` — testimonial 3 poster
- `/assets/owner/mr-siva-kumar-backdrop.svg` — faculty photo

Three video testimonials on Cloudinary must remain with their exact URLs, participant names and content unchanged.

Do not delete, replace, AI-modify or hide any of the above.

---

## Responsible Legal Content

- Always include: "AI-generated legal work is a starting point. Professional verification is the standard."
- Do not represent AI as equal to or more authoritative than the advocate.
- Do not promise court success, income or career outcomes.
- Advocate retains full responsibility for all legal accuracy, strategy and filings.
