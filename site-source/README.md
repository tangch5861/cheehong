# Tang Chee Hong — A developer’s journey

A local React + TypeScript résumé website. No photograph, external fonts, tracking, backend, or public deployment. Content was transcribed and lightly edited from https://tangch5861.github.io/cheehong/ on 15 October 2026.

## Run locally

Requires Node.js 22+ and pnpm. From this directory:

```powershell
pnpm install
node node_modules/vite/bin/vite.js --host 127.0.0.1
```

Open the printed local URL (normally http://127.0.0.1:5173/). `pnpm dev` is the equivalent standard package script. Direct Node commands are included because this machine’s pnpm wrapper can request dependency reinstallation before script execution.

## Build and preview

```powershell
node node_modules/typescript/bin/tsc --noEmit
node node_modules/vite/bin/vite.js build
node node_modules/vite/bin/vite.js preview --host 127.0.0.1
```

`pnpm build` and `pnpm preview` are the equivalent package scripts. The finished static site is in `dist/`; serve that folder over HTTP, rather than opening index.html as a local file. Relative asset paths support a GitHub Pages subdirectory such as `/cheehong/`. There are no environment variables or server requirements. The production build is published from the repository root on `master` at https://tangch5861.github.io/cheehong/.

## Edit content

- `src/resume.json`: name, summary, contact details, education, chronological roles, skills, projects, languages, interests, and source note. This is the single résumé content source for the site and PDF.
- `src/main.tsx`: reusable headings/tags, sections, the SVG `Character` component, chapter-to-stage mapping, and section tracking.
- `src/styles.css`: palette, responsive layout, illustration motion, focus styles, print styles, and reduced-motion handling.
- `public/Tang-Chee-Hong-Resume.pdf`: the downloadable recruiter résumé.
- `scripts/generate_resume.py`: regenerate the PDF after content edits with Python, ReportLab and pypdf: `python scripts/generate_resume.py`. Rebuild afterward to copy the latest PDF to dist. The supplied PDF is already generated; Python is not needed to run the website.

The character is decorative and excluded from the accessibility tree. Its reserved side strip prevents content overlap. The mobile strip is narrower, uses safe-area insets, and removes repeated gestures. Native anchor links and normal scrolling remain in control. IntersectionObserver plus a requestAnimationFrame-throttled scroll-position calculation keep sections stable under fast or reversed scrolling. No animation library is required. Content remains readable when motion is disabled or unsupported; a no-JavaScript link provides the complete PDF.

## Content decisions

- Etiqa's 2015–2026 role dates and eight achievements were supplied directly by the owner. Both 2023 title entries are retained without inventing promotion months.
- PMP is listed as training, not as an earned credential.
- Google Analytics courses are training; the Adobe expert qualification follows the source.
- No metrics, employers, dates, qualifications, proficiency ratings or profile links were invented. Historical technology and project names are retained.
- Only the published email address and telephone number are used; no contact form or photo is included.
- Project descriptions explain documented contributions without claiming unreported business results.

## Verification

- TypeScript check and Vite production build passed.
- Chromium rendered at 1440×1000, 768×844, 390×844 and 320×844; no horizontal overflow or character/content overlap.
- All career stages and navigation states checked in both directions.
- Genuine PDF download verified by filename, HTTP 200 and `%PDF-` signature.
- Four PDF pages visually reviewed, with selectable text and all five employers verified.
- Reduced-motion animation computed as `none`; email/tel link targets verified.
- No application console errors in the automated browser run.

The website uses system fonts and inline SVGs. Content reveals use CSS view timelines where supported; other browsers receive simple entrance animations. Live email/phone delivery and the factual currency of the old résumé are outside these checks.

## Chapter character update

Each chapter has its own character design, shown exclusively in the fixed bottom-right rail. No character illustrations appear inside the résumé chapters. `src/Character.tsx` contains the reusable SVG and chapter design map. Character labels display years only; no age reference is stored in the current résumé data. Clothing and facial styling are illustrative; undated later chapters use a mature character without asserting a current employment date.

Distinct props include a graduation cap/book, work bag, intern badge/laptop, interface board/stylus, support headset, web-game screen, connected-systems diagram, presentation board, project folder, and résumé document. The decorative fixed character is omitted from print. Updated layout checked at desktop and 390px/320px phone widths; TypeScript and production build pass.


## Animated character artwork

The corner uses local rendered artwork in public/characters/career-atlas.png. CharacterArtwork.tsx selects a chapter cell and uses SVG masks to separate the greeting/presenting arms. CSS adds breathing, an introduction blink, a short greeting wave and skills/contact presentation gestures. Chapter changes replay a subtle entrance, including when scrolling upward. This is layered illustration animation, not a 3D mesh. Gesture masks and pivots are editable in CharacterArtwork.tsx; timing is in styles.css. The original SVG is the loading fallback.

Mobile disables continuous breathing and blinking and reduces the greeting to one cycle. Reduced motion disables all gestures and entrances. Hidden tabs pause animation. The previous Three.js renderer is retired and its dependency removed.


## Chapter action preview


Résumé content and the downloadable four-page PDF were updated from resume.json with the owner’s 2015–2026 Etiqa progression and achievements. Website checks passed for build, mobile overflow, accessible text, all eight achievement entries and the supplied progression.

## Stable character actions

`src/ChapterAction.tsx` uses one cropped pose per role and moves only a masked arm. The career art sheet has uneven row spacing, so each pose has explicit source coordinates to exclude neighboring rows. The head, torso and feet stay anchored through the gesture; entry motion moves only vertically. This fixes the Version 2 stray shoes and horizontal jump. Education, Flextronics, Gistxl, Version 2, Memolife and Etiqa retain chapter-specific hand actions. Mobile has shorter gestures, and reduced motion holds the pose. The local image generation prompts are in `public/characters/ACTION-ARTWORK.md`.

## Complete-pose animation update

All eleven chapters use four whole character poses with the approved Education CSS crossfade. Edit stage assets and action labels in `src/characterPoses.ts`, playback in `src/ChapterAction.tsx`, and `.pose-sequence` / `.pose-frame` rules in `src/styles.css`. The previous sliced-arm renderer has been replaced. See `public/characters/STORY-ARTWORK.md` for asset names, generation prompt, and motion behavior.

Character motion: chapter pose sequences loop continuously with a balanced last-to-first crossfade. The introduction uses four matching full-character wave poses from a transparent sprite sheet, rendered as whole-cell SVG viewports and crossfaded using the same animation as other chapters. No displacement filter or body-part slicing is used. Hidden tabs pause motion; reduced-motion preference disables it.
