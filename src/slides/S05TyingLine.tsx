/**
 * NOT IN THE DECK. "The Tying Line" was removed from the running order; this
 * file is kept so it can be put back by re-adding one entry to
 * `deck/slides.ts` and its import. It is not referenced anywhere else.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, STAGE, STROKE, TYPE } from '../design/tokens';
import { ramp, pulse, riseIn } from '../design/motion';
import { Canvas, DrawPath } from '../design/Draw';

/**
 * Slide 5 — the tying line.
 * Terracotta ground, ivory type. The enclosure stays clear of the words.
 */
export const S05TyingLine: React.FC<SlideProps> = ({ frame, global }) => {
  const e = enclosureLocal();
  const light = pulse(global, 340);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(200deg, ${C.terracottaLift} 0%, ${C.terracotta} 46%, ${C.terracottaDeep} 100%)`,
      }}
    >
      <Canvas>
        {/* a quiet light shift across one plane only */}
        <path d={e.lightPlane} fill={C.terracottaLift} opacity={0.1 + light * 0.1} />
        {e.planes.map((d, i) => (
          <DrawPath key={`p${i}`} d={d} frame={frame} at={6 + i * 3} dur={34} width={STROKE.line} color={C.ivory} opacity={0.82} />
        ))}
        {e.soffit.map((d, i) => (
          <DrawPath key={`s${i}`} d={d} frame={frame} at={18 + i * 3} dur={30} width={STROKE.fine} color={C.ivory} opacity={0.6} />
        ))}
      </Canvas>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 330,
          width: STAGE.W,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 26,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.28em',
          textIndent: '0.28em',
          textTransform: 'uppercase',
          color: C.ivory,
          opacity: 0.78 * ramp(frame, 0, 14),
        }}
      >
        The Tying Line
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 424,
          width: STAGE.W,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 104,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.16,
          color: C.ivory,
        }}
      >
        <div style={riseIn(frame, 6, 15, 20)}>Exploring Emotions</div>
        <div style={riseIn(frame, 13, 15, 20)}>Through Space</div>
      </div>
    </AbsoluteFill>
  );
};

/** Local copy so the enclosure can sit clear of this slide's type block. */
const enclosureLocal = () => {
  const l = 206;
  const r = STAGE.W - 206;
  const b = 884;
  const t = 236;
  const d = 84;
  const P = (...pts: [number, number][]) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  return {
    planes: [
      P([l, b], [l + d, b - d], [r - d, b - d], [r, b]),
      P([l, b], [l, t + d * 1.35]),
      P([r, b], [r, t + d * 1.35]),
      P([l + d, b - d], [l + d, t + d * 0.5]),
      P([r - d, b - d], [r - d, t + d * 0.5]),
    ],
    soffit: [
      P([l, t + d * 1.35], [l + d, t + d * 0.5], [l + d + 232, t + d * 0.5]),
      P([r, t + d * 1.35], [r - d, t + d * 0.5], [r - d - 232, t + d * 0.5]),
    ],
    lightPlane: `M${l},${b} L${l + d},${b - d} L${l + d},${t + d * 0.5} L${l},${t + d * 1.35} Z`,
  };
};
