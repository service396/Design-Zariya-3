import React from 'react';
import { AbsoluteFill } from 'remotion';
import { C, LINE, SAFE, STROKE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';
import { Canvas, DrawPath } from '../design/Draw';

/**
 * The card the deck opens and closes on.
 *
 * One word on ivory, standing on the same ground line every other slide is
 * built from, drawn left to right. Hello and Thank You share this component
 * so the two ends of the deck cannot drift apart: change the greeting here
 * and both change together.
 *
 * Arrives whole, on entry. There is nothing to advance through.
 */

export const GreetingCard: React.FC<{ frame: number; children: React.ReactNode }> = ({
  frame,
  children,
}) => {
  const word = ramp(frame, 4, 16);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <Canvas>
        <DrawPath
          d={`M${SAFE},${LINE.baseY} L${1920 - SAFE},${LINE.baseY}`}
          frame={frame}
          at={10}
          dur={26}
          color={C.terracotta}
          width={STROKE.fine}
        />
      </Canvas>

      <h1
        style={{
          position: 'absolute',
          left: SAFE,
          bottom: 1080 - LINE.baseY + 42,
          margin: 0,
          fontFamily: TYPE.family,
          fontSize: 232,
          fontWeight: TYPE.weightLight,
          letterSpacing: '0.04em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          color: C.charcoal,
          opacity: word,
          transform: `translateY(${(1 - word) * 18}px)`,
        }}
      >
        {children}
      </h1>
    </AbsoluteFill>
  );
};
