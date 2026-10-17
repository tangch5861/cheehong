import { useEffect, useRef, useState } from 'react';
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

/** A continuous localized warp keeps the original head, torso and feet registered. */
function StudentWave({src}:{src:string}) {
 const displacement=useRef<SVGFEDisplacementMapElement>(null);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0, elapsed=0, previous=0;
  const stop=()=>{cancelAnimationFrame(frame);frame=0;previous=0;displacement.current?.setAttribute('scale','0')};
  const tick=(time:number)=>{if(previous)elapsed+=Math.min(time-previous,50);previous=time;displacement.current?.setAttribute('scale',String(Math.sin(elapsed/1000*Math.PI*2/2.8)*18));frame=requestAnimationFrame(tick)};
  const sync=()=>{stop();if(!media.matches&&!document.hidden)frame=requestAnimationFrame(tick)};
  sync();media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  return()=>{stop();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync)};
 },[]);
 const map='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="384" height="512"><defs><radialGradient id="w"><stop offset="0" stop-color="rgb(100%,50%,50%)"/><stop offset=".45" stop-color="rgb(100%,50%,50%)"/><stop offset="1" stop-color="rgb(50%,50%,50%)"/></radialGradient></defs><rect width="384" height="512" fill="rgb(50%,50%,50%)"/><ellipse cx="99" cy="153" rx="42" ry="72" fill="url(#w)"/></svg>');
 return <svg className="student-wave" viewBox="0 0 384 512" aria-hidden="true" data-action="stationary-hand-wave"><defs><filter id="student-hand-wave" x="0" y="0" width="384" height="512" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feImage href={map} x="0" y="0" width="384" height="512" result="wave-map"/><feComponentTransfer in="wave-map" result="centered-wave"><feFuncR type="linear" slope="1" intercept="-0.00196078431372549"/><feFuncG type="linear" slope="0" intercept="0.5"/></feComponentTransfer><feDisplacementMap ref={displacement} in="SourceGraphic" in2="centered-wave" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></defs><image href={src} width="384" height="512" filter="url(#student-hand-wave)"/></svg>;
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
  if (chapter === 'intro') return <StudentWave src={frames[0]}/>;
  return <div className="pose-sequence" data-action={action} data-ready={ready} data-artwork="registered-full-poses">
    {(ready ? frames : frames.slice(0, 1)).map((src, index) => <img
      key={`${ready}-${src}`}
      className={`pose-frame pose-frame--${index + 1}`}
      src={src} width="384" height="512" alt="" draggable="false"
    />)}
  </div>;
}
