import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, TYPE } from '../design/tokens';
import { ramp, EASE_IN_OUT } from '../design/motion';
import { FullPhoto, Scrim, THRESHOLD } from '../design/Elements';
import { ReferenceNote } from '../design/Type';
import { EL } from '../art/elements';

/**
 * Slide 25 — ELEMENTS.
 *
 * The photograph opens out of the frame slide 24 drew, the title rises into
 * the quiet wall on the left, and the question follows. ELEMENTS is set as
 * type, not a logo. A 2% settle on the photograph eases out and stops.
 */

export const S25Elements: React.FC<SlideProps> = ({ frame }) => {
  const reveal = interpolate(ramp(frame, 0, 20, EASE_IN_OUT), [0, 1], [0, 1]);
  const title = ramp(frame, 12, 14);
  const q = ramp(frame, 22, 14); // settled by 1.2s
  const settle = 0.02 * (1 - ramp(frame, 0, 42, EASE_IN_OUT));

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <FullPhoto
        src={EL.expert}
        alt="An expert in conversation in a living room"
        reveal={reveal}
        from={THRESHOLD}
        focus="50% 50%"
        push={settle}
        origin="70% 45%"
      />
      <Scrim tone="light" strength={0.56} reach={50} opacity={title} />

      <div style={{ position: 'absolute', left: SAFE, top: 404 }}>
        <h1
          style={{
            margin: 0,
            fontFamily: TYPE.family,
            fontSize: 112,
            fontWeight: TYPE.weightLight,
            letterSpacing: '0.26em',
            lineHeight: 1,
            color: C.charcoal,
            opacity: title,
            transform: `translateY(${(1 - title) * 12}px)`,
          }}
        >
          ELEMENTS
        </h1>
        <div
          style={{
            marginTop: 40,
            width: 120 * q,
            height: 2,
            background: C.terracotta,
            opacity: 0.8,
          }}
        />
        <p
          style={{
            margin: '30px 0 0',
            fontFamily: TYPE.family,
            fontSize: 44,
            fontWeight: TYPE.weightLight,
            color: C.charcoal,
            opacity: q,
            transform: `translateY(${(1 - q) * 8}px)`,
          }}
        >
          What makes a space feel right?
        </p>
      </div>

      <ReferenceNote frame={frame} at={26} />
    </AbsoluteFill>
  );
};
