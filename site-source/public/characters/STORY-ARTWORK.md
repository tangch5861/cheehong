# Complete-pose chapter animations

Every chapter now uses four whole illustrations in `src/characterPoses.ts`, rendered by `src/ChapterAction.tsx`. `src/CharacterArtwork.tsx` selects the active chapter and pauses animation when the tab is hidden. There are no sliced limbs or head/body masks.

The CSS crossfades use `mix-blend-mode: plus-lighter` inside an isolated container. Complementary opacity values preserve the combined opacity and avoid a pale flash. Each gesture runs once per chapter entry, replays on returning, and settles on its last pose. Reduced motion shows the last pose immediately. All four images decode before the gesture starts. The first still is displayed while decoding; the SVG is an error fallback.

## Assets

- Education: `education-frame-1.png` through `education-frame-4.png`, unchanged approved images.
- All other chapters: `<chapter>-frame-1.webp` through `<chapter>-frame-4.webp`, 384 x 512 transparent images.
- Existing career sources: `chapter-actions-v1.png` and `career-actions-v1.png`.
- New introduction, journey, skills, projects and contact source: `story-actions-v1.png`, generated with the built-in OpenAI image tool using `career-atlas.png` as the style/identity reference.

Complete figures were extracted with individual bounds and aligned by head center and ground line. Row scale preserves room for the widest gesture. Contact is mirrored as a complete illustration in CSS so it presents toward the page's download area.

## New artwork prompt

Create one transparent PNG animation sprite sheet matching the EXACT polished 3D cartoon man identity, face, hair, clothing materials and rendering style in the reference. Exactly FOUR columns and FIVE rows, 20 complete full-body figures. Each cell is identical sized, portrait 3:4. Tall canvas aspect ratio 3:5 (ideally 1536x2560). Absolutely transparent background, no halos, no shadows, no text, no grid. Each row shows FOUR consecutive small gesture poses of the SAME figure. Head, body, feet, camera and scale stay exactly registered in each cell, generous transparent margin on ALL sides, no figure crossing cell boundaries. Do not crop ANY head or shoe. ROW1: match reference top-left young man sage shirt dark trousers brown shoes; friendly wave: hand raised, wrist wave outward, wave inward, relaxed raised hand. ROW2: match reference top row third man cream shirt brown shoulder work bag dark trousers; gently adjust bag strap: holding strap, lift strap slightly, settle strap, resting hold. ROW3: match reference bottom row first mature professional sage blazer cream shirt holding brown notebook; free hand opens to present skills, extends palm slightly, relaxed open palm, settles. ROW4: match reference bottom row second mature professional navy blazer cream shirt dark trousers holding dark portfolio; free hand gestures towards portfolio, presents portfolio slightly forward, open hand presentation, settles holding portfolio. ROW5: match reference bottom row third mature cream-shirt professional holding a white resume sheet with abstract grey lines (no readable text); free hand opens toward viewer's left, extends to present download, slightly points down-left, relaxed open palm. Maintain character identity and consistent age for each row. Every cell a COMPLETE seamless character, not separate body parts. Only arms and relevant props move subtly. Pixel-perfect same face position, same soles baseline in all four cells of each row. Use all five rows, all four columns.
