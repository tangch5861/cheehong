import { useEffect, useState } from 'react';
import type { ChapterId } from './Character';
import { ChapterAction } from './ChapterAction';

export function CharacterArtwork({chapterId}:{chapterId:ChapterId}) {
  const [paused,setPaused] = useState(false);
  useEffect(() => {
    const update = () => setPaused(document.hidden);
    update();
    document.addEventListener('visibilitychange',update);
    return () => document.removeEventListener('visibilitychange',update);
  },[]);
  return <div className="character-artwork" data-renderer="rendered-artwork" data-chapter={chapterId} data-paused={paused} aria-hidden="true">
    <ChapterAction key={chapterId} chapter={chapterId}/>
  </div>;
}
