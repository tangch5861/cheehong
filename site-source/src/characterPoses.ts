import type { ChapterId } from './Character';

const actions: Record<ChapterId, string> = {
  intro: 'wave-hello', education: 'raise-diploma', journey: 'adjust-work-bag',
  flextronics: 'type-on-laptop', gistxl: 'design-with-stylus',
  version2: 'answer-and-code', memolife: 'demonstrate-web-game',
  etiqa: 'present-regional-platform', skills: 'present-expertise',
  projects: 'present-portfolio', contact: 'present-resume',
};
export const characterPoses = Object.fromEntries(
  Object.entries(actions).map(([chapter, action]) => [chapter, {
    action,
    frames: chapter === 'intro' ? Array(4).fill(`${import.meta.env.BASE_URL}characters/intro-wave-v2-frame-1.png`) : [1, 2, 3, 4].map(pose => `${import.meta.env.BASE_URL}characters/${chapter}-frame-${pose}.${chapter === 'education' ? 'png' : 'webp'}`),
  }]),
) as Record<ChapterId, { action: string; frames: string[] }>;
