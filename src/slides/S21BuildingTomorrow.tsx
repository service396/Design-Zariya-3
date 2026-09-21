import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, STAGE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';
import { BuildingTomorrowMark, BT } from '../art/buildingTomorrow';

/**
 * Slide 21 — Building Tomorrow.
 *
 * The title card for the podcast. The same lock-up as slide 20 ends on, built
 * in a different order and in about 1.8 seconds: the base first, then the
 * name, then the microphone drawn on above it. It holds when it is done —
 * the construction never loops and the microphone never pulses.
 */

const MARK_Y = 452;
const MARK_SCALE = 0.88;

export const S21BuildingTomorrow: React.FC<SlideProps> = ({ frame }) => {
  const base = ramp(frame, 0, 11); //  0.00–0.35
  const line1 = ramp(frame, 6, 17); //  0.20–0.75
  const line2 = ramp(frame, 14, 18); // 0.45–1.05
  const mic = ramp(frame, 20, 18); //  0.65–1.25
  const byline = ramp(frame, 36, 18); // 1.20–1.80

  return (
    <AbsoluteFill style={{ backgroundColor: C.terracotta }}>
      <svg viewBox={`0 0 ${BT.W} ${BT.H}`} width="100%" height="100%" style={{ display: 'block' }}>
        <BuildingTomorrowMark
          base={base}
          outline={mic}
          grille={mic}
          line1={line1}
          line2={line2}
          y={MARK_Y}
          scale={MARK_SCALE}
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 862,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 38,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.4,
          color: C.ivory,
          opacity: 0.94 * byline,
          transform: `translateY(${(1 - byline) * 10}px)`,
          width: STAGE.W,
        }}
      >
        Conversations with the minds shaping what comes next.
      </div>
    </AbsoluteFill>
  );
};
