import React, { useEffect, useRef } from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE } from '../design/tokens';
import { ramp } from '../design/motion';
import { Heading } from '../design/Type';

import r1mp4 from '../assets/reels/reel-1.mp4';
import r2mp4 from '../assets/reels/reel-2.mp4';
import r3mp4 from '../assets/reels/reel-3.mp4';

/**
 * The WebM encodings are optional. They exist for Chromium builds without
 * H.264; every mainstream browser plays the MP4s, so the web package ships
 * without them.
 */
const WEBM = import.meta.glob('../assets/reels/*.webm', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
const webm = (n: number): string | undefined => WEBM[`../assets/reels/reel-${n}.webm`];

/**
 * Slide 15 — the storytelling we envision.
 * The three supplied 9:16 references, in the order they were attached, shown
 * whole and unstretched. Each loops at its own native duration; nothing is
 * re-timed to make them match. They start together when the slide becomes
 * active and are unmounted when it is left.
 */

const REELS = [
  { mp4: r1mp4, webm: webm(1) },
  { mp4: r2mp4, webm: webm(2) },
  { mp4: r3mp4, webm: webm(3) },
];

const W = 405;
const H = 720;
const GAP = 54;
const ROW_W = W * 3 + GAP * 2;          // 1323
const ROW_X = (STAGE.W - ROW_W) / 2;    // 298.5
const ROW_Y = 250;

export const S15Storytelling: React.FC<SlideProps> = ({ frame, global }) => {
  const on = ramp(frame, 0, 9);
  /** Stable while held, different on every re-entry, so all three restart together. */
  const entry = Math.round(global - frame);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory, opacity: on }}>
      <div style={{ position: 'absolute', left: SAFE, top: 120 }}>
        <Heading>The Storytelling We Envision</Heading>
        <div style={{ marginTop: 20, width: 120, height: 2, background: C.terracotta, opacity: 0.8 }} />
      </div>

      <div style={{ position: 'absolute', left: ROW_X, top: ROW_Y, display: 'flex', gap: GAP }}>
        {REELS.map((r, i) => (
          <Reel key={i} entry={entry} mp4={r.mp4} webm={r.webm} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Reel: React.FC<{ entry: number; mp4: string; webm?: string }> = ({ entry, mp4, webm }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    const play = v.play();
    if (play && typeof play.catch === 'function') play.catch(() => undefined);
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
      controls={false}
      disablePictureInPicture
      style={{
        width: W,
        height: H,
        display: 'block',
        objectFit: 'contain',
        backgroundColor: C.ivoryDeep,
        border: `1px solid rgba(145,71,47,0.28)`,
      }}
    >
      <source src={mp4} type="video/mp4" />
      {webm ? <source src={webm} type="video/webm" /> : null}
    </video>
  );
};
