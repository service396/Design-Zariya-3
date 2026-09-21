import React, { useEffect, useRef } from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, STAGE } from '../design/tokens';
import { pulse, ramp } from '../design/motion';
import { S01OpeningDrawn } from './S01OpeningDrawn';
import openingMp4 from '../assets/opening.mp4';
import poster from '../assets/opening-poster.png';

/**
 * Slide 1 — opening.
 * The approved opening film, played once on entry and then held on its final
 * lock-up frame. It is the only moving image in the deck; everything after it
 * is drawn.
 *
 * `?opening=drawn` swaps in the condensed built-in-browser version kept in
 * S01OpeningDrawn, for machines that cannot play the file.
 */

/**
 * The WebM encoding is optional. It exists for Chromium builds without H.264;
 * every mainstream browser plays the MP4, so the web package ships without it.
 */
const openingWebm = Object.values(
  import.meta.glob('../assets/opening.webm', { eager: true, query: '?url', import: 'default' }) as Record<string, string>,
)[0];

/** 320 frames at 30fps. */
const FILM = 320;

const useDrawn =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('opening') === 'drawn';

export const S01Opening: React.FC<SlideProps> = (props) => {
  if (useDrawn) return <S01OpeningDrawn {...props} />;
  return <Film {...props} />;
};

const Film: React.FC<SlideProps> = ({ frame, global }) => {
  const ref = useRef<HTMLVideoElement>(null);

  /**
   * Stable for as long as the slide is held, different on every re-entry.
   * Remounting on this key is what makes the film replay when the presenter
   * comes back to slide 1, without it ever restarting mid-hold.
   */
  const entry = Math.round(global - frame);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    const play = v.play();
    if (play && typeof play.catch === 'function') play.catch(() => undefined);
  }, [entry]);

  /** Only once the film has settled does the ambient tone begin. */
  const settled = ramp(frame, FILM, 30);
  const tone = pulse(global, 340) * 0.05 * settled;

  return (
    <AbsoluteFill style={{ backgroundColor: C.terracotta, overflow: 'hidden' }}>
      <video
        key={entry}
        ref={ref}
        poster={poster}
        muted
        playsInline
        autoPlay
        preload="auto"
        controls={false}
        disablePictureInPicture
        style={{
          position: 'absolute',
          inset: 0,
          width: STAGE.W,
          height: STAGE.H,
          objectFit: 'cover',
          display: 'block',
        }}
      >
        {/* two encodings: H.264 for Safari and Chrome, VP9 for Chromium
            builds without proprietary codecs. The browser falls through. */}
        <source src={openingMp4} type="video/mp4" />
        {openingWebm ? <source src={openingWebm} type="video/webm" /> : null}
      </video>
      {/* the restrained tonal shift on the held frame */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: tone,
          background: `radial-gradient(62% 50% at 38% 34%, ${C.terracottaLift} 0%, rgba(0,0,0,0) 72%)`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
