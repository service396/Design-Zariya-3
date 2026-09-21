import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, STAGE, STROKE, TYPE } from '../design/tokens';
import { ramp, pulse, riseIn, mix, EASE_IN_OUT } from '../design/motion';
import { Canvas } from '../design/Draw';
import { CUBOID } from '../art/frames';

/**
 * Slide 7 — the volume comes apart.
 * The cuboid from slide 6 arrives in the same position, then its twelve edges
 * separate and drift clear while the words resolve in the space they leave.
 */

const CX = 960;
const CY = 520;

export const S07ExploringSpaces: React.FC<SlideProps> = ({ frame, global, build, since }) => {
  const header = ramp(frame, 26, 18);
  const byline = ramp(since(1), 0, 18);
  const rule = ramp(since(1), 0, 22);
  const drift = pulse(global, 360);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      {/* the only ambient here: a restrained shift of daylight across the field */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: (0.05 + drift * 0.035) * ramp(frame, 40, 40),
          background: `radial-gradient(70% 58% at ${46 + drift * 6}% 42%, ${C.terracotta} 0%, rgba(0,0,0,0) 74%)`,
          pointerEvents: 'none',
        }}
      />
      <Canvas>
        {CUBOID.edges.map((e, i) => {
          // each edge leaves on its own beat, outward from the centre of the volume
          const p = ramp(frame, 6 + i * 2.2, 44, EASE_IN_OUT);
          const [mx, my] = CUBOID.mid[i];
          const ux = mx - CX;
          const uy = my - CY;
          const len = Math.hypot(ux, uy) || 1;
          const push = 260 * p;
          const tx = (ux / len) * push;
          const ty = (uy / len) * push * 0.66;
          const spin = mix(0, (i % 2 ? 5 : -5), p);
          return (
            <g
              key={i}
              opacity={Math.max(0, 1 - p * 1.35)}
              style={{
                transform: `translate(${tx + drift * 1.6}px, ${ty}px) rotate(${spin}deg)`,
                transformOrigin: `${mx}px ${my}px`,
              }}
            >
              <path
                d={e.d}
                fill="none"
                stroke={C.terracotta}
                strokeWidth={i < 4 ? STROKE.line : STROKE.fine}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </Canvas>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 424,
          width: STAGE.W,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 108,
          fontWeight: TYPE.weightLight,
          letterSpacing: '-0.01em',
          color: C.charcoal,
          ...riseIn(frame, 26, 18, 22),
          opacity: header,
        }}
      >
        Exploring Spaces
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 596,
          width: STAGE.W,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: 132 * rule, height: 2, background: C.terracotta, opacity: 0.75 * rule }} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 638,
          width: STAGE.W,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 40,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.4,
          color: C.charcoalSoft,
          ...riseIn(since(1), 4, 18, 16),
          opacity: byline,
        }}
      >
        Deconstructing the essential perspectives of space
      </div>
    </AbsoluteFill>
  );
};
