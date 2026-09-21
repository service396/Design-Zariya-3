import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, STAGE, STROKE, TYPE, FILL } from '../design/tokens';
import { ramp, pulse, riseIn } from '../design/motion';
import { Canvas, DrawPath, FillShape } from '../design/Draw';
import { CUBOID } from '../art/frames';

/**
 * Slide 6 — what is space?
 * One question. A flat boundary draws, gains depth, and closes into a whole
 * volume. The question sits inside it.
 */
export const S06WhatIsSpace: React.FC<SlideProps> = ({ frame, global }) => {
  const light = pulse(global, 320);
  const closed = ramp(frame, 40, 34);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <Canvas>
        <FillShape d={CUBOID.floor} frame={frame} at={30} dur={26} fill={FILL.shade1} />
        <FillShape d={CUBOID.side} frame={frame} at={36} dur={26} fill={FILL.shade2} opacity={0.8} />
        <path d={CUBOID.top} fill={C.terracottaLift} opacity={(0.05 + light * 0.04) * closed} />

        {CUBOID.edges.map((e, i) => (
          <DrawPath
            key={i}
            d={e.d}
            frame={frame}
            at={2 + e.at}
            dur={22}
            width={i < 4 ? STROKE.line : STROKE.fine}
            opacity={i < 4 ? 1 : 0.7}
          />
        ))}
      </Canvas>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 470,
          width: STAGE.W,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 112,
          fontWeight: TYPE.weightLight,
          letterSpacing: '-0.01em',
          color: C.charcoal,
          ...riseIn(frame, 2, 15, 18),
        }}
      >
        What is space?
      </div>
    </AbsoluteFill>
  );
};
