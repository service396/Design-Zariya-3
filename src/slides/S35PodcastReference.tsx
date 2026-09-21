import React, { useEffect, useRef } from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';
import { Heading } from '../design/Type';

/**
 * The podcast reference.
 *
 * One existing show, running silently and looping, to fix the format in the
 * room: a guest at the microphone, bold kinetic captions burned in, cutaways
 * to the things being talked about.
 *
 * It is someone else's film. The note beneath says so, and nothing on this
 * slide claims it as ours or implies any association with it.
 *
 * TO REPLACE IT: swap the files in `src/assets/podcast-ref/`, keeping one
 * `.mp4` and one `.webm` of the same clip so it plays in Chromium builds
 * without H.264 as well. Strip the sound before you do; this slide never
 * plays audio.
 */

const files = import.meta.glob('../assets/podcast-ref/*.{mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const SOURCES = Object.keys(files)
  .sort() // .mp4 before .webm, so the better-supported codec is offered first
  .map((p) => ({ src: files[p], type: p.endsWith('.webm') ? 'video/webm' : 'video/mp4' }));

const W = 1280;
const H = 720;
const X = (STAGE.W - W) / 2;
const Y = 250;

export const S35PodcastReference: React.FC<SlideProps> = ({ frame, global }) => {
  const on = ramp(frame, 0, 9); // 0.3s
  const note = ramp(frame, 20, 12);
  const entry = Math.round(global - frame);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory, opacity: on }}>
      <div style={{ position: 'absolute', left: SAFE, top: 118 }}>
        <Heading>The Podcast We Envision</Heading>
        <div style={{ marginTop: 22, width: 120, height: 2, background: C.terracotta, opacity: 0.8 }} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: X,
          top: Y,
          width: W,
          height: H,
          overflow: 'hidden',
          backgroundColor: SOURCES.length > 0 ? C.charcoal : C.ivoryLift,
          outline: SOURCES.length > 0 ? undefined : '1px solid rgba(182,99,67,0.28)',
        }}
      >
        {SOURCES.length > 0 ? <Clip entry={entry} /> : null}
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE,
          right: SAFE,
          top: 1004,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 19,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: C.charcoalSoft,
          opacity: 0.58 * note,
        }}
      >
        An existing show, shown for format and treatment only
      </div>
    </AbsoluteFill>
  );
};

const Clip: React.FC<{ entry: number }> = ({ entry }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p?.catch) p.catch(() => undefined);
    return () => {
      v.pause();
    };
  }, [entry]);
  return (
    <video
      key={entry}
      ref={ref}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    >
      {SOURCES.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
};
