import { useEffect, useState } from 'react';
import { Character, type ChapterId } from './Character';
import { characterPoses } from './characterPoses';

const decoded = new Map<string, Promise<void>>();
function preload(src: string) {
  let pending = decoded.get(src);
  if (!pending) {
    const image = new Image();
    image.src = src;
    pending = image.decode();
    decoded.set(src, pending);
    pending.catch(() => decoded.delete(src));
  }
  return pending;
}

/** Complete illustrations; opacity blending never cuts or rotates body parts. */
export function ChapterAction({ chapter }: { chapter: ChapterId }) {
  const { frames, action } = characterPoses[chapter];
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let current = true;
    Promise.all(frames.map(preload)).then(() => {
      if (current) setReady(true);
    }).catch(() => { if (current) setFailed(true); });
    return () => { current = false; };
  }, [frames]);

  if (failed) return <Character chapterId={chapter} />;
  return <div className="pose-sequence" data-action={action} data-ready={ready} data-artwork="registered-full-poses">
    {(ready ? frames : frames.slice(0, 1)).map((src, index) => <img
      key={`${ready}-${src}`}
      className={`pose-frame pose-frame--${index + 1}`}
      src={src} width="384" height="512" alt="" draggable="false"
    />)}
  </div>;
}
