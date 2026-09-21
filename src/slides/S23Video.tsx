import React, { useEffect, useRef } from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C } from '../design/tokens';

/**
 * The last slide — the film slot, currently empty.
 *
 * With no file present the slide is a blank ivory frame: no placeholder text,
 * nothing the audience could mistake for content.
 *
 * To add a film, drop it into `src/assets/slide23/` and rebuild.
 * Any `.mp4` or `.webm` there is picked up and offered as alternative sources,
 * so the slide plays in Chromium builds without H.264 as well. It plays once
 * on entry, full-bleed, and holds on its last frame, the same behaviour as the
 * opening film.
 *
 * Sound: the slide asks for audio first, since a film placed this late in the
 * deck usually has a voice worth hearing. Browsers refuse unmuted autoplay
 * until the page has been interacted with; by this point the presenter has
 * clicked through the whole deck, so it normally plays with sound. If the
 * browser still refuses, it falls back to a muted play rather than nothing.
 */

const files = import.meta.glob('../assets/slide23/*.{mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const sources = Object.keys(files)
  .sort((a, b) => (a.endsWith('.mp4') ? -1 : 1) - (b.endsWith('.mp4') ? -1 : 1))
  .map((path) => ({ src: files[path], type: path.endsWith('.webm') ? 'video/webm' : 'video/mp4' }));

export const S23Video: React.FC<SlideProps> = ({ frame, global }) => {
  const ref = useRef<HTMLVideoElement>(null);
  // stable while the slide is held, changes on re-entry, so re-entering replays
  const entry = Math.round(global - frame);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.volume = 1;
    const play = v.play();
    if (play?.catch) {
      play.catch(() => {
        // the browser would not start unmuted audio; show the picture anyway
        v.muted = true;
        const retry = v.play();
        if (retry?.catch) retry.catch(() => undefined);
      });
    }
    return () => {
      v.pause();
    };
  }, [entry]);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      {sources.length > 0 ? (
        <video
          key={entry}
          ref={ref}
          playsInline
          autoPlay
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      ) : null}
    </AbsoluteFill>
  );
};
