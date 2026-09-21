import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SLIDES } from './slides';
import { C, D, STAGE } from '../design/tokens';
import { ramp } from '../design/motion';

export type DeckCue = {
  slide: number;
  prevSlide: number;
  /** Global frame at which the current slide entered. */
  slideStart: number;
  /** Global frame at which the outgoing slide entered. */
  prevStart: number;
  /** Global frame at which the current transition began. -1e9 when settled. */
  transitionStart: number;
  /** Global frame per build index for the current slide. */
  buildFrames: number[];
  prevBuildFrames: number[];
  prevBuild: number;
};

export const NO_CUE: DeckCue = {
  slide: 0,
  prevSlide: -1,
  slideStart: 0,
  prevStart: 0,
  transitionStart: -1e9,
  buildFrames: [0],
  prevBuildFrames: [0],
  prevBuild: 0,
};

const Render: React.FC<{
  index: number;
  global: number;
  start: number;
  build: number;
  buildFrames: number[];
}> = ({ index, global, start, build, buildFrames }) => {
  const def = SLIDES[index];
  if (!def) return null;
  const Comp = def.component;
  const since = (i: number) => {
    const f = buildFrames[i];
    return f === undefined ? -1e9 : global - f;
  };
  return <Comp frame={global - start} global={global} build={build} since={since} />;
};

/**
 * The whole deck as one Remotion composition. The player runs continuously;
 * narrative events arrive as cues, so holding a slide never rewinds anything.
 */
export const DeckStage: React.FC<{ cue: DeckCue; build: number }> = ({ cue, build }) => {
  const frame = useCurrentFrame();

  const t = ramp(frame, cue.transitionStart, D.slideChange);
  const transitioning = t > 0 && t < 1 && cue.prevSlide >= 0;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory, overflow: 'hidden' }}>
      {transitioning && (
        <AbsoluteFill style={{ opacity: 1 - t }}>
          <Render
            index={cue.prevSlide}
            global={frame}
            start={cue.prevStart}
            build={cue.prevBuild}
            buildFrames={cue.prevBuildFrames}
          />
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{ opacity: cue.prevSlide >= 0 ? t : 1 }}>
        <Render
          index={cue.slide}
          global={frame}
          start={cue.slideStart}
          build={build}
          buildFrames={cue.buildFrames}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const DECK_DURATION = 1_000_000;
export const DECK_SIZE = { width: STAGE.W, height: STAGE.H, fps: STAGE.FPS };
