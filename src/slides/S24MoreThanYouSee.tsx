import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STROKE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';
import { Canvas, DrawPath } from '../design/Draw';
import { THRESHOLD } from '../design/Elements';

/**
 * Slide 24 — a space is much more than what you see.
 *
 * The turn from the city into the experience of being inside a room. Three
 * edges of an architectural frame draw around an empty area; the statement
 * arrives in two groups; a warm plane fills the frame as the second group
 * lands. The frame is THRESHOLD — slide 25 opens its photograph from exactly
 * this rectangle.
 */

const { x, y, w, h } = THRESHOLD;

export const S24MoreThanYouSee: React.FC<SlideProps> = ({ frame }) => {
  const l1 = ramp(frame, 6, 12);
  const l2 = ramp(frame, 16, 12);
  const plane = ramp(frame, 18, 18); // settled by 1.2s

  const line = (i: number): React.CSSProperties => {
    const p = i === 0 ? l1 : l2;
    return {
      display: 'block',
      opacity: p,
      transform: `translateY(${(1 - p) * 12}px)`,
    };
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(200deg, ${C.terracottaLift} 0%, ${C.terracotta} 46%, ${C.terracottaDeep} 100%)`,
      }}
    >
      {/* the warm plane inside the frame */}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w,
          height: h,
          background: C.ivory,
          opacity: 0.1 * plane,
        }}
      />

      <Canvas>
        {/* left, top, right: an opening, not a box */}
        <DrawPath d={`M${x},${y + h} L${x},${y}`} frame={frame} at={0} dur={10} color={C.ivory} width={STROKE.line} />
        <DrawPath d={`M${x},${y} L${x + w},${y}`} frame={frame} at={4} dur={10} color={C.ivory} width={STROKE.line} />
        <DrawPath d={`M${x + w},${y} L${x + w},${y + h}`} frame={frame} at={8} dur={10} color={C.ivory} width={STROKE.line} />
      </Canvas>

      <h1
        style={{
          position: 'absolute',
          left: SAFE,
          top: 452,
          margin: 0,
          fontFamily: TYPE.family,
          fontSize: 76,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.08em',
          lineHeight: 1.18,
          textTransform: 'uppercase',
          color: C.ivory,
        }}
      >
        <span style={line(0)}>A space is much more</span>
        <span style={line(1)}>than what you see.</span>
      </h1>
    </AbsoluteFill>
  );
};
