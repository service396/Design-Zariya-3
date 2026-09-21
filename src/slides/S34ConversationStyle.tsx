import React, { useEffect, useRef } from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE } from '../design/tokens';
import { ramp } from '../design/motion';
import { Heading } from '../design/Type';

/**
 * Slide 34 — the conversation style.
 *
 * Three vertical interview references supplied by the client, shown exactly
 * as supplied: never generated, never cropped, never stretched. This slide
 * is independent of the Elements concept imagery.
 *
 * TO SUPPLY THEM: drop the files into `src/assets/conversation/` named `1`,
 * `2` and `3` with any of these extensions, then rebuild.
 *
 *   still images   .jpg .jpeg .png .webp
 *   moving images  .mp4 .webm   (silent, looped, the way a GIF behaves)
 *
 * A slot may carry both `.mp4` and `.webm` of the same clip; both are offered
 * as sources so it also plays in Chromium builds without H.264. A still and a
 * clip under one number is a mistake — the clip wins.
 *
 * Until they arrive each slot is an empty, faintly outlined 9:16 frame.
 */

const files = import.meta.glob('../assets/conversation/*.{jpg,jpeg,png,webp,mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

type Source = { src: string; type: string };
type Media = { still?: string; sources: Source[] };

const SLOTS: (Media | null)[] = ['1', '2', '3'].map((n) => {
  const paths = Object.keys(files)
    .filter((p) => p.split('/').pop()!.replace(/\.[^.]+$/, '') === n)
    .sort(); // .mp4 before .webm, so the better-supported codec is offered first
  if (paths.length === 0) return null;
  const clips = paths.filter((p) => /\.(mp4|webm)$/i.test(p));
  if (clips.length > 0) {
    return {
      sources: clips.map((p) => ({
        src: files[p],
        type: p.endsWith('.webm') ? 'video/webm' : 'video/mp4',
      })),
    };
  }
  return { still: files[paths[0]], sources: [] };
});

const W = 405;
const H = 720;
const GAP = 54;
const ROW_W = W * 3 + GAP * 2; // 1323
const ROW_X = (STAGE.W - ROW_W) / 2;
const ROW_Y = 250;

export const S34ConversationStyle: React.FC<SlideProps> = ({ frame, global }) => {
  const on = ramp(frame, 0, 9); // 0.3s
  const entry = Math.round(global - frame);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory, opacity: on }}>
      <div style={{ position: 'absolute', left: SAFE, top: 118 }}>
        <Heading>The Conversation Style</Heading>
        <div style={{ marginTop: 22, width: 120, height: 2, background: C.terracotta, opacity: 0.8 }} />
      </div>

      {SLOTS.map((m, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: ROW_X + i * (W + GAP),
            top: ROW_Y,
            width: W,
            height: H,
            overflow: 'hidden',
            outline: m ? undefined : '1px solid rgba(182,99,67,0.28)',
            backgroundColor: m ? undefined : C.ivoryLift,
          }}
        >
          {m ? (
            m.sources.length > 0 ? (
              <Clip sources={m.sources} entry={entry} />
            ) : (
              <img
                src={m.still}
                alt={`Interview reference ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            )
          ) : null}
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Clip: React.FC<{ sources: Source[]; entry: number }> = ({ sources, entry }) => {
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
      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
};
